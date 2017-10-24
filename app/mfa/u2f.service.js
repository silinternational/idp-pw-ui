/*global u2f*/ //TODO: currently coming from https://demo.yubico.com/js/u2f-api.js
(function () {
    'use strict';

    angular
      .module('password.mfa')
      .factory('u2fService', u2fService);

    function u2fService($q, $location, bowser) {
        var service = {
                available: false,
                register: register
            };

        activate();

        return service;

        //////////////////////////////////////////////////////////////////

        function activate() {
            sniffFeature();
        }

        function sniffFeature() {
            service.available = (bowser.chrome  && bowser.version >= 41) ||
                                (bowser.firefox && bowser.version >= 48) ||
                                (bowser.opera   && bowser.version >= 39);
        }

        function register(challenge) {
            var deferred = $q.defer(),
                appId = challenge.appId || $location.protocol() + '://' + $location.host();

            //TODO: put u2f in DI
            u2f.register(appId, [challenge], [], handleKeyResponse);

            return deferred.promise;

            //////////////////////////////////////////////////////////////

            function handleKeyResponse(response) {
                return response.errorCode        ?
                       deferred.reject(response) :
                       deferred.resolve(response);
            }
        }
    }
})();
