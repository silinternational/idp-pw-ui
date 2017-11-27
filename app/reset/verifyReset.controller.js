(function () {
    'use strict';

    angular
      .module('password.reset')
      .controller('VerifyResetController', VerifyResetController);

    function VerifyResetController($routeParams, dialogService, $location,
                                   verifyService) {
        var vm = this;

        vm.verification = 'pending';

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
            verifyService
              .verifyReset($routeParams.resetId,
                           $routeParams.verificationCode)
              .then(valid, invalid);

            dialogService.progress();
        }

        function valid() {
            dialogService.close();

            $location.url('change');
        }

        function invalid() {
            dialogService.close();

            vm.verification = 'invalid';
        }
    }
})();
