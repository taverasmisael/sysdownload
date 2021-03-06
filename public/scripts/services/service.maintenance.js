(function(){
    'use strict';
    angular.module('sysDownload').service('Maintenance', Maintenance);

    Maintenance.$inject = ['$http'];
    function Maintenance ($http) {
      var MaintenanceService = {
        serverInfo: getServerInfo,
        masively: addMasively
      };
      return MaintenanceService;

      function getServerInfo () {
        return $http.get('/api/maintenance/info');
      }

      function addMasively () {
        // This is the most precious function and the most
        // DANGEROUS functionality. Use carefully
        return $http.get('/api/maintenance/masive');
      }
    }
})();
