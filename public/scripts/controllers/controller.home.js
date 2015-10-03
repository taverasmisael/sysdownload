(function(){
    'use strict';
    angular.module('SysDownload')
            .controller('HomeController' ,['$scope', 'Programas', 'Busqueda', HomeCtrl]);

    function HomeCtrl ($scope, Programas, Busqueda) {
      var vm = this;
      vm.filter = Busqueda.filter;
      vm.download = descargar;
      vm.openCreate = openCreationModal;

      vm.programas = Programas.all;

      // Funcionalidades del Controlador
      function descargar (programaNombre) {
        Materialize.toast('Descargando ' + programaNombre, 3500);
      }

      function openCreationModal () {
        $('#creationModal').openModal();
      }
    }
})();