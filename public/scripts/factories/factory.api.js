(function(){
    'use strict';
    angular.module('sysDownload')
            // Factoria para acceder a la API y regresar la lista de programas en la base de datos
            .factory('API', APIFactory)
            // Factoria para compartir entre controladores, los terminos de busqueda de los programas
            .factory('Busqueda', BusquedaFactory);

    APIFactory.$inject = ['$resource', 'APIURI'];
    function APIFactory ($resource, APIURI) {
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
          isArray: false
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

    function BusquedaFactory() {
      return {
        filter: {
          searchFilter: ''
        }
      };
    }
})();
