(function () {
    'use strict';

    angular
      .module('password.reset')
      .controller('VerifyResetController', VerifyResetController);

    function VerifyResetController($routeParams, dialogService, $mdDialog,
                                   $location, verifyService) {
        var vm = this;

        vm.verification = 'pending';

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
            verifyService
              .verify($routeParams.verificationCode)
              .then(valid, invalid)
              .finally($mdDialog.hide);

            dialogService.progress();
        }

        function valid() {
            $location.url('change');
        }

        function invalid() {
            vm.verification = 'invalid';
        }
    }
})();
