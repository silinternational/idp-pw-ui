(function () {
    'use strict';

    angular
      .module('password.dialog')
      .controller('VerifyResetDialogController', VerifyResetDialogController);

    function VerifyResetDialogController(sentTo, $mdDialog, verifyService,
                                         $routeParams, dialogService,
                                         $location) {
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
            $mdDialog.hide();

            verifyService
              .verifyReset($routeParams.resetId, vm.verificationCode)
              .then(valid, invalid)
              .finally($mdDialog.hide);

            dialogService.progress();
        }

        function valid() {
            $location.url('change');
        }

        function invalid(error) {
            dialogService.fail('Verification failed', error);
        }

        function cancel() {
            $mdDialog.hide();
        }
    }
})();
