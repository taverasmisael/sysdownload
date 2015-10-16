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
        $http.get('/api/mainenance/info')
              .then(function (si) {
                console.log(si);
              });
      }

      function addMasively () {
        // This is the mos precious function and the most
        // DANGEROUS functionality. Use carefully
      }
    }
})();
