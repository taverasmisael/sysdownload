(function(){
    'use strict';
    angular.module('SysDownload')
            .service('Programas', ['$localStorage', '$sessionStorage', 'API',  Programas]);

    function Programas ($localStorage, $sesionStorage, API) {
      var lProgramas = $localStorage.programs;

      var ProgramasService = {
        // Getters
        all: lProgramas,
        getAll: getAll,
        getByCategory: getByCategory,
        // Setters
        create: add,
        updateById: update,
        deleteById: deleteById
      };

      // Private Object
      var _local = {
        Programs: _setLocalPrograms,
        lastCategory: {
          name: '',
          elements: {}
        },
        _setLocalCategory: _setLocalCategory,
        addNew: addNewLocal
      };


      return ProgramasService;


      // Private Methods
      function _setLocalPrograms () {
        console.log('getting Locals....');
        if (!$localStorage.programs) {
          API.getAll().$promise.then(function (programs) {
            $localStorage.programs = programs;
          }).catch(function (err) {
            console.log(err);
          });
        }
        lProgramas = $localStorage.programs;

        return lProgramas;
      }


      function _setLocalCategory (catName) {
        if (catName !== $localStorage.lastCategory.name) {
          $localStorage.lastCategory.name = catName;
          $localStorage.lastCategory.elements = lProgramas.reduce(function (programa) {
            return programa.info.category === catName;
          });
        }
        _local.lastCategory = $localStorage.lastCategory;
        return _local.lastCategory;
      }

      function addNewLocal (newProgram) {
        var nuevoPrograma = {programa: newProgram};
        API.create(nuevoPrograma).$promise.then(function (programas) {
          delete $localStorage.programs;
          $localStorage.programs = programas;
        });

        return newProgram.name;
      }

      // Public Methdos
      function getAll () {
        return _local.Programs();
      }

      function getByCategory (categoryName) {
        return _local._setLocalCategory(categoryName);
      }

      function add (newProgram) {
        return _local.addNew(newProgram);
      }

      function update (id, newInfo) {
        return _local.update(id, newInfo);
      }

      function deleteById (id) {
        return _local.deleteById(id);
      }
    }
})();
