(function () {
    'use strict';
    //TODO: add a timer to this page, 3 mins maybe (check GA for resting duration), that will automatically log the user out.
    angular
      .module('password.profile')
      .controller('ProfileController', ProfileController);

    function ProfileController(config, userService, dataService, dialogService, $route) {
        var vm = this;

        vm.user = null;
        vm.config = config;
        vm.mfa = {
            'u2f': [],
            'totp':[],
            'backupcode': []
        };
        vm.method = {
            'emails': [],
            'phones': []
        };

        vm.remove = remove;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
            userService
              .getUser(/*true*/)
              .then(function (user) {
                  vm.user = user;
              });

            dataService
              .get('mfa')
              .then(extractMfas)
              .finally(dialogService.close);

            dataService
              .get('method')
              .then(extractMethods)
              .finally(dialogService.close);

            dialogService.progress();
        }

        function extractMfas(response) {
            var allMfas = response.data;

            allMfas
              .forEach(function (mfa) {
                  switch (mfa.type) {
                      case 'u2f'       : vm.mfa.u2f.push(mfa)       ; break;
                      case 'totp'      : vm.mfa.totp.push(mfa)      ; break;
                      case 'backupcode': vm.mfa.backupcode.push(mfa);
                  }
              });
        }

        function extractMethods(response) {
            var allMethods = response.data;

            checkForMethods(allMethods);

            allMethods
              .forEach(function (method) {
                  switch (method.type) {
                      case 'email': vm.method.emails.push(method); break;
                      case 'phone': vm.method.phones.push(method);
                  }
              });
        }

        function checkForMethods(methods) {
            if (methods.filter(excludePrimary).length === 0) {
                dialogService.noMethods();
            }
        }

        function excludePrimary(method) {
            return method.type !== 'primary';
        }

        function remove(resource) {
            dialogService
                .areYouSure('Would you like to remove this?')
                .then(yes(resource));
        }

        function yes(resource) {
            return function deleteIt() {
                dataService
                    .delete(resource)
                    .then(deleted, failed);

                dialogService.progress();
            };
        }

        function deleted() {
            dialogService.close();

            $route.reload();
        }

        function failed(response) {
            dialogService
              .fail('Unable to remove that for you.', response.data);
        }
    }
})();
