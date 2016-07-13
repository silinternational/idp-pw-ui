(function () {
    'use strict';

    angular
      .module('password.dialog')
      .controller('VerifyResetDialogController', VerifyResetDialogController);

    function VerifyResetDialogController(sentTo, dataService, $routeParams, 
                                         tokenService, $mdDialog, 
                                         dialogService, $location) {
        var vm = this;

        vm.sentTo = sentTo;
        vm.verificationCode = null;

        vm.verify = verify;
        vm.cancel = cancel;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
        }

        function verify() {
            $mdDialog.hide();

            dataService
              .put('reset/' + $routeParams.resetId + '/validate', {
                  code: vm.verificationCode,
                  client_id: tokenService.getClientKey()
              })
              .then(valid, invalid)
              .finally($mdDialog.hide);

            dialogService.progress();
        }

        function valid(response) {
            tokenService.setApiToken(response.data.access_token);

            $location.url('change');
        }

        function invalid(response) {
            dialogService.fail('Verification failed', response.data);
        }

        function cancel() {
            $mdDialog.hide();
        }
    }
})();
