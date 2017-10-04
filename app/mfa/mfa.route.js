(function () {
    'use strict';

    angular
      .module('password.mfa')
      .config(configureMfaRoutes);

    function configureMfaRoutes($routeProvider) {
        $routeProvider
          .when('/mfa/key', {
              title: 'Security key',
              templateUrl: 'mfa/key.html',
              controller: 'KeyController',
              controllerAs: 'vm'
          })
          .when('/mfa/app', {
              title: 'Mobile application',
              templateUrl: 'mfa/app.html',
              controller: 'AppController',
              controllerAs: 'vm'
          })
          .when('/mfa/codes', {
              title: 'Backup codes',
              templateUrl: 'mfa/codes.html',
              controller: 'CodesController',
              controllerAs: 'vm',
              protected: true
          });
    }
})();
