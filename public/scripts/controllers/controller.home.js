(function(){
    'use strict';
    angular.module('sysDownload')
            .controller('HomeController' , HomeController);

    HomeController.$inject = ['$scope', 'Programas', 'Busqueda'];
    function HomeController ($scope, Programas, Busqueda) {
      var vm = this;
      vm.filter = Busqueda.filter;
      vm.download = descargar;
      vm.openCreate = openCreationModal;
      vm.setCurrentProgram = setCurrentProgram;

      vm.programas = Programas.all;

      // Funcionalidades del Controlador
      function descargar (programaNombre) {
        Materialize.toast('Descargando ' + programaNombre, 3500);
      }

      function setCurrentProgram (programId) {
          Programas.getById(programId).then(function (programa) {
              Busqueda.selectedProgram.current = programa.info;
          });
      }
      function openCreationModal () {
        $('#creationModal').openModal();
      }
    }
})();
