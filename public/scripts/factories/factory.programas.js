(function(){
    'use strict';
    angular.module('SysDownload')
            .constant('APIURI', '/api/programs/:programId')
            .factory('Programas', ['$resource', 'APIURI', ProgramasFactory]);

    function ProgramasFactory ($resource, APIURI) {
      var ProgramasMethods = {
        getAll: {
          method: 'GET',
          params: {programId: '@programId'},
          isArray: true
        },
        getById: {
          method: 'GET',
          params: {programId: '@programId'},
          isArray: true
        },
        getByCategory: {
          url: 'api/category/:categoryName',
          method: 'GET',
          params: {categoryName: '@categoryName'},
          isArray: true
        },
        getCategories: {
          url: 'api/category/:categoryName',
          method: 'GET',
          params: {categoryName: '@categoryName'},
          isArray: true
        },
        create: {
          method: 'POST',
          params: {programa: '@programa'},
          isArray: true
        },
        update: {
          method: 'PUT',
          params: {programId: '@programId', update: '@update'},
          isArray: true
        }
      };

      return $resource(APIURI, {programId: '@programId'}, ProgramasMethods);
    }
})();
