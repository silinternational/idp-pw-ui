(function () {
    'use strict';

    angular
      .module('password.auth')
      .factory('userService', userService);

    function userService($q, dataService, $window, tokenService) {
        var service = {
                getUser: getUser,
                login: login,
                logout: logout
            };

        activate();

        return service;

        //////////////////////////////////////////////////////////////////

        function activate() {
        }

        function getUser() {
            var deferred = $q.defer();

            dataService
              .get('user/me')
              .then(retrieved, failed);

            return deferred.promise;

            //////////////////////////////////////////////////////////////
            
            function retrieved(response) {
                var user = response.data;
                
                user.isAuthenticated = angular.isDefined(response
                                                           .data
                                                           .idp_username);
                
                deferred.resolve(user);
            }

            function failed(response) {
                deferred.reject(response);
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
