(function () {
    'use strict';

    angular
      .module('password.recovery')
      .controller('VerifyMethodController', VerifyMethodController);

    function VerifyMethodController($routeParams, verifyService,
                                    dialogService, dataService,
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
        }

        function verified() {
            dialogService
              .update('Your code was accepted and your new recovery ' +
                      'method has been added.');
        }

        function invalid(error) {
            dialogService
              .fail('Incorrect verification code.', error);
        }

        function resend() {
            dataService
              .put('method/' + $routeParams.methodId + '/resend')
              .then(sent, failed)
              .finally(dialogService.close);

            dialogService.progress();
        }

        function sent() {
            $location.url($location.url() + '?anotherSent="true"');
        }

        function failed(response) {
            dialogService
              .fail('Unable to resend code.', response.data);
        }
    }
}());
