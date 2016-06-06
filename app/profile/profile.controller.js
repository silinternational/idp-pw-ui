(function () {
    'use strict';

    angular
      .module('password.profile')
      .controller('ProfileController', ProfileController);

    function ProfileController(userService, $location, dataService,
                               $route, dialogService) {
        var vm = this;

        vm.user = userService.user;
        vm.method = {
            'emails': [],
            'phones': []
        };
        vm.config = {};

        vm.navigate = navigate;
        vm.delete = remove;


        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
            dataService
              .get('config')
              .then(function extractConfig(response) {
                  vm.config = response.data;
              });

            dataService
              .get('method')
              .then(extractMethods);
        }

        function extractMethods(response) {
            var allMethods = response.data;

            allMethods
              .forEach(function (method) {
                  switch (method.type) {
                      case 'email': vm.method.emails.push(method); break;
                      case 'phone': vm.method.phones.push(method);
                  }
              });

        }

        function navigate(url) {
            $location.url(url);
        }

        function remove(method) {
            dialogService
              .areYouSure('Would you like to remove this recovery ' +
                          'method permanently?')
              .then(function yes() {
                  dataService
                    .delete('method/' + method.id)
                    .then(deleted, failed);
              });
        }

        function deleted() {
            $route.reload();
        }

        function failed(response) {
            dialogService
              .fail('Unable to remove recovery method.', response.data);
        }
    }
})();
