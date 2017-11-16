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
              title: 'Smartphone app setup',
              templateUrl: 'mfa/app.html',
              controller: 'AppController',
              controllerAs: 'vm',
              protected: true
          })
          .when('/mfa/backup-codes', {
              title: 'Printable codes',
              templateUrl: 'mfa/backup-codes.html',
              controller: 'BackupCodesController',
              controllerAs: 'vm',
              protected: true
          });
    }
})();
