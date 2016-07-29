(function () {
    'use strict';

    angular
      .module('password.dialog')
      .controller('HelpDialogController', HelpDialogController);

    function HelpDialogController(dialogService, helpInfo) {
        var vm = this;
        
        vm.helpInfo = helpInfo;

        vm.close = close;
        
        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
        }

        function close() {
            dialogService.close();
        }
    }
})();
