(function () {
    'use strict';

    angular
      .module('password.profile')
      .config(configureProfileRoutes);

    function configureProfileRoutes($routeProvider) {
        $routeProvider.when('/profile', {
            title: 'Profile',
            templateUrl: 'profile/profile.html',
            controller: 'ProfileController',
            controllerAs: 'vm',
            protected: true
        });
    }
})();
