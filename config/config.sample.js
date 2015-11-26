'use strict';
var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var categoriesConfig = require('./categories');

var config = {
  development: {
    root: rootPath,
    categories: categoriesConfig,
    app: {
      name: 'sysdownload'
    },
    port: 3030,
    db: 'mongodb://localhost/sysdownload-development',
    static: rootPath + '/public/',
    uploadDir: rootPath + '/public/programas'
  },

  test: {
    root: rootPath,
    categories: categoriesConfig,
    app: {
      name: 'sysdownload'
    },
    port: 5123,
    db: 'mongodb://localhost/sysdownload-test',
    static: rootPath + '/public/',
    uploadDir: rootPath + '/public/programas'
  },

  production: {
    root: rootPath,
    categories: categoriesConfig,
    app: {
      name: 'sysdownload'
    },
    port: 80,
    db: 'mongodb://localhost/sysdownload-production',
    static: rootPath + '/dist/',
    uploadDir: rootPath + '/dist/programas'
  }
};

module.exports = config[env];
