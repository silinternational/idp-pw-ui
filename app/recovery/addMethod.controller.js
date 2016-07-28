(function () {
    'use strict';

    angular
      .module('password.recovery')
      .controller('AddMethodController', AddMethodController);

    function AddMethodController($location, countryService, dataService,
                                 dialogService) {
        var vm = this;

        vm.newRecoveryMethod = {
            type: 'email',
            value: ''
        };
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
            var fullNumber = vm.selectedCountry.prefix + ',' +
                             vm.newRecoveryMethod.value;
            add({
                type: vm.newRecoveryMethod.type,
                value: fullNumber
            });
        }

        function add(newMethod) {
            dataService
              .post('method', newMethod)
              .then(added, failed)
              .finally(dialogService.close);

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
