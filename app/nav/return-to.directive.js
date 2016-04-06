(function() {
    'use strict';

    angular
        .module('password.nav')
        .directive('pwReturnTo', pwReturnTo);

    function pwReturnTo() {
        return {
            restrict : 'E',
            controller: ReturnToController,
            controllerAs: 'vm',
            bindToController: true,
            scope : {
            },
            templateUrl : 'nav/return-to.html'
        };
    }

    function ReturnToController(returnToService, $window) {
        var vm = this;

        vm.returnToUrl = returnToService.url;
        vm.return = returnToOriginalUrl;

        activate();

        ///////////////////////////////////////////////////////////////////////

        function activate() {
        }

        function returnToOriginalUrl() {
            $window.location = vm.returnToUrl;
        }
    }
})();
