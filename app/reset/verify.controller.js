(function () {
    'use strict';

    angular
      .module('password.reset')
      .controller('VerifyController', VerifyController);

    function VerifyController(dataService, $routeParams, dialogService,
                             $mdDialog, tokenService, $location) {
        var vm = this;

        vm.verification = 'pending';

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
            dataService
              .put('reset/' + $routeParams.resetId + '/validate', {
                  code: $routeParams.verificationCode,
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

        function invalid() {
            vm.verification = 'invalid';
        }
    }
})();
