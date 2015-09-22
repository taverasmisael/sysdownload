angular.module('SysDownload')
      .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', configFunction]);

function configFunction ($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'main.tpl.html',
      controller: 'HomeController',
      controllerAs: 'HomeCtrl'
    })
    .state('category', {
      url: '/category/',
      templateUrl: 'category.tpl.html',
      controller: 'CategoryController',
      controllerAs: 'CatController'
    })
}
