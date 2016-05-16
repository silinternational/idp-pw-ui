(function () {
    'use strict';

    angular
      .module('password.recovery')
      .controller('AddMethodController', AddMethodController);

    function AddMethodController($mdDialog, $location, countryService,
                                 dataService, failedDialogService) {
        var vm = this;

        vm.newRecoveryMethod = {
            type: 'email',
            value: ''
        };
        vm.addMethodForm = {};
        vm.selectedCountry = null;
        vm.countries = [];

        vm.cancel = cancel;
        vm.addPhone = addPhone;
        vm.add = add;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
            vm.countries = countryService.getCountries();
            vm.selectedCountry = vm.countries[0];
        }

        function cancel() {
            if (vm.addMethodForm.$dirty) {
                $mdDialog.show({
                    templateUrl: 'recovery/discard-changes-dialog.html',
                    controller: 'DiscardMethodChangesDialogController',
                    controllerAs: 'vm'
                });
            } else {
                $location.url('profile');
            }
        }

        function addPhone() {
            var digitsOnly = vm.newRecoveryMethod.value.replace(/\D/g, ''),
                countryPrefix = vm.selectedCountry.prefix;

            vm.newRecoveryMethod.value = countryPrefix + ',' + digitsOnly;

            add();
        }

        function add() {
            dataService
              .post('method', vm.newRecoveryMethod)
              .then(added, failed);
        }

        function added(response) {
            verify(response.data);
        }

        function failed(response) {
            failedDialogService
              .open('Attempt to add recovery method failed.',
                    response.data);
        }

        function verify(method) {
            $location.url('recovery-method/verify/' + method.id);
        }
    }
}());
