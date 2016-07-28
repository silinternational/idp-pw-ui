(function () {
    'use strict';

    angular
      .module('password.welcome')
      .controller('WelcomeController', WelcomeController);

    function WelcomeController($location, userService) {
        var vm = this;

        vm.navigate = navigate;
        vm.login = login;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
            userService
              .getUser()
              .then(function (user) {
                  if (user.isAuthenticated) {
                      $location.url('profile');
                  }
              });
        }

        function login() {
            userService.login('/change');
        }
    }
})();
