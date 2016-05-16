(function () {
    'use strict';

    angular
      .module('password.recovery')
      .controller('VerifyController', VerifyController);

    function VerifyController($mdDialog, $routeParams, dataService,
                              failedDialogService, $route) {
        var vm = this;

        vm.verificationForm = null;
        vm.verificationCode = null;
        vm.anotherSent = false;

        vm.resendCode = resendCode;
        vm.verify = verify;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
        }

        function resendCode() {
            vm.verificationCode = null;

            dataService
              .put('method/' + $routeParams.methodId + '/resend')
              .then(sent, failed);
        }

        function sent() {
//TODO: needs to be tested
            vm.anotherSent = true;

            $route.reload();
        }

        function failed(response) {
//TODO: needs to be tested
            failedDialogService
              .open('Attempt to resend verification code failed.',
                    response.data);
        }

        function verify() {
            dataService
              .put('method/' + $routeParams.methodId, {
                  code: vm.verificationCode
              })
              .then(verified, invalid);
        }

        function verified() {
            $mdDialog
              .show({
                  templateUrl: 'recovery/verified-dialog.html',
                  controller: 'VerifiedDialogController',
                  controllerAs: 'vm'
              });
        }

        function invalid(response) {
            failedDialogService
              .open('Incorrect verification code.', response.data);
        }
    }
}());
