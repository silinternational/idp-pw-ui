(function () {
    'use strict';

    angular
      .module('password.profile')
      .controller('ProfileController', ProfileController);

    function ProfileController(configService, $location, dataService, 
                               $route, dialogService, resolvedUser) {
        var vm = this;

        vm.user = resolvedUser;
        vm.method = {
            'emails': [],
            'phones': []
        };
        vm.config = configService.config;

        vm.navigate = navigate;
        vm.delete = remove;


        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
            if (resolvedUser.isAuthenticated) {
                dataService
                  .get('method')
                  .then(extractMethods);
            } else {
                dialogService.notAuthorized();
            }

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
