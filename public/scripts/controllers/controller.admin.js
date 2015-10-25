(function() {
    'use strict';
    angular.module('sysDownload')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['$scope', '$timeout', 'Busqueda', 'Programas', 'Maintenance'];

    function AdminController($scope, $timeout, Busqueda, Programas, Maintenance) {
        var vm = this;
        vm.crearPrograma = createProgram;
        vm.reloadServerinfo = getServerInfo;
        vm.editProgram = editProgram;

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
        function editProgram (newData) {
            console.log('Controller Data: ', newData);
            Programas.update(Busqueda.selectedProgram   .current._id, newData)
            .then(function () {
                Materialize.toast('Actualizado ' + newData.name, 3500);
            });
        }

        function getServerInfo () {
          Maintenance.serverInfo()
                .then(function (res) { // res === response
                  vm.serverinfo = res.data;
                });
        }

        // Funciones internas del Controlador
        $scope.$on('$includeContentLoaded', function() {
            vm.categories = vm.categories || Programas.categories;
            $timeout(createSelects, 1000);
        });

        $scope.$watch(function () { return Busqueda.selectedProgram.current; }, function (newVal) {
            console.log(Busqueda.selectedProgram.current);
            if (typeof newVal !== 'undefined') {
                vm.currentSelected = Busqueda.selectedProgram.current.info;
            }
        });

        function createSelects () {
            /*jshint camelcase: false */
            $('select').material_select();
        }
    }
})();
