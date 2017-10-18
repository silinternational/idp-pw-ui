(function () {
    'use strict';

    angular
      .module('password.mfa')
      .config(configureMfaRoutes);

    function configureMfaRoutes($routeProvider) {
        $routeProvider
          .when('/mfa/key', {
              title: 'Security key setup',
              templateUrl: 'mfa/key.html',
              controller: 'KeyController',
              controllerAs: 'vm',
              protected: true
          })
          .when('/mfa/app', {
              title: 'Mobile application setup',
              templateUrl: 'mfa/app.html',
              controller: 'AppController',
              controllerAs: 'vm',
              protected: true
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
