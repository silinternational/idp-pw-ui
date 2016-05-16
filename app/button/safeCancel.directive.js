(function () {
    'use strict';

    angular
      .module('password.button')
      .directive('pwSafeCancel', pwSafeCancel);

    function pwSafeCancel() {
        return {
            restrict: 'E',
            require: '^form',
            scope: {
            },
            controller: SafeCancelController,
            controllerAs: 'vm',
            bindToController: true,
            templateUrl: 'button/safe-cancel.html'
        };
    }

    function SafeCancelController($element, $mdDialog, $location) {
        var vm = this;

        vm.cancel = cancel;
        
        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
        }
        
        function cancel() {
            if ($element.controller('form').$dirty) {
                $mdDialog.show({
                    templateUrl: 'button/discard-changes-dialog.html',
                    controller: 'DiscardChangesDialogController',
                    controllerAs: 'vm'
                });
            } else {
                $location.url('profile');
            }
        }
    }
})();
