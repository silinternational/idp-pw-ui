(function () {
    'use strict';

    angular
      .module('password.mfa')
      .controller('AppController', AppController);

    function AppController(dataService, dialogService, config) {
        var vm = this;

        vm.mfa = {};
        vm.tempPassword = '';
        vm.showQrCode = true;

        vm.verify = verify;
        vm.toggleQrCode = toggleQrCode;

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
                .then(created, failedCreation);

            dialogService.progress();
        }

        function created(response) {
            vm.mfa = response.data;

            dialogService.close();
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
                .update('Congratulations, that is the correct code! The next time you log in to your ' +  config.idpName + ' account you will be prompted for 2-Step Verification.');
        }

        function failedVerification(response) {
            dialogService
                .fail('That code was not correct, please try again.', response.data);
        }

        function toggleQrCode() {
            vm.showQrCode = ! vm.showQrCode;
        }
    }
})();
