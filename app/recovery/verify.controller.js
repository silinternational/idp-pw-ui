(function () {
    'use strict';

    angular
      .module('password.recovery')
      .controller('VerifyController', VerifyController);

    function VerifyController($location, $mdDialog, method, dataService) {
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
            vm.anotherSent = true;
        }

        function verify() {
            dataService
              .put('method/' + method.id, {
                  code: vm.verificationCode
              })
              .then(verificationSucceeded, verificationFailed);
        }

        function verificationSucceeded() {
            // TODO: may need to move content into template for i18n
            // purposes.
            $mdDialog.show(
              $mdDialog.alert()
                .title('Update successful')
                .textContent('New recovery method added.')
                .ok('Ok')
            ).then(function handleUserResponse() {
                $location.url('profile');
            });
        }

        function verificationFailed(response) {
            vm.verificationForm.verificationCode.$setValidity('incorrect', false);
            vm.message = response.data.message;
        }
    }
}());
