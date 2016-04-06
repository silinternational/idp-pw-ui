(function() {
    'use strict';

    angular
        .module('password.recovery')
        .config(configureRecoveryRoutes);

    function configureRecoveryRoutes($routeProvider) {
        $routeProvider.when('/recovery', {
            title: 'Recovery methods',
            templateUrl: 'recovery/recovery.html',
            controller: 'RecoveryController',
            controllerAs: 'vm'
        });
    }
})();
