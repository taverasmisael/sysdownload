/**
 *
 *  Web Starter Kit
 *  Copyright 2014 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

'use strict';

// Include Gulp & tools we'll use
var gulp = require('gulp');

var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var wiredep = require('wiredep').stream;
var args = require('yargs').argv;
var del = require('del');

process.env.NODE_ENV = args.env || 'development';

var AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
];

// Lint JavaScript
gulp.task('jshint', function() {
    return gulp.src(['app/**/*.js', 'public/scripts/**/*.js'])
        .pipe($.livereload())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.jshint.reporter('fail'));
});

// Compile and automatically prefix stylesheets
gulp.task('styles', function() {
    // For best performance, don't add Sass partials to `gulp.src`
    return gulp.src([
            'public/styles/**/*.scss',
            'public/styles/**/*.css',
            'public/styles/**/*.sass'
        ])
        .pipe($.sourcemaps.init())
        .pipe($.changed('public/styles', {
            extension: '.css'
        }))
        .pipe($.sass({
            precision: 10,
            onError: console.error.bind(console, 'Sass error:')
        }))
        .pipe($.autoprefixer({
            browsers: AUTOPREFIXER_BROWSERS
        }))
        .pipe($.sourcemaps.write())
        .pipe($.if('*.css', $.csso()))
        .pipe(gulp.dest('public/styles'))
        .pipe($.size({
            title: 'styles'
        }))
        .pipe($.livereload());
});
// Optimize images
gulp.task('images', function() {
    return gulp.src('public/images/**/*')
        .pipe($.cache($.imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('public/images'))
        .pipe($.size({
            title: 'images'
        }))
        .pipe($.livereload());
});

// My Own Wiredep Task for Bower Options
gulp.task('wiredep', function() {
    gulp.src('public/styles/*.{sass,scss}')
        .pipe(wiredep({
            ignorePath: /^(\.\.\/)+/
        }))
        .pipe(gulp.dest('public/styles'));
    gulp.src('app/views/*.jade')
        .pipe(wiredep({
            ignorePath: /^(\.\.\/)+/
        }))
        .pipe(gulp.dest('app/views'))
        .pipe($.livereload());
});
gulp.task('watch', function() {
    gulp.watch(['./public/styles/**/*.sass', './public/styles/**/*.scss'], ['styles']);
    gulp.watch(['app/images/**/*'], ['images']);
    gulp.watch(['./public/scripts/**/*.js', 'app/**/*.js'], ['jshint']);
});

gulp.task('develop', function() {
    $.livereload.listen();
    $.nodemon({
        debug: true,
        ext: 'js coffee jade',
        script: 'app.js',
        stdout: false
    }).on('readable', function() {
        this.stdout.on('data', function(chunk) {
            if (/^Express server listening on port/.test(chunk)) {
                $.livereload.changed(__dirname);
            }
        });
        this.stdout.pipe(process.stdout);
        this.stderr.pipe(process.stderr);
    });
});



gulp.task('default', function(cb) {
    runSequence('styles', ['wiredep', 'jshint', 'watch', 'develop'], cb);
});


/**
 * Production Ready Tasks
 */

 // Clean output directory
 gulp.task('clean', function (cb){
    return del(['.tmp', './dist/*', '!dist/.git'], {dot: true}, cb).then(function (paths) {
       if (paths.length) {
         console.log('Deleted files/folders:\n', paths.join('\n'));
         } else {
           console.log('Nothing to see here');
         }
     });
 });

gulp.task('views', function (){
  return gulp.src('app/views/index.jade')
     .pipe($.jade({pretty: true}))
     .pipe(gulp.dest('.tmp'))
     .pipe($.size({title: 'compile views'}));
});

// Concatenates all minified files
 gulp.task('concatify',['views'], function (){
   var assets = $.useref.assets({searchPath: './public/'});
   return gulp.src('.tmp/*.html')
         .pipe(assets)
         .pipe($.if('*.js', $.uglify()))
         .pipe($.if('*.css', $.csso()))
         .pipe(assets.restore())
         .pipe($.useref())
         .pipe($.if('*.html', $.minifyHtml()))
         .pipe(gulp.dest('dist'))
         .pipe($.size({title: 'concatify'}));
 });

 gulp.task('copy', function (){
    return gulp.src(['public/*.txt', 'public/favicon.ico', 'public/manifest.*'])
        .pipe(gulp.dest('dist'))
        .pipe($.size({title: 'config'}));
 });

 gulp.task('templates', function() {
   return gulp.src('./public/templates/**/*.html')
        .pipe($.minifyHtml())
        .pipe(gulp.dest('./dist/templates'))
        .pipe($.size({title: 'templates'}));
 });

gulp.task('fonts', function () {
  return gulp.src(['./public/font/**', './public/components/materialize/font/**'])
    .pipe(gulp.dest('./dist/font'))
    .pipe($.size({title: 'fonts'}));
});

//Compresion de Imagenes
gulp.task('images', function () {
  return gulp.src('./public/images/**')
    .pipe($.imagemin())
    .pipe(gulp.dest('./dist/images'))
    .pipe($.size({title: 'images'}));
});

gulp.task('production', function (cb) {
  runSequence('clean', ['templates', 'concatify'], ['fonts', 'images', 'copy'], cb)
});
