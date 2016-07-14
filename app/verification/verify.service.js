(function () {
    'use strict';

    angular
      .module('password.verification')
      .factory('verifyService', verifyService);

    function verifyService($q, dataService, tokenService) {
        var deferred = null,
            service = {
              verifyReset: verifyReset,
              verifyMethod: verifyMethod
            };

        activate();

        return service;

        //////////////////////////////////////////////////////////////////

        function activate() {
        }

        function verifyReset(resetId, code) {
            deferred = $q.defer();
            
            dataService
              .put('reset/' + resetId + '/validate', {
                  code: code,
                  client_id: tokenService.getClientKey()
              })
              .then(validResetCode, invalid);

            return deferred.promise;
        }

        function validResetCode(response) {
            tokenService.setApiToken(response.data.access_token);
            
            deferred.resolve();
        }

        function invalid(response) {
            deferred.reject(response.data);
        }

        function verifyMethod(methodId, code) {
            deferred = $q.defer();

            dataService
              .put('method/' + methodId, {
                  code: code
              })
              .then(validMethodCode, invalid);

            return deferred.promise;
        }

        function validMethodCode() {
            deferred.resolve();
        }
    }
})();
