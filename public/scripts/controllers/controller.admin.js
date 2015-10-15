(function() {
    'use strict';
    angular.module('sysDownload')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['$scope', 'Programas'];

    function AdminController($scope, Programas) {
        var vm = this;
        vm.crearPrograma = createProgram;

        // Funcionalidades del Controlador
        function createProgram(file, program) {
            Programas.create(file, program)
                .then(function(nuevoPrograma) {
                    Materialize.toast('Creado ' + nuevoPrograma.data, 3500);
                },function(err) {
                    console.log(err);
                } ,function(event) {
                    var percentage = parseInt(100.0 * event.loaded / event.total);
                    console.log('Progress: ' + percentage);
              });
        }

        // Funciones internas del Controlador
        $scope.$on('$includeContentLoaded', function() {
            vm.categories = Programas.categories;
            console.log(vm.categories);
            /*jshint camelcase: false */
            $('select').material_select();
        });
    }
})();
