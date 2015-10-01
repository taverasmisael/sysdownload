(function(){
    'use strict';
    angular.module('SysDownload')
                .controller('AdminController' ,['$scope', 'Programas', AdminCtrl]);

    function AdminCtrl ($scope, Programas) {
      var vm = this;
      vm.crearPrograma = createProgram;
      Programas.getCategories().$promise.then(function (cats) {
        vm.categories = cats;
      });

      // Funcionalidades del Controlador
      function createProgram (program) {
        var newProgram = {programa: program};
        Programas.create(newProgram).$promise.then(function () {
          Materialize.toast('Creado ' + vm.newProgram.name, 3500);
          vm.newProgram = '';
          $('#creationModal').closeModal();
        });
      }

      // Funciones internas del Controlador
      $scope.$on('$includeContentLoaded', function () {
        /*jshint camelcase: false */
        $('select').material_select();
      })
    }
})();
