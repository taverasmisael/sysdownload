(function(){
    'use strict';
    angular.module('SysDownload')
            .controller('HomeController' ,['$scope', 'Programas', HomeCtrl]);

    function HomeCtrl ($scope, Programas) {
      var vm = this;
      var CARDCOLORS = ['pink darken-2', 'deep-purple darken-2', 'blue darken-1', 'cyan darken-2', 'green darken-1', 'yellow darken-3', 'orange darken-2', 'brown darken-3', 'blue-grey darken-3', 'red darken-2', 'purple darken-3', 'light-blue darken-2', 'teal darken-3'];

      Programas.query().$promise.then(function (data) {
        var programas = data;
        vm.programas = programas;
      }).then(function () {
        for (var i = 0; i < vm.programas.length; i += 1) {
          vm.programas[i].cardColor = CARDCOLORS[Math.floor(Math.random() * CARDCOLORS.length)];
        }
      });
    }
})();
