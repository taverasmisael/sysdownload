'use strict';
var express = require('express'),
    router = express.Router();

module.exports = function (app) {
  app.use('*', function (req, res) {
    res.render('index', {
      title: 'SysDownload',
      subtitle: 'Servidor Práctico de Archivos'
    });
  });
};
