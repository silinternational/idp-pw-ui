(function () {
    'use strict';

    angular
      .module('password.profile')
      .controller('ProfileController', ProfileController);

    function ProfileController(userService, dataService, $route,
                               dialogService, config) {
        var vm = this;

        vm.user = null;
        vm.method = {
            'emails': [],
            'phones': []
        };
        vm.config = config;

        vm.delete = remove;
        
        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
            userService
              .getUser(true)
              .then(function (user) {
                  vm.user = user;
              });

            dataService
              .get('method')
              .then(extractMethods)
              .finally(dialogService.close());

            // dialogService.progress();
        }

        function extractMethods(response) {

            dialogService.progress();

            var allMethods = response.data;

            dialogService.close();

            checkForMethods(allMethods);

            allMethods
              .forEach(function (method) {
                  switch (method.type) {
                      case 'email': vm.method.emails.push(method); break;
                      case 'phone': vm.method.phones.push(method);
                  }
              });

            dialogService.close();
        }

        function checkForMethods(methods) {
            if (methods.filter(excludePrimary).length === 0) {
                dialogService.noMethods();
            }
        }

        function excludePrimary(method) {
            return method.type !== 'primary';
        }

        function remove(method) {
            dialogService
              .areYouSure('Would you like to remove this recovery ' +
                          'method permanently?')
              .then(yes);

            //////////////////////////////////////////////////////////////
            
            function yes() {
                dataService
                  .delete('method/' + method.id)
                  .then(deleted, failed)
                  .finally(dialogService.close);

                dialogService.progress();
            }
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
