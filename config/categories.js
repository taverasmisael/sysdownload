'use strict';
/**
 * Change This List to your own categories
 * @type {Array}
 */
var categoryList = [
    {
      availableCategories:[
        {name: 'Os'},
        {name: 'Imagen'},
        {name: 'Curso'},
        {name: 'Seguridad'},
        {name: 'Diseño'},
        {name: 'Redes'},
        {name: 'Documento'},
        {name: 'Otros'}
      ],
      defaultCategory: 'Otros'
    }
];


// Don't touch anything down here
/* ------------------------------- */
var i = 0, ac = categoryList[0].availableCategories, cat4Model = {type: String, enum: [], defaultl: categoryList[0].defaultCategory};

for (i; i < ac.length; i += 1) {
  cat4Model.enum.push(ac[i].name);
}

var catModule = {
  cat4Model: cat4Model,
  catList: categoryList
};

module.exports = catModule;
