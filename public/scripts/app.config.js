(function(){
    'use strict';
    angular.module('SysDownload')
          .config(configFunction);

    configFunction.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', 'TMPDIR'];
    function configFunction ($stateProvider, $urlRouterProvider, $locationProvider, TMPDIR) {
      $locationProvider.html5Mode(true);
      $urlRouterProvider.otherwise('');

      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: TMPDIR+'main.tpl.html',
          controller: 'HomeController',
          controllerAs: 'HomeCtrl'
        })
        .state('category', {
          url: '/category/',
          templateUrl: TMPDIR+'category.tpl.html',
          controller: 'CategoryController',
          controllerAs: 'CatController'
        });
    }

})();
