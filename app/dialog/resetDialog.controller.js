(function () {
    'use strict';

    angular
      .module('password.dialog')
      .controller('ResetDialogController', ResetDialogController);

    function ResetDialogController($location, sentTo, resetId,
                                   dataService, dialogService) {
        var vm = this;

        vm.sentTo = sentTo;

        vm.alternates = alternates;
        vm.resend = resend;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
        }

        function alternates() {
            $location.url('reset/' + resetId + '/verify/alternates');
        }

        function resend() {
            dataService
              .put('reset/' + resetId + '/resend')
              .then(sent, failed);
        }

        function sent(response) {
            var primaryEmail = response.data.methods[0].value;

            dialogService
              .reset(primaryEmail, response.data.uid);
        }

        function failed (response) {
            dialogService
              .fail('Unable to resend verification.', response.data);
        }
    }
})();
