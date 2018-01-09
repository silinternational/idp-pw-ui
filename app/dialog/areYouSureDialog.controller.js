(function () {
    'use strict';

    angular
      .module('password.dialog')
      .controller('AreYouSureDialogController', AreYouSureDialogController);

    function AreYouSureDialogController($mdDialog, question, headerClass) {
        var vm = this;

        vm.question = question;
        vm.headerClass = headerClass;

        vm.cancel = cancel;
        vm.yes = yes;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
        }

        function cancel() {
            $mdDialog.cancel();
        }
        
        function yes() {
            $mdDialog.hide();
        }
    }
})();
