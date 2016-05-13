(function () {
    'use strict';

    angular
      .module('password.welcome')
      .controller('WelcomeController', WelcomeController);

    function WelcomeController($location, resolvedUser, userService) {
        var vm = this;

        vm.navigate = navigate;
        vm.login = login;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
            if (resolvedUser.isAuthenticated) {
                $location.url('profile');
            }
        }

        function navigate(url) {
            $location.url(url);
        }

        function login() {
            userService.login();
        }
    }
})();
