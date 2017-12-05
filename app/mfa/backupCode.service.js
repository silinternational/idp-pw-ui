(function () {
    'use strict';

    angular
      .module('password.mfa')
      .factory('backupCodeService', backupCodeService);

    function backupCodeService() {
        var codes = [],
            service = {
              codes: codes
            };

        return service;
    }
})();
