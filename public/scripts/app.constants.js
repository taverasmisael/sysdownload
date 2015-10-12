(function(){
    'use strict';
    angular.module('SysDownload')
          .constant('TMPDIR', 'templates/')
          .constant('APIURI', '/api/programs/:programId');
})();
