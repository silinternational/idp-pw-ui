(function() {
    'use strict';

    angular
        .module('password.nav')
        .directive('pwNavToggle', pwNavToggle);

    function pwNavToggle() {
        return {
            restrict : 'E',
            controller: NavToggleController,
            controllerAs: 'vm',
            bindToController: true,
            scope : {
            },
            templateUrl : 'nav/nav-toggle.html'
        };
    }

    function NavToggleController($mdSidenav) {
        var vm = this;

        vm.openNav = openNav;

        ///////////////////////////////////////////////////////////////////////

        function openNav(){
            $mdSidenav('sidenav').open();
        }
    }
})();
