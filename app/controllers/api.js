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
    Program.find(function(err, programas) {
        if (err) {
            console.log('Ocurrio un error Accediento a los programas: \n', err);
            res.send(err);
        }
        res.json(programas);
    });
});

// Call an specific program byID. Returns one program
router.get('/api/programs/:programId', function (req, res) {
    console.log('Especific Program: ', req.params.programId);
    var id = req.programId;
    Program.findById(id, function(err, programa) {
        if (err) {
            console.log('Ocurrio un error encontrando el programa: "', id, '"\n ', err);
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
    console.log(catName);
    Program.find({
      "info.category": catName
    }, function(err, programas) {
        if (err) {
            console.log('Ocurrio un error al acceder a la categoria: "', catName, '"\n', err);
            res.send(err);
        }

        res.json(programas);
    });
});


// Create a new Program
router.post('/api/programs/', function(req, res) {
    var newProgram = req.body.programa;
    var Programa = new Program();
    console.log(req.body);
    Programa.info.name = newProgram.name;
    Programa.info.resume = newProgram.resume;
    Programa.info.category = newProgram.category;
    // This `Programa.file will be provider by a promise function
    // that upload the file and returns his file info.
    Programa.file = {
        path: '/programas/defaultPath.exe',
        mime: 'application/exe'
    };

    Programa.save(function(err) {
        if (err) {
            console.log('Ocurrio un error salvando el programa (ya esta en el sistema de archivos) \n', err);
            res.send(err);
        }

        Program.find(function(err, programas) {
            if (err) {
                console.log('Ocurrio un error Accediento a los programas: \n', err);
                res.send(err);
            }

            res.json(programas);
        });
    });
});

// Update an specific program byID
router.put('/api/programs/:programId', function(req, res) {
    var id = req.params.programId,
        update = req.body.update;
    console.log('HOLIS', id, update);
    Program.findByIdAndUpdate(id, update, function(err, programa) {
        if (err) {
            console.log('Ocurrio un error actualizando el programa: "', id, '"\n', err);
            res.send(err);
        }
        console.log('Programa: ', programa.nombre, ' actualizado.');
        Program.find(function(err, programas) {
            if (err) {
                console.log('Ocurrio un error Accediento a los programas: \n', err);
                res.send(err);
            }
            res.json(programas);
        });
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
            console.log('Ocurrio un error elminando de la DB a: "', id, '"n', err);
            res.send(err);
        }
        Program.find(function(err, programas) {
            if (err) {
                console.log('Ocurrio un error Accediento a los programas: \n', err);
                res.send(err);
            }
            res.json(programas);
        });
    });
});
