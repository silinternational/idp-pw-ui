(function () {
    'use strict';

    angular
      .module('password.dialog')
      .controller('ResetDialogController', ResetDialogController);

    function ResetDialogController($mdDialog, $location, sentTo, resetId,
                                   dataService) {
        var vm = this;

        vm.anotherSent = false;
        vm.sentTo = sentTo;

        vm.cancel = cancel;
        vm.alternate = alternate;
        vm.resend = resend;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
        }

        function cancel() {
            $mdDialog.cancel();

            $location.url('/');
        }

        function alternate() {
            $mdDialog.hide();

            $location.url('recovery');
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

        function failed () {
            //TODO: need error handling
        }
    }
})();
