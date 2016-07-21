(function () {
    'use strict';

    angular
      .module('password.auth')
      .config(configureAuthRoutes);

    function configureAuthRoutes($routeProvider) {
        $routeProvider
          .when('/auth/error', {
              title: 'Login error',
              templateUrl: 'auth/error.html',
              controller: 'ErrorController',
              controllerAs: 'vm'
          });
    }
})();
