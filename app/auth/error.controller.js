(function () {
    'use strict';

    angular
      .module('password.auth')
      .controller('ErrorController', ErrorController);

    function ErrorController(dialogService, config) {
        var vm = this;
        
        vm.getHelp = getHelp;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
        }
        
        function getHelp() {
            dialogService.help(config.support);
        }
    }
})();
