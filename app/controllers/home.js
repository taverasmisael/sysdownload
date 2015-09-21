'use strict';
var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Program = mongoose.model('Program');

module.exports = function (app) {
  app.use('*', function (req, res) {
    res.render('index');
  });
};
