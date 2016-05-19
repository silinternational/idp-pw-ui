(function () {
    'use strict';

    angular
      .module('password.profile')
      .controller('ProfileController', ProfileController);

    function ProfileController(userService, $location, dataService,
                               $route) {
        var vm = this;

        vm.user = userService.user;
        vm.methods = [];
        vm.config = {};

        vm.navigate = navigate;
        vm.delete = remove;


        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
            dataService
              .get('config')
              .then(function getMethods(response) {
                  vm.config = response.data;
              });

            dataService
              .get('method')
              .then(function getMethods(response) {
                  vm.methods = response.data;
              });
        }

        function navigate(url) {
            $location.url(url);
        }

        function remove(method) {
            dataService
              .delete('method/' + method.id)
              .then(function () {
                  $route.reload();
              });
        }
    }
})();
