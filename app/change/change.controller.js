(function () {
    'use strict';

    angular
      .module('password.change')
      .controller('ChangeController', ChangeController);

    function ChangeController($mdDialog, $location, $timeout, dataService) {
        var vm = this;

        vm.pw = '';
        vm.pwagain = '';
        vm.strength = {};
        vm.pwConstraints = {};

        vm.change = change;
        vm.cancel = cancel;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
            checkForIncomingToken();

            dataService.get('config')
              .then(function (response) {
                  vm.pwConstraints = response.data.password;
              });
        }

        function checkForIncomingToken() {
            var queryString = $location.search();

            if (angular.isString(queryString.id) &&
              angular.isString(queryString.token)) {

                $mdDialog.show({
                    templateUrl: 'change/verification-status.html',
                    escapeToClose: false
                });

                $timeout(function () {
                    $mdDialog.hide();
                }, 2000);
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
              .then(handleSuccessfulPasswordChange);
//TODO: need error handling for bad PUT            
        }
        
        function handleSuccessfulPasswordChange() {
            $mdDialog.show({
                templateUrl: 'change/password-status-dialog.html',
                controller: 'PasswordStatusDialogController',
                controllerAs: 'vm'
            });
        }
    }
})();
