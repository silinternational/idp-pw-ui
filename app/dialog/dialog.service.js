(function () {
    'use strict';

    angular
      .module('password.dialog')
      .factory('dialogService', dialogService);

    function dialogService($mdDialog) {
        var service = {
            close: close,
            fail: fail,
            update: update,
            advice: advice,
            reset: reset,
            help: help,
            areYouSure: areYouSure,
            progress: progress,
            verify: verify,
            noMethods: noMethods,
            info: info,
            infoWithNoButton: infoWithNoButton
        };

        activate();

        return service;

        //////////////////////////////////////////////////////////////////

        function activate() {
        }

        function close() {
            $mdDialog.hide();
        }

        function fail(summary, error) {
            return $mdDialog.show({
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

        function areYouSure(question, headerClass) {
            return $mdDialog.show({
                templateUrl: 'dialog/are-you-sure-dialog.html',
                controller: 'AreYouSureDialogController',
                controllerAs: 'vm',
                locals: {
                    question: question,
                    headerClass: headerClass
                }
            });
        }

        function progress() {
            $mdDialog.show({
                templateUrl: 'dialog/progress-dialog.html',
                escapeToClose: false
            });
        }

        function verify(sentTo) {
            $mdDialog.show({
                templateUrl: 'dialog/verify-reset-dialog.html',
                controller: 'VerifyResetDialogController',
                controllerAs: 'vm',
                locals: {
                    sentTo: sentTo
                }
            });
        }

        function noMethods() {
            $mdDialog.show({
                templateUrl: 'dialog/noMethods-dialog.html',
                controller: 'NoMethodsDialogController',
                controllerAs: 'vm'
            });
        }

        function info(message, title) {
            return $mdDialog.show({
                templateUrl: 'dialog/info-dialog.html',
                controller: 'InfoDialogController',
                controllerAs: 'vm',
                locals: {
                    message: message,
                    title: title
                }
            });
        }

        function infoWithNoButton(message) {
            $mdDialog.show({
                templateUrl: 'dialog/info-dialog-no-button.html',
                controller: 'InfoDialogController',
                controllerAs: 'vm',
                locals: {
                    message: message,
                    title: null
                }
            });
        }
    }
})();
