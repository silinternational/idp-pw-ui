(function () {
    'use strict';

    angular
        .module('password.forgot')
        .controller('ForgotController', ForgotController);
    
    function ForgotController($mdDialog, $location, $timeout,
                              resolvedConfig, dataService) {
        var vm = this,
            recaptchaResponse = '',
            inactivityTimer = null;

        vm.username = '';
        vm.recaptchaSiteKey = resolvedConfig.data.recaptchaKey;
        vm.idpName = resolvedConfig.data.idpName;
        vm.usernameHint = resolvedConfig.data.idpUsernameHint;

        vm.recaptchaAnswered = recaptchaAnswered;
        vm.submit = submit;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
//TODO: if the user is logged in send them to change
        }

        function recaptchaAnswered(response) {
            recaptchaResponse = response;
        }

        function submit() {
            dataService
              .post('reset', {
                  username: vm.username,
                  verification_token: recaptchaResponse
              })
              .then(handleSuccessfulReset);
//TODO: need error handling for bad POST
        }

        function handleSuccessfulReset(response) {
            var primaryEmail = response.data.methods[0].value;

            $mdDialog
              .show({
                templateUrl: 'forgot/forgot-status.html',
                controller: 'ForgotStatusController',
                controllerAs: 'vm',
                locals: {
                    sentTo: primaryEmail,
                    resetId: response.data.uid
                }
              })
              .then(killInactivityTimer, resetPage);

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
