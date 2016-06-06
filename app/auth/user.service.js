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
    function userService($q, dataService, $timeout, $window) {
        var user = {},
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
                    deferred.resolve(user);
                });
            } else {
                dataService
                  .get('user/me')
                  .then(function (response) {
                      // need to maintain original reference for consumers
                      // relying on userService.user.
                      angular.copy(response.data, user);

                      if (isAuthenticated(response.data)) {
                          user.cached = new Date();
                      }

                      // convenience API for consumers
                      user.isAuthenticated = isAuthenticated(response.data);

                      deferred.resolve(user);
                  });
            }

            return deferred.promise;
        }

        function isAuthenticated(user) {
            return angular.isDefined(user.idp_username);
        }

        function login() {
            $window.location = dataService.baseUrl() + 'auth/login';
        }

        function logout() {
            $window.location = dataService.baseUrl() + 'auth/logout';
        }
    }
})();
