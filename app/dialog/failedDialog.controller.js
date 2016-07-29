(function () {
    'use strict';

    angular
      .module('password.dialog')
      .controller('FailedDialogController',
                   FailedDialogController);

    function FailedDialogController(dialogService, summary, error) {
        var vm = this;

        vm.summary = summary;
        vm.error = error;

        vm.ok = ok;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
        }

        function ok() {
            dialogService.close();
        }
    }
})();
