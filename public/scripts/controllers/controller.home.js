(function() {
    'use strict';
    angular.module('sysDownload')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'Programas', 'Busqueda'];

    function HomeController($scope, Programas, Busqueda) {
        var vm = this;
        vm.download = descargar;
        vm.openCreate = openCreationModal;
        vm.setCurrentProgram = setCurrentProgram;

        active();


        function active() {
            vm.filter = Busqueda.filter;
            Programas.all().then(function(programas) {
                vm.programas = programas;
            }).catch(function(err) {
                console.log('Error obteniendo del Servicio: ', err);
            });
        }

        // Funcionalidades del Controlador
        function descargar(programaNombre) {
            Materialize.toast('Descargando ' + programaNombre, 3500);
        }

        function setCurrentProgram(programId) {
            Programas.getById(programId).then(function(programa) {
                Busqueda.selectedProgram.current = programa;
            });
        }

        function openCreationModal() {
            $('#creationModal').openModal();
        }
    }
})();
