(function () {
    'use strict';

    angular
      .module('password.recovery')
      .controller('VerifyEmailController', VerifyEmailController);

    function VerifyEmailController($routeParams, verifyService, dialogService, dataService,
                                    $location) {
        var vm = this;

        vm.verificationCode = null;
        vm.anotherSent = $routeParams.anotherSent;

        vm.verify = verify;
        vm.resend = resend;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
        }

        function verify() {
            verifyService
              .verifyMethod($routeParams.methodId, vm.verificationCode)
              .then(verified, invalid);

            dialogService.progress();
        }

        function verified() {
            dialogService.close();

            dialogService.update('Your code was accepted and your email can now be used to recover your password should you forget it.');
        }

        function invalid(error) {
            dialogService.fail('Incorrect verification code.', error);
        }

        function resend() {
            dataService
              .put('method/' + $routeParams.methodId + '/resend')
              .then(sent, failed);

            dialogService.progress();
        }

        function sent() {
            dialogService.close();

            $location.url($location.url() + '?anotherSent="true"');
        }

        function failed(response) {
            dialogService.fail('Unable to resend code.', response.data);
        }
    }
}());
