(function () {
    'use strict';

    angular
      .module('password.recovery')
      .controller('AddMethodController', AddMethodController);

    function AddMethodController($mdDialog, $location, countryService,
                                 dataService) {
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

        //TODO: this cancel behavior checking for dirty is also in the
        // change controller...probably time to make this a directive
        function cancel() {
            if (vm.addMethodForm.$dirty) {
                $mdDialog.show(
                  // TODO: may need to move content into template for i18n
                  // purposes.
                  $mdDialog.confirm()
                    .title('Are you sure?')
                    .textContent('Would you like to discard your changes?')
                    .ok('Yes')
                    .cancel('No')
                ).then(function handleOk() {
                    navigateToProfilePage();
                });
            } else {
                navigateToProfilePage();
            }
        }

        function navigateToProfilePage() {
            $location.url('profile');
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
              .then(function (response) {
                  showCodeVerificationDialog(response.data);
              }, function (response) {
                  console.error(response);
              });
        }

        function showCodeVerificationDialog(method) {
            $mdDialog.show({
                templateUrl: 'recovery/verify.html',
                controller: 'VerifyController',
                controllerAs: 'vm',
                locals: {
                    method: method
                }
            });
        }
    }
}());
