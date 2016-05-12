(function () {
    'use strict';

    angular
        .module('password.forgot')
        .controller('ForgotStatusController', ForgotStatusController);

    function ForgotStatusController($mdDialog, $location, sentTo,
                                    resetId, dataService) {
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
              .then(handleSuccessfulResend);
//TODO: need error handling for bad PUT
        }

        function handleSuccessfulResend() {
            vm.anotherSent = true;
        }
    }
})();
