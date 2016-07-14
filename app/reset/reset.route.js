(function () {
    'use strict';

    angular
      .module('password.reset')
      .config(configureResetRoutes);

    function configureResetRoutes($routeProvider) {
        $routeProvider
          .when('/reset/:resetId/verify/alternates', {
              title: 'Alternate verification',
              templateUrl: 'reset/alternates.html',
              controller: 'AlternatesController',
              controllerAs: 'vm'
          })
          .when('/reset/:resetId/verify/:verificationCode', {
              title: 'Verify reset code',
              templateUrl: 'reset/verify-reset.html',
              controller: 'VerifyResetController',
              controllerAs: 'vm'
          });
    }
})();
