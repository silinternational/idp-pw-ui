(function () {
    'use strict';

    angular
      .module('password.recovery')
      .config(configureRecoveryRoutes);

    function configureRecoveryRoutes($routeProvider) {
        $routeProvider
          .when('/recovery-method/add', buildConfig('email'))
          .when('/recovery-method/add-phone', buildConfig('phone'))
          .when('/recovery-method/verify-phone/:methodId', {
              title: 'Verify phone',
              templateUrl: 'recovery/verify-phone.html',
              controller: 'VerifyPhoneController',
              controllerAs: 'vm',
              protected: true
          }).when('/recovery-method/verify-email/:methodId', {
              title: 'Verify email',
              templateUrl: 'recovery/verify-email.html',
              controller: 'VerifyEmailController',
              controllerAs: 'vm',
              protected: true
          });

        //////////////////////////////////////////////////////////////////

        function buildConfig(type) {
            return {
                title: 'Add password recovery method',
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
