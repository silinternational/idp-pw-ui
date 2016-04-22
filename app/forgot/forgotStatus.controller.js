(function () {
    'use strict';

    angular
        .module('password.forgot')
        .controller('ForgotStatusController', ForgotStatusController);

    function ForgotStatusController($mdDialog, $location) {
        var vm = this;

        vm.anotherSent = false;

        vm.cancel = cancel;
        vm.alternate = alternate;
        vm.resend = resend;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
        }

        function cancel() {
            $mdDialog.cancel();
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
