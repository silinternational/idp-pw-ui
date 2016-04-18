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

    function NavController(userService, $location, $mdSidenav) {
        var vm = this;

        vm.user = userService.user;

        vm.navigate = navigate;
        vm.closeNav = closeNav;

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
    }
})();
