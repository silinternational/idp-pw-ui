(function () {
    'use strict';

    angular
      .module('password.data')
      .factory('configService', configService);

    /*
     * This service is used all over the application so a caching
     * mechanism is in place in the form of the publicly provided config
     * object.  It will be loaded on app bootstrap.
     */
    function configService($q, dataService, $timeout) {
        var config = {},
            service = {
                config: config,
                getConfig: getConfig
            };

        activate();

        return service;

        //////////////////////////////////////////////////////////////////

        function activate() {
            getConfig();
        }

        function getConfig() {
            var deferred = $q.defer();

            if (config.cached) {
                // In order to keep the API consistent a promise needed
                // to be resolved after it was returned so this will add
                // a slight delay to ensure the method returns before the
                // promise is resolved.
                $timeout(function () {
                    deferred.resolve(config);
                });
            } else {
                dataService
                  .get('config')
                  .then(function (response) {
                      // need to maintain original reference for consumers
                      // relying on configService.config.
                      angular.copy(response.data, config);

                      config.cached = new Date();

                      deferred.resolve(config);
                  });
            }

            return deferred.promise;
        }
    }
})();
