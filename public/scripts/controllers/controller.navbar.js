(function(){
    'use strict';
    angular.module('SysDownload')
          .controller('NavbarController', ['$scope', 'Busqueda', NavbarController]);

    function NavbarController ($scope, Busqueda) {
      var vm = this;
      vm.filter = Busqueda.filter;
      vm.clearSearch = clearSearch;


      // Funcionalidades del controlador

      function clearSearch () {
        if (vm.filter.searchFilter) {
          vm.filter.searchFilter = '';
        } else {
          console.log('Ocultate');
          $('.search-box').removeClass('expanded');
        }
      }
    }
})();