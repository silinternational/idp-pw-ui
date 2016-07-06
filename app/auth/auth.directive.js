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

        vm.isAuthenticated = false;
        vm.login = login;
        vm.logout = logout;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
            userService
              .getUser()
              .then(function (user) {
                  vm.isAuthenticated = user.isAuthenticated;
              });
        }

        function login() {
            userService.login('/profile');
        }

        function logout() {
            userService.logout();
        }
    }
})();
