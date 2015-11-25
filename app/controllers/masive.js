'use strict';

var config = require('../../config/config.js');

var path = require('path'),
    walk = require('walk'),
    fs = require('fs'),
    mime = require('mime');

var mongoose = require('mongoose'),
    Programs = mongoose.model('Program');

module.exports = function(req, res) {
    var ProgramFolder = config.uploadDir,
        walker;

    var found = {counter: 0, elems: [] },
        added = {counter: 0, elems: [] },
        searched = 0;

    walker = walk.walk(ProgramFolder, {
        followLinks: true
    });

    walker.on('file', checkFile);
    walker.on('directory', (root, dirStatsArray, next) => next());
    walker.on('errors', (root, nodeStatsArray, next) => {
        console.error('Error de tipo: ', nodeStatsArray, +'en el sitio:" ' + root + '".');
        next();
    });
    walker.on('end', () => {
        res.json({
            found: found,
            searched: searched,
            added: added
        });
    });

    function checkFile(root, fileStats, next) {
        _getFilePath(root, fileStats.name)
            .then((filePath) => {
                searched += 1;
                Programs.findOne({
                    'file.path': filePath
                }).then((programa) => {
                    if (programa) {
                        found.counter += 1;
                        found.elems.push(programa);
                        next();
                    } else {
                        _saveProgramToDB(filePath).then((newProgram) => {
                          added.counter += 1;
                          added.elems.push(newProgram);
                          next();
                        }).catch((err) => console.log('Error Guardando El nuevo Programa ', err));
                    }
                }).catch((err) => console.log('Error Accediendo a la DB ', err));
            }).catch((err) => console.log('Error obteniendo el nombre ', err));
    }

    function _getFilePath(dir, file) {
        var $promise = new Promise(function(resolve, reject) {
            if (dir && file) {
                // We Resolve sended paths relative to our public folder
                var filePath = path.relative(config.static, path.resolve(dir, file));
                filePath = filePath.split(path.sep);
                filePath = filePath.join('/');
                resolve(filePath);
            } else {
                reject('No se especifico un directorio o un nombre de archivo');
            }
        });

        return $promise;
    }

    function _saveProgramToDB (filePath) {
      var $promise;

      function save2DB (resolve, reject) {
        var program = {
          info: {
            name: 'String',
            resume: '',
            category: ''
          },
          file: {
            path: 'String',
            mime: 'String',
            size: 0
          }
        };
        var relPath, fileMime, fileSize, fileName, fileExt, fileResume = 'Un Programa';
        fileMime = mime.lookup(filePath);
        relPath = path.resolve(__dirname, '../../public/' + filePath);
        fs.stat(relPath, (err, stats) => {
          if (err) {
            console.log(err);
            reject(err);
          }
          fileExt = mime.extension(fileMime);
          fileName = path.basename(filePath).split('.')[0];
          fileSize = stats.size;

          // Asing Properties to the Object
          program.info.name = fileName;
          program.info.resume = fileResume;
          program.file.path = filePath;
          program.file.mime = fileMime;
          program.file.size = fileSize;
          resolve(program);
        });
      }

      $promise = new Promise(save2DB);
      return $promise;
    }
};
