(function () {
    'use strict';

    angular
      .module('password.recovery')
      .controller('VerifyMethodController', VerifyMethodController);

    function VerifyMethodController($routeParams, verifyService,
                                    dialogService) {
        var vm = this;

        vm.verificationCode = null;

        vm.verify = verify;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
        }

        function verify() {
            verifyService
              .verifyMethod($routeParams.methodId, vm.verificationCode)
              .then(verified, invalid);
        }

        function verified() {
            dialogService
              .update('Your code was accepted and your new recovery ' +
                      'method has been added.');
        }

        function invalid(error) {
            dialogService
              .fail('Incorrect verification code.', error);
        }
    }
}());
