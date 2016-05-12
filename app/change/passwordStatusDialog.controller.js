(function () {
    'use strict';

    angular
        .module('password.change')
        .controller('PasswordStatusDialogController', 
                     PasswordStatusDialogController);

    function PasswordStatusDialogController($mdDialog, $location) {
        var vm = this;
        
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
