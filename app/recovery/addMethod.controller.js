(function () {
    'use strict';

    angular
      .module('password.recovery')
      .controller('AddMethodController', AddMethodController);

    function AddMethodController($location, countryService, dataService,
                                 dialogService, $mdDialog) {
        var vm = this;

        vm.newRecoveryMethod = {
            type: 'email',
            value: ''
        };
        vm.addMethodForm = null;
        vm.selectedCountry = null;
        vm.countries = [];

        vm.addPhone = addPhone;
        vm.add = add;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
            vm.countries = countryService.getCountries();
            vm.selectedCountry = vm.countries[0];
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
              .then(added, failed)
              .finally($mdDialog.hide);
            
            dialogService.progress();
        }

        function added(response) {
            verify(response.data);
        }

        function failed(response) {
            dialogService
              .fail('Attempt to add recovery method failed.',
                    response.data);
        }

        function verify(method) {
            $location.url('recovery-method/verify/' + method.id);
        }
    }
}());
