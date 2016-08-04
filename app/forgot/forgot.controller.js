(function () {
    'use strict';

    angular
      .module('password.forgot')
      .controller('ForgotController', ForgotController);

    function ForgotController(dataService, dialogService, config,
                              vcRecaptchaService) {
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

            if (response.data.methods &&
                response.data.methods.length > 0) {
                primaryEmail = response.data.methods[0].value;
            }
            
            dialogService.close();
            
            dialogService
              .reset(primaryEmail, resetId);
        }

        function failed(response) {
            dialogService
              .fail('Attempt to reset password failed.', response.data);

            vcRecaptchaService.reload();
        }
    }
})();
