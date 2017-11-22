(function () {
    'use strict';

    angular
      .module('password.mfa')
        .factory('u2f', config)
        .factory('u2fService', u2fService);

    function config($window) {
        return $window.u2f;
    }

    function u2fService($q, $location, bowser, u2f) {
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

            u2f.register(appId, [challenge], [], handleKeyResponse);

            return deferred.promise;

            //////////////////////////////////////////////////////////////

            function handleKeyResponse(response) {
                if (u2f.isU2fError(response)) {
                    return deferred.reject(u2f.convertToCommonErrorFormat(response));
                }

                return deferred.resolve(response);
            }
        }
    }
})();
