(function () {
    'use strict';

    angular
      .module('password.help')
      .controller('HelpController', HelpController);

    function HelpController(config) {
        var vm = this;

        vm.config = config;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
        }
    }
})();
