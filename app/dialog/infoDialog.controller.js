(function () {
    'use strict';

    angular
      .module('password.dialog')
      .controller('InfoDialogController', InfoDialogController);

    function InfoDialogController(dialogService, message) {
        var vm = this;

        vm.message = message;

        vm.close = close;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
        }

        function close() {
            dialogService.close();
        }
    }
})();
