(function () {
    'use strict';

    angular
      .module('password.reset')
      .controller('ResetController', ResetController);

    function ResetController(dataService, $routeParams, dialogService,
                             $mdDialog, tokenService) {
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
            vm.verification = 'valid';
            
            tokenService.setApiToken(response.data.access_token);
        }

        function invalid() {
//TODO: inspect failure to distinguis between an invalid code and a system
//      failure.            
            vm.verification = 'invalid';
        }
    }
})();
