(function () {
    'use strict';

    angular
      .module('password.recovery')
      .controller('VerifyMethodController', VerifyMethodController);

    function VerifyMethodController($routeParams, dataService,
                                    dialogService) {
        var vm = this;

        vm.verificationForm = null;
        vm.verificationCode = null;

        vm.verify = verify;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
        }

        function verify() {
            dataService
              .put('method/' + $routeParams.methodId, {
                  code: vm.verificationCode
              })
              .then(verified, invalid);
        }

        function verified() {
            dialogService
              .update('Your code was accepted and your new recovery ' +
                      'method has been added.');
        }

        function invalid(response) {
            dialogService
              .fail('Incorrect verification code.', response.data);
        }
    }
}());
