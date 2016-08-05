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
            noMethods: noMethods
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
            var isIE = /*@cc_on!@*/false || !!document.documentMode;
            if (!isIE) {
                $mdDialog.show({
                    templateUrl: 'dialog/progress-dialog.html',
                    escapeToClose: false
                });
            }
        }

        function verify(sentTo) {
            dialogService.close();

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
    }
})();
