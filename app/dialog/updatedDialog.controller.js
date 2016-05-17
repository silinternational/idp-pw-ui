(function () {
    'use strict';

    angular
      .module('password.dialog')
      .controller('UpdatedDialogController',
                   UpdatedDialogController);

    function UpdatedDialogController($mdDialog, $location, message) {
        var vm = this;

        vm.message = message;

        vm.ok = ok;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
        }

        function ok() {
            $mdDialog.hide();

            $location.url('profile');
        }
    }
})();
