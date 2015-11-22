(function(){
    'use strict';
    angular.module('sysDownload')
          .constant('TMPDIR', 'templates/')
          .constant('APIURI', '/api/programs/:programId');
})();
