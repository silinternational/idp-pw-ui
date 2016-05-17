(function () {
    'use strict';

    angular
      .module('password.dialog')
      .controller('PasswordAdviceDialogController',
                   PasswordAdviceDialogController);

    function PasswordAdviceDialogController($mdDialog, warning,
                                            suggestions) {
        var vm = this;

        vm.warning = warning;
        vm.suggestions = suggestions;

        vm.hideAdvice = hideAdvice;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
        }

        function hideAdvice() {
            $mdDialog.hide();
        }
    }
})();
