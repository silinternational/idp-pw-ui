(function () {
    'use strict';

    angular
      .module('password.forgot')
      .controller('ForgotStatusDialogFailedController',
                   ForgotStatusDialogFailedController);

    function ForgotStatusDialogFailedController($mdDialog, error) {
        var vm = this;

        vm.error = error;

        vm.ok = ok;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
        }

        function ok() {
            $mdDialog.hide();
        }
    }
})();
