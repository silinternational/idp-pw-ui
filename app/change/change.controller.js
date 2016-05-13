(function () {
    'use strict';

    angular
      .module('password.change')
      .controller('ChangeController', ChangeController);

    function ChangeController($mdDialog, $location, dataService,
                              resolvedUser) {
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
//TODO: ensure the form is valid first? if (!vm.changeForm.$invalid)
            dataService
              .put('password', {
                  password: vm.pw
              })
              .then(changed, failed);
        }

        function changed() {
            $mdDialog.show({
                templateUrl: 'change/password-status-dialog.html',
                controller: 'PasswordStatusDialogController',
                controllerAs: 'vm'
            });
        }

        function failed(response) {
            //TODO: need error handling for bad PUT            
            console.error(response);
        }
    }
})();
