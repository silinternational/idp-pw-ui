(function () {
    'use strict';

    angular
      .module('password.recovery')
      .config(configureRecoveryRoutes);

    function configureRecoveryRoutes($routeProvider) {
        $routeProvider
          .when('/recovery-method/add', {
              title: 'Add recovery method',
              templateUrl: 'recovery/add-method.html',
              controller: 'AddMethodController',
              controllerAs: 'vm',
              protected: true
          })
          .when('/recovery-method/verify/:methodId', {
              title: 'Verify code',
              templateUrl: 'recovery/verify-method.html',
              controller: 'VerifyMethodController',
              controllerAs: 'vm',
              protected: true
          });
    }
})();
