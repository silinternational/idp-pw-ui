(function () {
    'use strict';

    angular
      .module('password.change')
      .controller('ChangeController', ChangeController);

    function ChangeController(dataService, configService, dialogService) {
        var vm = this;

        vm.pw = '';
        vm.config = configService.config;

        vm.change = change;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
        }

        function change() {
            if (vm.changeForm.$valid) {
                dataService
                  .put('password', {
                      password: vm.pw
                  })
                  .then(changed, failed);
            }
        }

        function changed() {
            dialogService
              .update('Password changed successfully.');
        }

        function failed(response) {
            dialogService
              .fail('Attempt to change password failed.', response.data);
        }
    }
})();
