(function () {
    'use strict';

    angular
      .module('password.token')
      .factory('tokenService', tokenService);

    function tokenService($window) {
        var service = {
                setApiToken: setApiToken,
                getClientKey: getClientKey,
                getToken: getToken,
                clear: clear
            };

        activate();

        return service;

        //////////////////////////////////////////////////////////////////

        function activate() {
            if (! $window.sessionStorage.getItem('clientKey')) {
                $window.sessionStorage
                  .setItem('clientKey', generateClientSideKey());
            }
        }

        function generateClientSideKey() {
            return Math
              .random() // doesn't need to be cryptographically strong
              .toString(36) // convert to base-36 so we get more letters
              .substring(2,32); // strip the 0. and ensure <= 32 chars
        }

        function setApiToken(token) {
            $window.sessionStorage
              .setItem('apiToken', token);
        }

        function getClientKey() {
            return $window.sessionStorage.getItem('clientKey');
        }

        function getToken() {
            var clientKey = $window.sessionStorage.getItem('clientKey'),
                apiToken = $window.sessionStorage.getItem('apiToken');

            return clientKey.concat(apiToken);
        }

        function clear() {
            $window.sessionStorage.removeItem('clientKey');
            $window.sessionStorage.removeItem('apiToken');
        }
    }
})();
