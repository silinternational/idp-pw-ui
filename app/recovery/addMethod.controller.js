(function () {
    'use strict';

    angular
      .module('password.recovery')
      .controller('AddMethodController', AddMethodController);

    function AddMethodController($location, countryService, dataService, dialogService, type) {
        var vm = this;

        vm.addMethodForm = null;
        vm.newRecoveryMethod = {
            type: type,
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
            add({
                type: vm.newRecoveryMethod.type,
                value: vm.selectedCountry.prefix + vm.newRecoveryMethod.value
            });
        }

        function add(newMethod) {
            if (vm.addMethodForm.$valid) {
                dataService
                  .post('method', newMethod)
                  .then(added, failed);

                dialogService.progress();
            }
        }

        function added(response) {
            dialogService.close();

            sendToVerifyPage(response.data);
        }

        function failed(response) {
            dialogService.fail('Attempt to add password recovery method failed.', response.data);
        }

        function sendToVerifyPage(method) {
            $location.url('recovery-method/verify-' + method.type + '/' + method.id);
        }
    }
}());
