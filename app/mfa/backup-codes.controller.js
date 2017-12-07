(function () {
    'use strict';

    angular
      .module('password.mfa')
      .controller('BackupCodesController', BackupCodesController);

    function BackupCodesController(dataService, $routeParams, backupCodeService, config) {
        var vm = this;

        vm.codes = backupCodeService.codes;
        vm.hadPreviousCodes = $routeParams.recreate;
        vm.config = config;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
        }
    }
})();
