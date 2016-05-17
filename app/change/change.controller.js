(function () {
    'use strict';

    angular
      .module('password.change')
      .controller('ChangeController', ChangeController);

    function ChangeController(dataService, resolvedUser, dialogService) {
        var vm = this;

        vm.pw = '';
        vm.pwConstraints = {};

        vm.change = change;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
            if (resolvedUser.isAuthenticated) {
                dataService
                  .get('config')
                  .then(function (response) {
                      vm.pwConstraints = response.data.password;
                  });

            } else {
                dialogService.notAuthorized();
            }
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
