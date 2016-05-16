(function () {
    'use strict';

    angular
      .module('password.change')
      .controller('PasswordStatusDialogFailedController',
                   PasswordStatusDialogFailedController);

    function PasswordStatusDialogFailedController($mdDialog, message) {
        var vm = this;

        vm.message = message;

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
