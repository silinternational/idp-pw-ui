(function () {
    'use strict';

    angular
      .module('password.mfa')
      .controller('CodesController', CodesController);

    function CodesController(dataService, dialogService) {
        var vm = this;

        vm.mfa = {};

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
            createCodes();
        }

        function createCodes() {
            dataService
                .post('mfa', {
                    type: 'backupcode'
                })
                .then(created, failed)
                .finally(dialogService.close); //TODO: dialog shouldn't automatically close on failure.

            dialogService.progress();
        }

        function created(response) {
            vm.mfa = response.data;
        }

        function failed(response) {
            dialogService
                .fail('Attempt to create backup codes failed.', response.data);
        }
    }
})();
