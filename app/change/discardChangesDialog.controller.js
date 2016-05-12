(function () {
    'use strict';

    angular
        .module('password.change')
        .controller('DiscardChangesDialogController',
                     DiscardChangesDialogController);

    function DiscardChangesDialogController($mdDialog, $location) {
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
