(function () {
    'use strict';

    angular
      .module('password.change')
      .directive('pwPasswordAdvice', pwPasswordAdvice);

    function pwPasswordAdvice() {
        return {
            restrict: 'E',
            controller: PasswordAdviceController,
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                warning: '=',
                suggestions: '='
            },
            templateUrl: 'change/password-advice.html'
        };
    }

    function PasswordAdviceController(dialogService) {
        var vm = this;

        vm.showAdvice = showAdvice;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
        }

        function showAdvice() {
            dialogService
              .advice(vm.warning, vm.suggestions);
        }
    }
})();
