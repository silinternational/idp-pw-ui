(function () {
    'use strict';

    angular
      .module('password.change')
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
