(function () {
    'use strict';

    angular
      .module('password.dialog')
      .factory('dialogService', dialogService);

    function dialogService($mdDialog) {
        var service = {
            fail: fail,
            update: update,
            notAuthorized: notAuthorized,
            advice: advice,
            reset: reset,
            help: help,
            areYouSure: areYouSure
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

        function notAuthorized() {
            $mdDialog.show({
                templateUrl: 'dialog/not-authorized-dialog.html',
                controller: 'NotAuthorizedDialogController',
                controllerAs: 'vm',
                escapeToClose: false
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
            return $mdDialog.show({
                       templateUrl: 'dialog/reset-dialog.html',
                       controller: 'ResetDialogController',
                       controllerAs: 'vm',
                       locals: {
                           sentTo: primaryEmail,
                           resetId: resetId
                       }
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
    }
})();
