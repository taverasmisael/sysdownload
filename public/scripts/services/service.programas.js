(function() {
    'use strict';
    angular.module('sysDownload').service('Programas', Programas);

    Programas.$inject = ['$localStorage', '$sessionStorage', 'Upload', 'API'];

    function Programas($localStorage, $sesionStorage, Upload, API) {
        var lProgramas = $localStorage.programs || _fillLocalPrograms(),
            lCategories = $localStorage.categories || _fillLocalCategories();
        var ProgramasService = {
            // Getters
            all: lProgramas,
            categories: lCategories,
            getAll: getAll,
            getById: getById,
            getCategories: lCategories,
            getByCategory: getByCategory,
            // Setters
            create: add,
            update: update,
            remove: remove
        };

        return ProgramasService;


        // Service Functionallity
        function getAll() {
            // body...
        }

        function getById (programId) {
         return API.getById({programId: programId}).$promise;
        }

        function getByCategory(catName) {
            // body...
        }

        function add(programFile, newProgram) {
            return Upload.upload({
                url: '/api/programs',
                data: {
                    files: programFile,
                    programa: newProgram
                }
            });
        }

        function update(programId, newData) {
           return API.update({programId: programId, update: newData}).$promise
                  .then(function () {
                    _fillLocalPrograms();
                  });
        }

        function remove(programId) {
            // body...
        }


        // Internal Functions
        function _fillLocalPrograms() {
            API.getAll().$promise.then(function (programs) {
                $localStorage.programs = programs;
                return programs;
            }).catch(errHanddler);
        }

        function _fillLocalCategories () {
            API.getCategories().$promise.then(function (categories) {
                console.log('Calling Categories API....');
                $localStorage.categories = categories[0];
                return categories[0];
            }).catch(errHanddler);
        }

        // Really Private Functions
        function errHanddler(err) {
            var error = err || {
                name: 'Unexpected Error. No name Provider',
                type: undefined
            };

            console.log(error);
        }
    }
})();
