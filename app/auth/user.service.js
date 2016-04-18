(function () {
    'use strict';

    angular
        .module('password.auth')
        .factory('userService', userService);

    /*
    ** This service is used all over the application so a caching mechanism
    ** is in place in the form of the publicly provided user object.  It will
    ** be loaded on app bootstrap.
    */
    function userService($rootScope, $location, $q, dataService, $timeout, $window) {
        var user = {},
            promise = null,
            service = {
                user: user,
                promise: promise,
                getUser: getUser,
                login: login,
                logout: logout
            };

        activate();

        return service;

        ///////////////////////////////////////////////////////////////////////

        function activate() {
            getUser();

            $rootScope.$watch(authenticationStatus,
                              determineAppropriateView);
        }

        function authenticationStatus() {
            return user.isAuthenticated;
        }

        function determineAppropriateView(newStatus, oldStatus) {
            if (newStatus !== oldStatus) {
                if (newStatus === true ) {
                    $location.url('profile');
                } else {
                    $location.url('welcome');
                }
            }
        }

        function getUser() {
            var deferred = $q.defer();

            promise = deferred.promise;

            if (user.cached) {
                // In order to keep the API consistent a promise needed
                // to be resolved after it was returned so this will add
                // a slight delay to ensure the method reutrns before the
                // promise is resolved.
                $timeout(function() {
                    deferred.resolve(user);
                });
            } else {
                dataService.get('user/me')
                    .success(function (userData) {
                        // need to maintain original reference for consumers
                        // relying on userService.user.
                        angular.copy(userData, user);

                        user.cached = new Date();

                        // convenience API for consumers
                        user.isAuthenticated = userData.idp_username ?
                                               true                  :
                                               false;
                        
                        user.name = user.first_name + ' ' + user.last_name;

                        deferred.resolve(user);
                    });
            }

            return promise;
        }

        function login() {
            $window.location = dataService.baseUrl() + 'auth/login';
        }

        function logout() {
            $window.location = dataService.baseUrl() + 'auth/logout';
        }
    }
})();
