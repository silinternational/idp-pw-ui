(function () {
    'use strict';

    angular
      .module('password.recovery')
      .controller('VerifyMethodController', VerifyMethodController);

    function VerifyMethodController($routeParams, verifyService, dialogService, dataService,
                                    $location, $scope, $timeout) {
        var vm = this;

        vm.verificationCode = null;
        vm.anotherSent = $routeParams.anotherSent;

        vm.verify = verify;
        vm.resend = resend;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
            $scope.$on('$viewContentLoaded', startBadCarrierWarningTimer);
        }

        function startBadCarrierWarningTimer() {
            var THREE_MINUTES = 180000;

            var promise = $timeout(displayBadCarrierWarning, THREE_MINUTES);

            $scope.$on('$routeChangeStart', stopBadCarrierWarningTimer(promise));
        }

        function stopBadCarrierWarningTimer(runningTimer) {
            return function () {
                $timeout.cancel(runningTimer);
            };
        }

        function displayBadCarrierWarning() {
            dialogService.info('If you do not receive a text message or phone call within five minutes it could be because your telephone company is not supported. We know Republic Wireless and some VOIP office systems are not supported.');
        }

        function verify() {
            verifyService
              .verifyMethod($routeParams.methodId, vm.verificationCode)
              .then(verified, invalid);

            dialogService.progress();
        }

        function verified() {
            dialogService.close();

            dialogService
              .update('Your code was accepted and your new password recovery method has been added.');
        }

        function invalid(error) {
            dialogService
              .fail('Incorrect verification code.', error);
        }

        function resend() {
            dataService
              .put('method/' + $routeParams.methodId + '/resend')
              .then(sent, failed);

            dialogService.progress();
        }

        function sent() {
            dialogService.close();

            $location.url($location.url() + '?anotherSent="true"');
        }

        function failed(response) {
            dialogService
              .fail('Unable to resend code.', response.data);
        }
    }
}());
