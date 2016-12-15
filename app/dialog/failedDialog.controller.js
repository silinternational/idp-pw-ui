(function () {
    'use strict';

    angular
      .module('password.dialog')
      .controller('FailedDialogController',
                   FailedDialogController);

    function FailedDialogController(dialogService, summary, error, $location) {
        var vm = this;

        vm.summary = summary;
        vm.error = error;

        vm.ok = ok;
        vm.help = help;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
        }

        function help() {
            dialogService.close();
            
            $location.url('help');
        }

        function ok() {
            dialogService.close();
        }
    }
})();
