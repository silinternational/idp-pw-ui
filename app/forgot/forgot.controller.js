(function () {
    'use strict';

    angular
      .module('password.forgot')
      .controller('ForgotController', ForgotController);

    function ForgotController($mdDialog, $location, $timeout,
                              resolvedConfig, dataService,
                              dialogService) {
        var vm = this,
            recaptchaResponse = '',
            inactivityTimer = null;

        vm.username = '';
        vm.config = resolvedConfig.data;

        vm.recaptchaAnswered = recaptchaAnswered;
        vm.submit = submit;
        vm.help = help;

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

        function help() {
            dialogService.help(vm.config.support);
        }

        function reset(response) {
            var primaryEmail = response.data.methods[0].value;
            
            dialogService
              .reset(primaryEmail, response.data.uid)
              .then(killInactivityTimer, reInitializePage);

            startInactivityTimer();
        }

        function failed(response) {
            dialogService
              .fail('Attempt to reset password failed.', response.data);
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
