(function() {
    'use strict';
    angular.module('sysDownload').service('Programas', Programas);

    Programas.$inject = ['$localStorage', '$sessionStorage', 'Upload', 'API'];

    function Programas($localStorage, $sesionStorage, Upload, API) {
        var lCategories = $localStorage.categories || _fillLocalCategories();
        var ProgramasService = {
            // Getters
            all: getAll,
            categories: lCategories,
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
            console.log('Filling Local Programs :3');
            return API.getAll().$promise;
        }

        function getById (programId) {
         return API.getById({programId: programId}).$promise;
        }

        function getByCategory(catName) {
            // This functionality for now
            // isn't used but just in case
            // This avoid JSHINT falsePositive
            // errors
            console.log(catName, ': This functionality isn\'t implemented yet! :c');
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
           return API.update({programId: programId, update: newData}).$promise;
        }

        function remove(programId) {
            // This functionality for now
            // isn't used but just in case
            // This avoid JSHINT falsePositive
            // errors
            console.log(programId, ': This functionality isn\'t implemented yet! :c');
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
