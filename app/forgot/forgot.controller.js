(function () {
    'use strict';

    angular
      .module('password.forgot')
      .controller('ForgotController', ForgotController);

    function ForgotController(dataService, dialogService, config, vcRecaptchaService, $route) {
        var vm = this,
            recaptchaResponse = '';

        vm.username = '';
        vm.config = config;

        vm.recaptchaAnswered = recaptchaAnswered;
        vm.resetRecaptcha = resetRecaptcha;
        vm.submit = submit;
        vm.help = help;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
        }

        function recaptchaAnswered(response) {
            recaptchaResponse = response;
        }

        function resetRecaptcha() {
            recaptchaResponse = '';
            vcRecaptchaService.reload();
        }

        function submit() {
            dataService
              .post('reset', {
                  username: vm.username,
                  verification_token: recaptchaResponse
              })
              .then(reset, failed);

            dialogService.progress();
        }

        function help() {
            dialogService.help(vm.config.support);
        }

        function reset(response) {
            var primaryEmail,
                resetId = response.data.uid;

            if (response.data.methods && response.data.methods.length > 0) {
                primaryEmail = response.data.methods[0].value;

                return dialogService.reset(primaryEmail, resetId);
            }

            var message = 'An account was not found for the username or email address you provided. Please try again with a different work email address or just your username. If you continue to have problems please contact support at ' + vm.config.support.email;
            if (typeof vm.config.support.phone === 'undefined') {
              message += '.';
            } else {
              message += ' or ' + phone + '.';
            }

            dialogService
                .info(message, 'Account not found')
                .then(function () {
                    $route.reload();
                });
        }

        function failed(response) {
            dialogService
              .fail('Attempt to reset password failed.', response.data)
              .then(function () {
                $route.reload();
              });
        }
    }
})();
