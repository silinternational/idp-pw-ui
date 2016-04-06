(function () {
    'use strict';

    angular
        .module('password.forgot')
        .controller('ForgotController', ForgotController);

    function ForgotController($mdDialog, $location, $timeout,
                              recaptchaService) {
        var vm = this;
        var inactivityTimer = null;

        vm.username = '';
        vm.recaptchaSiteKey = recaptchaService.getSiteKey();
        vm.recaptchaAnswered = recaptchaService.setVerificationResponse;
        vm.anotherSent = false;
        vm.idpName = '';
        vm.usernameHint = '';

        vm.submit = submit;
        vm.cancel = cancel;
        vm.alternate = alternate;
        vm.resend = resend;

        activate();

        ///////////////////////////////////////////////////////////////////////

        function activate() {
            // TODO: to be retrieved from config API
            vm.idpName = 'IdP'; 
            vm.usernameHint = 'IdP username, e.g., first_last';
        }

        function submit() {
            console.info(recaptchaService.getVerificationResponse());

            var email = '******@sil.org';

            $mdDialog.show({
                templateUrl: '/forgot/forgot-status.html',
                controller: ForgotController,
                controllerAs: 'vm',
                bindToController: true,
                locals: {
                    sentTo: email
                }
            }).then(killInactivityTimer, resetPage);

            startInactivityTimer();
        }

        function startInactivityTimer() {

            inactivityTimer = $timeout(navigateToHome, 60000);
        }

        function navigateToHome() {
            $mdDialog.hide();

            $location.url('/');
        }

        function resetPage() {
            killInactivityTimer();

            vm.username = '';
        }

        function killInactivityTimer() {
            $timeout.cancel(inactivityTimer);
        }

        function alternate() {
            $mdDialog.hide();

            $location.url('recovery');
        }

        function resend() {
            vm.anotherSent = true;
        }

        function cancel() {
            $mdDialog.cancel();
        }
    }
})();
