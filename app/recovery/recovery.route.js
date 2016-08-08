(function () {
    'use strict';

    angular
      .module('password.recovery')
      .config(configureRecoveryRoutes);

    function configureRecoveryRoutes($routeProvider) {
        $routeProvider
          .when('/recovery-method/add', buildConfig('email'))
          .when('/recovery-method/add-phone', buildConfig('phone'))
          .when('/recovery-method/verify/:methodId', {
              title: 'Verify code',
              templateUrl: 'recovery/verify-method.html',
              controller: 'VerifyMethodController',
              controllerAs: 'vm',
              protected: true
          });

        //////////////////////////////////////////////////////////////////

        function buildConfig(type) {
            return {
                title: 'Add recovery method',
                templateUrl: 'recovery/add-method.html',
                controller: 'AddMethodController',
                controllerAs: 'vm',
                protected: true,
                resolve: {
                    type: function () {
                        return type;
                    }
                }
            };
        }
    }
})();
