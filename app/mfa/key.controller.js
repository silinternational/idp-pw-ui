(function () {
    'use strict';

    angular
      .module('password.mfa')
      .controller('KeyController', KeyController);

    function KeyController(dataService, dialogService, u2fService) {
        var vm = this;

        vm.mfa = null;
        vm.u2fIsSupported = u2fService.available;

        vm.createU2fConfig = createU2fConfig;
        vm.register = register;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
        }

        function createU2fConfig() {
            dataService
                .post('mfa', {
                    type: 'u2f'
                })
                .then(created, failed('Attempt to set up key failed.'));

            dialogService.progress();
        }

        function created(response) {
            vm.mfa = response.data;

            dialogService.close();
        }

        function register() {
            u2fService
                .register(vm.mfa.data.challenge)
                .then(verify, failed('Attempt to connect key failed.'));

            dialogService.infoWithNoButton('Your key is ready and should be blinking. Go ahead and press it.');
        }

        function verify(response) {
            dataService
                .post('mfa/' + vm.mfa.id + '/verify', {
                    value: response
                })
                .then(verified, failed('Attempt to connect key failed.'));

            dialogService.progress();
        }

        function verified() {
            dialogService.close();

            dialogService.update('Congratulations, your key is now connected to your account.  You may either leave your security key plugged in or not, it is up to you.');
        }

        function failed(message) {
            return function(response) {
                dialogService.fail(message, response.data);
            };
        }
    }
})();
