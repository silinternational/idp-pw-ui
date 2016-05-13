(function() {
    'use strict';

    angular
        .module('password.welcome')
        .config(configureWelcomeRoutes);

    function configureWelcomeRoutes($routeProvider) {
        $routeProvider.when('/welcome', {
            title: 'Welcome',
            templateUrl: 'welcome/welcome.html',
            controller: 'WelcomeController',
            controllerAs: 'vm',
            resolve: {
                'resolvedUser': getUser
            }
        });

        function getUser(userService) {
            return userService.getUser();
        }
    }
})();
