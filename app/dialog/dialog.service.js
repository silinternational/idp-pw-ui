(function () {
    'use strict';

    angular
      .module('password.dialog')
      .factory('dialogService', dialogService);

    function dialogService($mdDialog) {
        var service = {
            fail: fail,
            update: update,
            advice: advice,
            reset: reset,
            help: help,
            areYouSure: areYouSure,
            progress: progress
        };

        activate();

        return service;

        //////////////////////////////////////////////////////////////////

        function activate() {
        }

        function fail(summary, error) {
            $mdDialog.show({
                templateUrl: 'dialog/failed-dialog.html',
                controller: 'FailedDialogController',
                controllerAs: 'vm',
                locals: {
                    summary: summary,
                    error: error
                }
            });
        }

        function update(message) {
            $mdDialog.show({
                templateUrl: 'dialog/updated-dialog.html',
                controller: 'UpdatedDialogController',
                controllerAs: 'vm',
                locals: {
                    message: message
                }

            });
        }

        function advice(warning, suggestions) {
            $mdDialog.show({
                templateUrl: 'dialog/password-advice-dialog.html',
                controller: 'PasswordAdviceDialogController',
                controllerAs: 'vm',
                locals: {
                    warning: warning,
                    suggestions: suggestions
                }
            });
        }

        function reset(primaryEmail, resetId) {
            $mdDialog.show({
               templateUrl: 'dialog/reset-dialog.html',
               controller: 'ResetDialogController',
               controllerAs: 'vm',
               locals: {
                   sentTo: primaryEmail,
                   resetId: resetId
               },
               escapeToClose: false
           });
        }

        function help(helpInfo) {
            $mdDialog.show({
                templateUrl: 'dialog/help-dialog.html',
                controller: 'HelpDialogController',
                controllerAs: 'vm',
                locals: {
                    helpInfo: helpInfo
                }
            });
        }

        function areYouSure(question) {
            return $mdDialog.show({
                       templateUrl: 'dialog/are-you-sure-dialog.html',
                       controller: 'AreYouSureDialogController',
                       controllerAs: 'vm',
                       locals: {
                           question: question
                       }
                   });
        }

        function progress() {
            $mdDialog.show({
                templateUrl: 'dialog/progress-dialog.html',
                escapeToClose: false
            });
        }
    }
})();
