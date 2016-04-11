(function () {
    'use strict';

    angular
        .module('password.change')
        .controller('ChangeController', ChangeController);

    function ChangeController($mdDialog, $location, $timeout) {
        var vm = this;

        vm.pw = '';
        vm.pwagain = '';
        vm.strength = {};

        vm.change = change;
        vm.cancel = cancel;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
            checkForIncomingToken();
        }

        function checkForIncomingToken() {
            var queryString = $location.search();

            if (angular.isString(queryString.id) &&
                angular.isString(queryString.token)) {

                $mdDialog.show({
                    templateUrl: 'change/verification-status.html',
                    escapeToClose: false
                });

                $timeout(function () {
                    $mdDialog.hide();
                }, 2000);
            }
        }

        function cancel() {
            if (vm.changeForm.$dirty) {
                $mdDialog.show(
                  // TODO: may need to move content into template for i18n
                  // purposes.
                  $mdDialog.confirm()
                    .title('Are you sure?')
                    .textContent('Would you like to discard your changes?')
                    .ok('Yes')
                    .cancel('No')
                ).then(function handleOk() {
                    moveToProfilePage();
                });
            } else {
                moveToProfilePage();
            }
        }

        function moveToProfilePage() {
            $location.url('profile');
        }

        function change() {
            // TODO: may need to move content into template for i18n
            // purposes.
            if (! vm.changeForm.$invalid) {
                $mdDialog.show(
                  $mdDialog.alert()
                    .title('Password status')
                    .textContent('Password changed successfully.')
                    .ok('Ok')
                ).then(function handleUserResponse() {
                    // TODO: may need to give the user an option to return to
                    // their original destination or proceed to their profile
                    moveToProfilePage();
                });
            }
        }
    }
})();
