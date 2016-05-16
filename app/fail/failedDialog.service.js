(function () {
    'use strict';

    angular
      .module('password.fail')
      .factory('failedDialogService', failedDialogService);

    function failedDialogService($mdDialog) {
        var service = {
            open: open
        };

        activate();

        return service;

        //////////////////////////////////////////////////////////////////

        function activate() {
        }

        function open(summary, error) {
            $mdDialog.show({
                templateUrl: 'fail/failed-dialog.html',
                controller: 'FailedDialogController',
                controllerAs: 'vm',
                locals: {
                    summary: summary,
                    error: error
                }
            });
        }
    }
})();
