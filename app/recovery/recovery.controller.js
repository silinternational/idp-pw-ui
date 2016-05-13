(function () {
    'use strict';

    angular
      .module('password.recovery')
      .controller('RecoveryController', RecoveryController);

    function RecoveryController($location, $mdDialog, dataService) {
        var vm = this;

        vm.methods = [];

        vm.verify = verify;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
            //TODO: need to get the methods from the pending reset,
            // not the verified methods.
            dataService
              .get('method')
              .then(function getMethods(response) {
                  vm.methods = response.data;
              });
        }

        function verify(method) {
            showCodeVerificationDialog(method);
        }

        function showCodeVerificationDialog(method) {
            $mdDialog.show({
                templateUrl: 'recovery/verify-dialog.html',
                controller: 'VerifyDialogController',
                controllerAs: 'vm',
                locals: {
                    method: method
                }
            });
        }
    }
}());
