(function () {
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
            protected: true
        });
    }
})();
