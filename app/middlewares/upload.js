'use strict';
var config = require('../../config/config');
var formidable = require('formidable'),
    fs = require('fs'),
    path = require('path');

module.exports = function (req, res, next) {
  var form = new formidable.IncomingForm();
  console.log('Hola Middleware');

  form.uploadDir = path.normalize(config.uploadDir);
  form.keepExtensions = true;
  form.parse(req, function (err, fields, files) {
    if (err) {throw err;}

    console.log(files);

    var date = new Date().toJSON().split('T')[0];
    var programFile = files.files,
        tempPath = programFile.path,
        targetPath = path.resolve(config.uploadDir + '/' + date + '/' + programFile.name);

    req.body.programa = {};
    req.body.programa.name = fields['programa[name]'] || programFile.name;
    req.body.programa.category = fields['programa[category]'] || 'Otros';
    req.body.programa.resume = fields['programa[resume]'];

    req.fileInfo = {
      mime: programFile.type,
      size: programFile.size,
      path: 'programas/' + date + '/' + path.basename(targetPath)
    };

    fs.stat(path.dirname(targetPath), function (err) {
      if (err && err.code === 'ENOENT') {
        fs.mkdir(path.dirname(targetPath), function (err) {
          if (err) {throw err;}
          fs.rename(tempPath, targetPath, function (err) {
              if (err) {throw err;}
              next();
          });
        });
      } else {
        fs.rename(tempPath, targetPath, function (err) {
            if (err) {throw err;}
            next();
        });
      }
    });
  });

};
