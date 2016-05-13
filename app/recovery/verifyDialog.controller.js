(function () {
    'use strict';

    angular
      .module('password.recovery')
      .controller('VerifyDialogController', VerifyDialogController);

    function VerifyDialogController($mdDialog, method, dataService) {
        var vm = this;

        vm.verificationForm = null;
        vm.verificationCode = null;
        vm.anotherSent = false;
        vm.message = null;

        vm.cancel = cancel;
        vm.resendCode = resendCode;
        vm.verify = verify;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
        }

        function cancel() {
            $mdDialog.cancel();
        }

        function resendCode() {
            vm.verificationCode = null;

            //TODO: need api call for resend here.
            vm.anotherSent = true;
        }

        function verify() {
            dataService
              .put('method/' + method.id, {
                  code: vm.verificationCode
              })
              .then(verified, invalid);
        }

        function verified() {
            $mdDialog.show({
                templateUrl: 'recovery/method-status-dialog.html',
                controller: 'MethodStatusDialogController',
                controllerAs: 'vm'
            });
        }

        function invalid(response) {
            //TODO: need error handling
            vm.verificationForm.verificationCode.$setValidity('incorrect', false);
            vm.message = response.data.message;
        }
    }
}());
