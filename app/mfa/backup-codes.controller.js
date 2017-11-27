(function () {
    'use strict';

    angular
      .module('password.mfa')
      .controller('BackupCodesController', BackupCodesController);

    function BackupCodesController(dataService, dialogService) {
        var vm = this;

        vm.mfa = null;

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
                .then(created, failed);

            dialogService.progress();
        }

        function created(response) {
            vm.mfa = response.data;

            dialogService.close();
        }

        function failed(response) {
            dialogService
                .fail('Attempt to create backup codes failed.', response.data);
        }
    }
})();