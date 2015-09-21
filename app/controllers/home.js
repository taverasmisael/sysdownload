'use strict';
var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Program = mongoose.model('Program');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  Program.find(function (err, Programas) {
    if (err) {return next(err);}
    res.render('index', {
      title: 'SysDownload',
      subtitle: 'Un metodo inteligente :D',
      programas: Programas
    });
  });
});
