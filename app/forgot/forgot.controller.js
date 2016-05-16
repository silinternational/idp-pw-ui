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
              .then(reset, failed);
        }

        function reset(response) {
            var primaryEmail = response.data.methods[0].value;

            $mdDialog
              .show({
                  templateUrl: 'forgot/forgot-status-dialog-ok.html',
                  controller: 'ForgotStatusDialogOkController',
                  controllerAs: 'vm',
                  locals: {
                      sentTo: primaryEmail,
                      resetId: response.data.uid
                  }
              })
              .then(killInactivityTimer, reInitializePage);

            startInactivityTimer();
        }

        function failed (response) {
            $mdDialog.show({
                templateUrl: 'forgot/forgot-status-dialog-failed.html',
                controller: 'ForgotStatusDialogFailedController',
                controllerAs: 'vm',
                locals: {
                    error: response.data
                }
            });
        }
        
        function startInactivityTimer() {
            inactivityTimer = $timeout(navigateToHome, 60000);
        }

        function navigateToHome() {
            $mdDialog.hide();

            $location.url('/');
        }

        function reInitializePage() {
            killInactivityTimer();

            vm.username = '';
        }

        function killInactivityTimer() {
            $timeout.cancel(inactivityTimer);
        }
    }
})();
