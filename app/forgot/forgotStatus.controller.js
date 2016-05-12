(function () {
    'use strict';

    angular
        .module('password.forgot')
        .controller('ForgotStatusController', ForgotStatusController);

    function ForgotStatusController($mdDialog, $location, sentTo) {
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
            vm.anotherSent = true;
        }
    }
})();
