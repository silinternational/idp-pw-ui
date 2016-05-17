(function () {
    'use strict';

    angular
      .module('password.dialog')
      .controller('NotAuthorizedDialogController',
                   NotAuthorizedDialogController);

    function NotAuthorizedDialogController($mdDialog, $location) {
        var vm = this;

        vm.ok = ok;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
        }

        function ok() {
            $mdDialog.hide();

            $location.url('welcome');
        }
    }
})();
