'use strict';
var config = require('../../config/config');
var formidable = require('formidable'),
    fs = require('fs'),
    path = require('path');

module.exports = function (req, res, next) {
  var form = new formidable.IncomingForm();
  console.log('Hola Middleware');

  form.uploadDir = path.normalize(config.uploadDir);
  form.parse(req, function (err, fields, files) {
    if (err) {throw err;}

    console.log(files);

    var programFile = files.files;
    var tempPath = programFile.path;
    var targetPath = path.resolve(config.uploadDir + '/' + programFile.name);

    req.body.programa = {};
    req.body.programa.name = fields['program[name]'];
    req.body.programa.category = fields['program[category]'] || 'Otros';
    req.body.programa.resume = fields['program[resume]'];

    req.fileInfo = {
      mime: programFile.type,
      size: programFile.size,
      path: targetPath
    };
    next();

  });

};
