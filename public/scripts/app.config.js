angular.module('SysDownload')
      .constant('TMPDIR', 'templates/')
      .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 'TMPDIR', configFunction]);

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
    })
}
