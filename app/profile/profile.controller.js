(function () {
    'use strict';

    angular
        .module('password.profile')
        .controller('ProfileController', ProfileController);

    function ProfileController($location) {
        var vm = this;

        vm.user = {
            name: 'Jane Doe',
            uname: 'jane_doe',
            email: 'jane_doe@sil.org'
        };
        vm.methods = [
            {
                email: 'jane_doe@jaars.org'
            },
            {
                email: 'jane_doe@wycliffe.org'
            },
            {
                phone: '(555) 555-1212'
            }
        ];

        vm.navigate = navigate;
        vm.isEmail = isEmail;
        vm.isPhone = isPhone;

        activate();

        ///////////////////////////////////////////////////////////////////////

        function activate() {
            vm.user.pwchanged = new Date();
        }

        function navigate(url) {
            $location.url(url);
        }

        function isEmail(method) {
            return angular.isDefined(method.email);
        }

        function isPhone(method) {
            return angular.isDefined(method.phone);
        }
    }
})();
