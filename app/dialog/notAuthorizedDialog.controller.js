(function () {
    'use strict';

    angular
      .module('password.dialog')
      .controller('NotAuthorizedDialogController',
                   NotAuthorizedDialogController);

    function NotAuthorizedDialogController(userService, $location) {
        var vm = this;

        vm.login = login;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
        }

        function login() {
            userService.login($location.url());
        }
    }
})();
