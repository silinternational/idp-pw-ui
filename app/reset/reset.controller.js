(function () {
    'use strict';

    angular
      .module('password.reset')
      .controller('ResetController', ResetController);

    function ResetController(dataService, $routeParams) {
        var vm = this;

        vm.verification = 'pending';

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
            dataService
              .put('reset/' + $routeParams.resetId + '/validate', {
                  code: $routeParams.verificationCode
              })
              .then(valid, invalid);
        }

        function valid() {
            vm.verification = 'valid';
        }

        function invalid() {
            vm.verification = 'invalid';
        }
    }
})();
