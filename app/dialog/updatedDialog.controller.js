(function () {
    'use strict';

    angular
      .module('password.dialog')
      .controller('UpdatedDialogController', UpdatedDialogController);

    function UpdatedDialogController($location, message, dialogService) {
        var vm = this;

        vm.message = message;

        vm.ok = ok;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
        }

        function ok() {
            dialogService.close();

            $location.url('profile');
        }
    }
})();
