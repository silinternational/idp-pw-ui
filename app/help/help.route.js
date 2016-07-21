(function () {
    'use strict';

    angular
      .module('password.welcome')
      .config(configureHelpRoutes);

    function configureHelpRoutes($routeProvider) {
        $routeProvider
          .when('/help', {
              title: 'Help center',
              templateUrl: 'help/help.html',
              controller: 'HelpController',
              controllerAs: 'vm'
          });
    }
})();
