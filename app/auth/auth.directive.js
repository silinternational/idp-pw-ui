(function () {
    'use strict';

    angular
      .module('password.auth')
      .directive('pwAuth', pwAuth);

    function pwAuth() {
        return {
            restrict: 'E',
            scope: {},
            controller: AuthController,
            controllerAs: 'vm',
            bindToController: true,
            templateUrl: 'auth/auth.html'
        };
    }

    function AuthController(userService) {
        var vm = this;

        vm.user = userService.user;
        vm.login = login;
        vm.logout = logout;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
        }

        function login() {
            userService.login();
        }

        function logout() {
            userService.logout();
        }
    }
})();
