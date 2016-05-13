(function () {
    'use strict';

    angular
      .module('password.recovery')
      .controller('DiscardMethodChangesDialogController',
                   DiscardMethodChangesDialogController);

    function DiscardMethodChangesDialogController($mdDialog, $location) {
        var vm = this;

        vm.yes = yes;
        vm.no = no;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
        }

        function yes() {
            $mdDialog.hide();

            $location.url('profile');
        }

        function no() {
            $mdDialog.hide();
        }
    }
})();
