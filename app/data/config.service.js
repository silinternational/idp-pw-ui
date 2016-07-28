(function () {
    'use strict';

    angular
      .module('password.data')
      .factory('config', config);

    function config(dataService) {
        var service = {
            };

        activate();

        return service;

        //////////////////////////////////////////////////////////////////

        function activate() {
            dataService
              .get('config', {
                  cache: true
              })
              .then(function (response) {
                  angular.copy(response.data, service);
              });
        }
    }
})();
