(function () {
    'use strict';

    angular
      .module('password.dialog')
      .controller('NoMethodsDialogController',
                   NoMethodsDialogController);

    function NoMethodsDialogController($mdDialog, $location) {
        var vm = this;

        vm.close = close;
        vm.add = add;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
        }

        function close() {
            $mdDialog.hide();
        }

        function add() {
            close();

            $location.url('recovery-method/add');
        }
    }
})();
