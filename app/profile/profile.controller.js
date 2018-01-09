(function () {
    'use strict';
    //TODO: add a timer to this page, 3 mins maybe (check GA for resting duration), that will automatically log the user out.
    angular
      .module('password.profile')
      .controller('ProfileController', ProfileController);

    function ProfileController(config, userService, dataService, dialogService, $route, $location,
                               backupCodeService) {
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
        vm.createCodes = createCodes;
        vm.recreateCodes = recreateCodes;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
            userService
              .getUser()
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
                .then(yesRemove(resource));
        }

        function yesRemove(resource) {
            return function deleteIt() {
                dataService
                    .delete(resource)
                    .then(deleted, failed('Unable to remove that for you.'));

                dialogService.progress();
            };
        }

        function deleted() {
            dialogService.close();

            $route.reload();
        }

        function createCodes() {
            if (hasNoMfaYet()) {
                dialogService
                    .areYouSure('Thank you for choosing to use 2-Step Verification. This will help keep all our data more secure. If you proceed, you will be given 10 one-time use codes. We will occasionally ask you for one when you log in.  Do you still want to proceed?', 'md-primary')
                    .then(yesContinue);
            } else {
                createBackupCodes('mfa/backup-codes');
            }
        }

        function hasNoMfaYet() {
            for (var type in vm.mfa) {
                if (vm.mfa[type].length > 0) {
                    return false;
                }
            }

            return true;
        }

        function yesContinue() {
            createBackupCodes('mfa/backup-codes');
        }

        function createBackupCodes(urlToNextPage) {
            dataService
                .post('mfa', {
                    type: 'backupcode'
                })
                .then(created(urlToNextPage), failed('Attempt to create printable codes failed.'));

            dialogService.progress();
        }

        function created(urlToNextPage) {
            return function create(response) {
                dialogService.close();

                backupCodeService.codes = response.data.data;

                $location.url(urlToNextPage);
            };
        }

        function failed(message) {
            return function showFailedDialog(response) {
                dialogService.fail(message, response.data);
            };
        }

        function recreateCodes() {
            createBackupCodes('mfa/backup-codes/recreated');
        }
    }
})();
