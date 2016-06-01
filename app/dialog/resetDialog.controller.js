(function () {
    'use strict';

    angular
      .module('password.dialog')
      .controller('ResetDialogController', ResetDialogController);

    function ResetDialogController($mdDialog, $location, sentTo, resetId,
                                   dataService, dialogService) {
        var vm = this;

        vm.anotherSent = false;
        vm.sentTo = sentTo;

        vm.cancel = cancel;
        vm.alternates = alternates;
        vm.resend = resend;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
        }

        function cancel() {
            $mdDialog.cancel();

            $location.url('/');
        }

        function alternates() {
            $mdDialog.hide();

            $location.url('reset/' + resetId + '/verify/alternates');
        }

        function resend() {
            dataService
              .put('reset/' + resetId + '/resend')
              .then(sent, failed);
        }

        function sent() {
            //TODO: make sure dialog stays open
            vm.anotherSent = true;
        }

        function failed (response) {
            dialogService
              .fail('Unable to resend verification.', response.data);
        }
    }
})();
