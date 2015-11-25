'use strict';
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Program = mongoose.model('Program');

var maintenance = require('./maintenance'),
    uploadFile = require('../middlewares/upload'),
    masive = require('./masive');

var categoryList = [
    {
      availableCategories:[
        {name: 'Os'},
        {name: 'Crack'},
        {name: 'Ide'},
        {name: 'Seguridad'},
        {name: 'Diseño'},
        {name: 'Utilidades'},
        {name: 'Documento'},
        {name: 'Otros'}
      ],
      defaultCategory: 'Otros'
    }
];

module.exports = function (app) {
    app.use(router);
};

// Getters

// Basic API Call. Returns All programs in DB
router.get('/api/programs/', function (req, res) {
    Program.find(function(err, programas) {
        if (err) {
            console.log(`Ocurrio un error Accediento a los programas: ${err}`);
            res.send(err);
        }
        res.json(programas);
    });
});

// Call an specific program byID. Returns one program
router.get('/api/programs/:programId', function (req, res) {
    var id = req.params.programId;
    Program.findById(id, function(err, programa) {
        if (err) {
            console.log(`Ocurrio un error encontrando el programa: "${id}": ${err}`);
            res.send(err);
        }

        res.json(programa);
    });
});

// Call the list of available categories
router.get('/api/category', function(req, res) {
    res.json(categoryList);
});

// Call an specific Category
router.get('/api/category/:categoryName', function(req, res) {
    var catName = req.params.categoryName;

    Program.find({
      'info.category': catName
    }, function(err, programas) {
        if (err) {
            console.log(`Ocurrio un error al acceder a la categoria: "${catName}": err`);
            res.send(err);
        }
        res.json(programas);
    });
});


// Create a new Program
router.post('/api/programs/', uploadFile, function(req, res) {
  var newProgram = req.body.programa;
  var Programa = new Program();
    Programa.info = newProgram;
    Programa.file = req.fileInfo;

    Programa.save(function(err, newP) {
        if (err) {
            console.log(`Ocurrio un error salvando el programa (ya esta en el sistema de archivos) \n ${err}`);
            res.send(err);
        }
        console.log('Programa Creado');

        Program.findById(newP.id, function(err, nuevoPrograma) {
            if (err) {
                console.log(`Ocurrio un error Accediento al programa: \n ${newP}`);
                res.send(err);
            }
            console.log(nuevoPrograma);
            res.json(nuevoPrograma);
        });
    });

});

// Update an specific program byID
router.put('/api/programs/:programId', function(req, res) {
    var id = req.params.programId,
        update = req.body.update;
    Program.findByIdAndUpdate(id, {info: update}, function(err, programa) {
        if (err) {
            console.log(`Ocurrio un error actualizando el programa: "${id}" \n ${err}`);
            res.send(err);
        }
        console.log(`Programa: "${programa}" actualizado`);
        res.json(programa);
    });
});

// Delete an specific program byID
router.delete('/api/programs/:programId', function(req, res) {
    var id = req.params.programId;

    // Here we use a function promise for delete the program from file system
    // and if the promise resolves, we delete it from the DB
    Program.remove({
        _id: id
    }, function(err) {
        if (err) {
            console.log(`Ocurrio un error elminando de la DB a: "${id}": ${err}`);
            res.send(err);
        }
        Program.find(function(err, programas) {
            if (err) {
                console.log(`Ocurrio un error Accediento a los programas: \n ${err}`);
                res.send(err);
            }
            res.json(programas);
        });
    });
});


router.get('/api/maintenance/info', maintenance);
router.get('/api/maintenance/masive', masive);
