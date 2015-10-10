(function(){
    'use strict';
    angular.module('SysDownload')
                .controller('AdminController' ,['$scope', 'Programas', 'Upload', AdminCtrl]);

    function AdminCtrl ($scope, Programas, Upload) {
      var vm = this;
      vm.crearPrograma = createProgram;
      // API.getCategories().$promise.then(function (cats) {
      //   vm.categories = cats;
      // });

      // Funcionalidades del Controlador
      function createProgram (file, program) {
          Upload.upload({
            url: '/api/programs',
            data: {files: file, program }
          }).then(function (nuevo) {
            console.log(nuevo.data);
            Materialize.toast('Creado ' + nuevo.data, 3500);
          }, function (err) {
            console.log(err);
          }, function (event) {
            var percentage = parseInt(100.0* event.loaded / event.total);
            console.log('Progress: ' + percentage);
          });
      }

      // Funciones internas del Controlador
      $scope.$on('$includeContentLoaded', function () {
        /*jshint camelcase: false */
        $('select').material_select();
      });
    }
})();
