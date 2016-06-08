(function () {
    'use strict';

    angular
      .module('password.forgot')
      .controller('ForgotController', ForgotController);

    function ForgotController(resolvedConfig, dataService,
                              dialogService) {
        var vm = this,
            recaptchaResponse = '';

        vm.username = '';
        vm.config = resolvedConfig;

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
              .reset(primaryEmail, response.data.uid);
        }

        function failed(response) {
            dialogService
              .fail('Attempt to reset password failed.', response.data);
        }
    }
})();
