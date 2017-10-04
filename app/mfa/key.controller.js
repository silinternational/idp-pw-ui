(function () {
    'use strict';

    angular
      .module('password.mfa')
      .controller('KeyController', KeyController);

    function KeyController(config) {
        var vm = this;

        vm.config = config;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
        }
    }
})();
