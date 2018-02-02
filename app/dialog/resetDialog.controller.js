(function () {
    'use strict';

    angular
      .module('password.dialog')
      .controller('ResetDialogController', ResetDialogController);

    function ResetDialogController($location, sentTo, resetId, dataService, dialogService) {
        var vm = this;

        vm.sentTo = sentTo;
        vm.resetId = resetId;

        vm.alternates = alternates;
        vm.resend = resend;
        vm.done = done;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
        }

        function alternates() {
            dialogService.close();

            $location.url('reset/' + vm.resetId + '/verify/alternates');
        }

        function resend() {
            dialogService.close();

            dataService
              .put('reset/' + vm.resetId + '/resend')
              .then(sent, failed);

            dialogService.progress();
        }

        function sent(response) {
            var primaryEmail = response.data.methods[0].value;

            dialogService
              .reset(primaryEmail, response.data.uid);
        }

        function failed(response) {
            dialogService
              .fail('Unable to resend verification.', response.data);
        }

        function done() {
            dialogService.close();

            $location.url('/');
        }
    }
})();
