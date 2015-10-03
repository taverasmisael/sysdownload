(function(){
    'use strict';
    angular.module('SysDownload')
                .controller('AdminController' ,['$scope', 'Programas', AdminCtrl]);

    function AdminCtrl ($scope, Programas) {
      var vm = this;
      vm.crearPrograma = createProgram;
      // API.getCategories().$promise.then(function (cats) {
      //   vm.categories = cats;
      // });

      // Funcionalidades del Controlador
      function createProgram (program) {
          var nombrePrograma = Programas.create(program);
          vm.newProgram = '';
          Materialize.toast('Creado ' + nombrePrograma, 3500);
          $('#creationModal').closeModal();
      }

      // Funciones internas del Controlador
      $scope.$on('$includeContentLoaded', function () {
        /*jshint camelcase: false */
        $('select').material_select();
      });
    }
})();
