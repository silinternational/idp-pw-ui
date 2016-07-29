(function () {
    'use strict';

    angular
      .module('password.dialog')
      .controller('NoMethodsDialogController',
                   NoMethodsDialogController);

    function NoMethodsDialogController(dialogService, $location) {
        var vm = this;

        vm.close = close;
        vm.add = add;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
        }

        function close() {
            dialogService.close();
        }

        function add() {
            dialogService.close();

            $location.url('recovery-method/add');
        }
    }
})();
