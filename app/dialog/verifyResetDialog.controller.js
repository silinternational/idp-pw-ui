(function () {
    'use strict';

    angular
      .module('password.dialog')
      .controller('VerifyResetDialogController', VerifyResetDialogController);

    function VerifyResetDialogController(sentTo, verifyService, $location,
                                         $routeParams, dialogService) {
        var vm = this;

        vm.sentTo = sentTo;
        vm.verificationCode = null;

        vm.verify = verify;
        vm.cancel = cancel;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
        }

        function verify() {
            dialogService.close();

            verifyService
              .verifyReset($routeParams.resetId, vm.verificationCode)
              .then(valid, invalid)
              .finally(dialogService.close);

            dialogService.progress();
        }

        function valid() {
            $location.url('change');
        }

        function invalid(error) {
            dialogService.fail('Verification failed', error);
        }

        function cancel() {
            dialogService.close();
        }
    }
})();
