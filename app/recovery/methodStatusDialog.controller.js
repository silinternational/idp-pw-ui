(function () {
    'use strict';

    angular
      .module('password.recovery')
      .controller('MethodStatusDialogController',
                   MethodStatusDialogController);

    function MethodStatusDialogController($mdDialog, $location) {
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
