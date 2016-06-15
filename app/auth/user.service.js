(function () {
    'use strict';

    angular
      .module('password.auth')
      .factory('userService', userService);

    /*
     * This service is used all over the application so a caching
     * mechanism is in place in the form of the publicly provided user
     * object.  It will be loaded on app bootstrap.
     */
    function userService($q, dataService, $timeout, $window, 
                         tokenService) {
        var user = {
                isAuthenticated: false
            },
            service = {
                user: user,
                getUser: getUser,
                login: login,
                logout: logout
            };

        activate();

        return service;

        //////////////////////////////////////////////////////////////////

        function activate() {
            getUser();
        }

        function getUser() {
            var deferred = $q.defer();

            if (user.cached) {
                // In order to keep the API consistent a promise needed
                // to be resolved after it was returned so this will add
                // a slight delay to ensure the method returns before the
                // promise is resolved.
                $timeout(function () {
                    resolvePromise();
                });
            } else {
                dataService
                  .get('user/me')
                  .then(retrieved, failed)
                  .finally(resolvePromise);
            }

            return deferred.promise;

            //////////////////////////////////////////////////////////////

            function retrieved(response) {
                // need to maintain original reference for consumers
                // relying on userService.user.
                angular.copy(response.data, user);

                if (angular.isDefined(response.data.idp_username)) {
                    user.cached = new Date();
                    user.isAuthenticated = true;
                }
            }

            function failed() {
                user.isAuthenticated = false;
                user.cached = null;
            }

            function resolvePromise() {
                deferred.resolve(user);
            }
        }

        function login(returnToUrl) {
            var loginUrl = dataService.baseUrl() + 
                           'auth/login?client_id=' + 
                           tokenService.getClientKey();

            if (returnToUrl) {
                loginUrl += '&ReturnTo=' + returnToUrl;
            }

            $window.location = loginUrl;
        }

        function logout() {
            $window.location = dataService.baseUrl() +
                               'auth/logout?access_token=' + 
                               tokenService.getToken();

            tokenService.clear();
        }
    }
})();
