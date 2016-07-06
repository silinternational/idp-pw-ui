(function () {
    'use strict';

    angular
      .module('password')
      .config(configureRoutes);

    function configureRoutes($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: '/welcome'
        });
    }
})();
