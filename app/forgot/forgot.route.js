(function() {
    'use strict';

    angular
        .module('password.forgot')
        .config(configureForgotRoutes);

    function configureForgotRoutes($routeProvider) {
        $routeProvider.when('/forgot', {
            title: 'Forgot Password',
            templateUrl: 'forgot/forgot.html',
            controller: 'ForgotController',
            controllerAs: 'vm'
        });
    }
})();
