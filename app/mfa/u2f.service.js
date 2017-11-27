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
                register: register,
                ErrorCodes: u2f.ErrorCodes || {
                    'OK': 0,
                    'OTHER_ERROR': 1,
                    'BAD_REQUEST': 2,
                    'CONFIGURATION_UNSUPPORTED': 3,
                    'DEVICE_INELIGIBLE': 4,
                    'TIMEOUT': 5
                }
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
                if (isU2fError(response)) {
                    return deferred.reject(convertToCommonErrorFormat(response));
                }

                return deferred.resolve(response);
            }

            /**
             * @param {u2f.Error|u2f.SignResponse=} response
             */
            function isU2fError (response) {
                return !!response.errorCode;
            }

            /**
             * @param {u2f.Error=} error
             */
            function convertToCommonErrorFormat (error) {
                return {
                    data: {
                        name: Object.keys(service.ErrorCodes)[error.errorCode],
                        code: error.errorCode,
                        message: error.errorMessage || createMessage(error.errorCode)
                    }
                };
            }

            /**
             * https://developers.yubico.com/U2F/Libraries/Client_error_codes.html
             * @param {u2f.ErrorCodes=} code
             */
            function createMessage (code) {
                switch (code) {
                    case 1:
                    case 2:
                    case 3: return 'Something unknown went wrong with that request, unable to set this up for you at this time.';
                    case 4: return 'This key may already be registered on this site.';
                    case 5: return 'That took a little too long, check to make sure your key is inserted right-side up.';
                }
            }

        }
    }
})();
