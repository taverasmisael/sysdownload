'use strict';
var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Program = mongoose.model('Program');

var categoryList = {
    availableCategories: ['Os', 'Crack', 'Ide', 'Seguridad', 'Diseño', 'Utilidades', 'Documento', 'Otros'],
    defaultCategory: 'Otros'
  };

module.exports = function (app) {
  app.use(router);
};

// Getters

// Basic API Call. Returns All programs in DB
router.get('/api/programs/', function (req, res) {
  Program.find(function (err, programas) {
    if (err) {
      res.send(err);
      console.log(err);
    }
    res.json(programas);
  });
});

// Call an specific program byID. Returns one program
router.get('/api/programs/:programId', function (req, res) {
  Program.findById(req.params.programId, function (err, programa) {
    if (err) {
      res.send(err);
      console.log(err);
    }

    res.json(programa);
  });
});

// Call the list of available categories
router.get('/api/category', function (req, res) {
  res.json(categoryList);
});

// Call an specific Category
router.get('/api/category/:catId', function (req, res) {
  Program.find({info: {category: req.params.catId}}, function (err, programas) {
    if (err) {
      res.send(err);
      console.log(err);
    }

    res.json(programas);
  });
});


