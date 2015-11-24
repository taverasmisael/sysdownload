(function(){
    'use strict';
    angular.module('sysDownload')
          .controller('NavbarController',  NavbarController);

    NavbarController.$inject = ['$scope', 'Busqueda'];
    function NavbarController ($scope, Busqueda) {
      var vm = this;
      vm.filter = Busqueda.filter;
      vm.clearSearch = clearSearch;


      // Funcionalidades del controlador

      function clearSearch () {
        if (vm.filter.searchFilter) {
          vm.filter.searchFilter = '';
        } else {
          $('.search-box').removeClass('expanded');
        }
      }
    }
})();
