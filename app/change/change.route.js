(function() {
    'use strict';

    angular
        .module('password.change')
        .config(configureChangeRoutes);

    function configureChangeRoutes($routeProvider) {
        $routeProvider.when('/change', {
            title: 'Change password',
            templateUrl: 'change/change.html',
            controller: 'ChangeController',
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
