(function(){
    'use strict';
    angular.module('SysDownload')
            .controller('HomeController' ,['$scope', 'Programas', 'Busqueda', HomeCtrl]);

    function HomeCtrl ($scope, Programas, Busqueda) {
      var vm = this;
      var CARDCOLORS = ['pink-text text-darken-2', 'deep-purple-text text-darken-2', 'blue-text darken-1', 'cyan-text text-darken-2', 'green-text darken-1', 'yellow-text text-darken-3', 'orange-text text-darken-2', 'brown-text text-darken-3', 'blue-grey-text text-darken-3', 'red-text text-darken-2', 'purple-text text-darken-3', 'light-blue-text text-darken-2', 'teal-text text-darken-3'];

      Programas.query().$promise.then(function (data) {
        var programas = data;
        vm.programas = programas;
      }).then(function () {
        for (var i = 0; i < vm.programas.length; i += 1) {
          vm.programas[i].cardColor = CARDCOLORS[Math.floor(Math.random() * CARDCOLORS.length)];
        }
      });
      vm.filter = Busqueda.filter;
    }
})();
