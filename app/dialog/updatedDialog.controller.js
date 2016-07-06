(function () {
    'use strict';

    angular
      .module('password.dialog')
      .controller('UpdatedDialogController', UpdatedDialogController);

    function UpdatedDialogController($location, message) {
        var vm = this;

        vm.message = message;

        vm.ok = ok;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
        }

        function ok() {
            $location.url('profile');
        }
    }
})();
