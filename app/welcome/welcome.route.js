(function () {
    'use strict';

    angular
      .module('password.welcome')
      .config(configureWelcomeRoutes);

    function configureWelcomeRoutes($routeProvider) {
        $routeProvider.when('/welcome', {
            title: 'Welcome',
            templateUrl: 'welcome/welcome.html',
            controller: 'WelcomeController',
            controllerAs: 'vm'
        });
    }
})();
