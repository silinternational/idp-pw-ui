(function () {
    'use strict';

    angular
        .module('password.forgot')
        .controller('ForgotController', ForgotController);
    
    function ForgotController($mdDialog, $location, $timeout,
                              resolvedConfig) {
        var vm = this,
            recaptchaResponse = '',
            inactivityTimer = null;

        vm.username = '';
        vm.recaptchaSiteKey = resolvedConfig.data.recaptchaKey;
        vm.idpName = '';
        vm.usernameHint = '';

        vm.recaptchaAnswered = recaptchaAnswered;
        vm.submit = submit;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
            // TODO: to be retrieved from config API
            vm.idpName = 'IdP'; 
            vm.usernameHint = 'IdP username, e.g., first_last';
        }

        function recaptchaAnswered(response) {
            recaptchaResponse = response;
        }

        function submit() {
            var email = '******@sil.org';

            $mdDialog.show({
                templateUrl: 'forgot/forgot-status.html',
                controller: 'ForgotStatusController',
                controllerAs: 'vm',
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
    }
})();
