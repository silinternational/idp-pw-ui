(function() {
    'use strict';

    angular
        .module('password.nav')
        .directive('pwNav', pwNav);

    function pwNav() {
        return {
            restrict : 'E',
            controller: NavController,
            controllerAs: 'vm',
            bindToController: true,
            scope : {
            },
            templateUrl : 'nav/nav.html'
        };
    }

    function NavController($location, $mdSidenav) {
        var vm = this;

        vm.user = {};

        vm.navigate = navigate;
        vm.closeNav = closeNav;
        vm.login = login;
        vm.logout = logout;

        activate();

        ///////////////////////////////////////////////////////////////////////

        function activate() {
        }

        function navigate(url) {
            $location.url(url);

            closeNav();
        }

        function closeNav() {
            $mdSidenav('sidenav').close();
        }

        function login() {
            vm.user.isAuthenticated = true;
            vm.user.name = 'Jane Doe';

            navigate('profile');
        }

        function logout() {
            vm.user.isAuthenticated = false;
            vm.user.name = '';

            navigate('welcome');
        }
    }
})();
