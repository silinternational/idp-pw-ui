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
              .then(valid, invalid)
              .finally(dialogService.close);

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
