(function () {
    'use strict';

    angular
      .module('password.mfa')
      .controller('AppController', AppController);

    function AppController(dataService, dialogService) {
        var vm = this;

        vm.mfa = {};
        vm.tempPassword = '';
        vm.verify = verify;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
            createTotp();
        }

        function createTotp() {
            dataService
                .post('mfa', {
                    type: 'totp'
                })
                .then(created, failedCreation)
                .finally(dialogService.close);

            dialogService.progress();
        }

        function created(response) {
            vm.mfa = response.data;
        }

        function failedCreation(response) {
            dialogService
                .fail('Attempt to create application connection failed.', response.data);
        }

        function verify() {
            dataService
                .post('mfa/' + vm.mfa.id + '/verify', {
                    value: vm.tempPassword
                })
                .then(verified, failedVerification);

            dialogService.progress();
        }

        function verified() {
            dialogService
                .update('Congratulations, that is the correct code!  You have successfully set up your 2-step verification.');
        }

        function failedVerification(response) {
            dialogService
                .fail('That code was not correct, please try again.', response.data);
        }
    }
})();
