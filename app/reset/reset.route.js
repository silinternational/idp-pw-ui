(function () {
    'use strict';

    angular
      .module('password.reset')
      .config(configureResetRoutes);

    function configureResetRoutes($routeProvider) {
        $routeProvider.when('/reset/:resetId/verify/:verificationCode', {
            title: 'Reset password',
            templateUrl: 'reset/reset.html',
            controller: 'ResetController',
            controllerAs: 'vm'
        });
    }
})();
