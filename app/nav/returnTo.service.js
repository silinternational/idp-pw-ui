(function () {
    'use strict';

    angular
      .module('password.nav')
      .factory('returnToService', returnToService);

    function returnToService() {
        var service = {
              url: null,
              buildUrl: buildUrl
            };

        return service;

        //////////////////////////////////////////////////////////////////

        function buildUrl(route) {
            return service.url ? route + '?returnTo=' + service.url : route;
        }
    }
})();
