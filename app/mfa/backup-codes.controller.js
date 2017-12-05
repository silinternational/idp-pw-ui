(function () {
    'use strict';

    angular
      .module('password.mfa')
      .controller('BackupCodesController', BackupCodesController);

    function BackupCodesController(dataService, $routeParams, backupCodeService) {
        var vm = this;

        vm.codes = backupCodeService.codes;
        vm.hadPreviousCodes = $routeParams.recreate;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
        }
    }
})();
