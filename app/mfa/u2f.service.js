/*global u2f*/ //TODO: currently coming from https://demo.yubico.com/js/u2f-api.js
(function () {
    'use strict';

    angular
      .module('password.mfa')
      .factory('u2fService', u2fService);

    function u2fService($q, $location) {
        var available = false,
            service = {
                isAvailable: isAvailable,
                register: register
            };

        activate();

        return service;

        //////////////////////////////////////////////////////////////////

        function activate() {
            sniffFeature();
        }

        function sniffFeature() {
            // when u2f is supported in browser, the callback will be called no matter what.
            u2f.sign('', '', [], function () {
                available = true;
                console.info('u2f IS available');
            });
        }

        function isAvailable() {
            return available;
        }

        function register(challenge) {
            var deferred = $q.defer(),
                appId = challenge.appId || $location.protocol() + '://' + $location.host();

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
