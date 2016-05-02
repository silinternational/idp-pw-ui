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

        vm.navigate = navigate;
        vm.delete = remove;


        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
            vm.user.pwchanged = new Date(); //TODO: need the data for this one.
            
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
