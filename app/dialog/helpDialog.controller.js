(function () {
    'use strict';

    angular
      .module('password.dialog')
      .controller('HelpDialogController', HelpDialogController);

    function HelpDialogController($mdDialog, helpInfo) {
        var vm = this;
        
        vm.helpInfo = helpInfo;

        vm.close = close;
        
        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
        }

        function close() {
            $mdDialog.hide();
        }
    }
})();
