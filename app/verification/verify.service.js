(function () {
    'use strict';

    angular
      .module('password.verification')
      .factory('verifyService', verifyService);

    function verifyService($q, dataService, $routeParams, tokenService) {
        var deferred = null,
            service = {
              //verify reset
              verify: verify
              //verify method
            };

        activate();

        return service;

        //////////////////////////////////////////////////////////////////

        function activate() {
        }

        function verify(code) {
            deferred = $q.defer();
            
            dataService
              .put('reset/' + $routeParams.resetId + '/validate', {
                  code: code,
                  client_id: tokenService.getClientKey()
              })
              .then(valid, invalid);

            return deferred.promise;
        }

        function valid(response) {
            tokenService.setApiToken(response.data.access_token);
            
            deferred.resolve();
        }

        function invalid(response) {
            deferred.reject(response.data);
        }
    }
})();
