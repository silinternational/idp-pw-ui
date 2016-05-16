(function () {
    'use strict';

    angular
      .module('password.change')
      .controller('ChangeController', ChangeController);

    function ChangeController($mdDialog, $location, dataService,
                              resolvedUser, failedDialogService) {
        var vm = this;

        vm.pw = '';
        vm.pwConstraints = {};

        vm.change = change;
        vm.cancel = cancel;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
            if (resolvedUser.isAuthenticated) {
                dataService
                  .get('config')
                  .then(function (response) {
                      vm.pwConstraints = response.data.password;
                  });

            } else {
                $mdDialog.show({
                    templateUrl: 'change/not-authorized-dialog.html',
                    controller: 'NotAuthorizedDialogController',
                    controllerAs: 'vm'
                });
            }
        }

        function cancel() {
            if (vm.changeForm.$dirty) {
                $mdDialog.show({
                    templateUrl: 'change/discard-changes-dialog.html',
                    controller: 'DiscardChangesDialogController',
                    controllerAs: 'vm'
                });
            } else {
                $location.url('profile');
            }
        }

        function change() {
            if (vm.changeForm.$valid) {
                dataService
                  .put('password', {
                      password: vm.pw
                  })
                  .then(changed, failed);
            }
        }

        function changed() {
            $mdDialog.show({
                templateUrl: 'change/password-status-dialog-ok.html',
                controller: 'PasswordStatusDialogOkController',
                controllerAs: 'vm'
            });
        }

        function failed(response) {
            failedDialogService
              .open('Attempt to change password failed.', response.data);
        }
    }
})();
