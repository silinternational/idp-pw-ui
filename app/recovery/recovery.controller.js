(function () {
    'use strict';

    angular
        .module('password.recovery')
        .controller('RecoveryController', RecoveryController);

    function RecoveryController($location, $mdDialog) {
        var vm = this;

        //TODO: data must come back hashed from API
        vm.methods = [
            {
                email: '****@gmail.com'
            },
            {
                email: '***@sil.org'
            },
            {
                email: '***************************@wycliffe.org'
            },
            {
                phone: '###-###-4567'
            },
            {
                phone: '+1 ###-###-1234'
            },
            {
                other: 'Send verification code to my supervisor'
            },
            {
                other: 'Send verification code to my spouse'
            }
        ];
        vm.verificationForm = null;
        vm.verificationCode = null;
        vm.anotherSent = false;

        vm.verify = verify;
        vm.cancelVerification = cancelVerification;
        vm.isEmail = isEmail;
        vm.isPhone = isPhone;
        vm.isOther = isOther;
        vm.resendCode = resendCode;
        vm.verifyCode = verifyCode;

        activate();

        ///////////////////////////////////////////////////////////////////////

        function activate() {
        }

        function verify(method) {
            showCodeVerificationDialog(method);
        }

        function showCodeVerificationDialog() {
            $mdDialog.show({
                templateUrl: 'recovery/verify-code.html',
                controller: RecoveryController,
                controllerAs: 'vm'
            });
        }

        function cancelVerification() {
            $mdDialog.cancel();
        }

        function isEmail(method) {
            return angular.isDefined(method.email);
        }

        function isPhone(method) {
            return angular.isDefined(method.phone);
        }

        function isOther(method) {
            return angular.isDefined(method.other);
        }

        function resendCode() {
            vm.verificationCode = null;
            vm.anotherSent = true;
        }

        function verifyCode() {
            if (vm.verificationCode === '1234') {
                $mdDialog.hide();

                $location.url('change');
            } else {
                // TODO: this error not showing as expected, need to
                // research async validators more
                vm.verificationForm.verificationCode.$error.incorrect = true;
            }
        }
    }
}());
