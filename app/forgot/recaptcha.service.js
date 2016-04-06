(function () {
    'use strict';

    angular
        .module('password.forgot')
        .factory('recaptchaService', recaptchaService);

    function recaptchaService(RECAPTCHA_SITE_KEY) {
        var verificationResponse = '',
            service = {
                getSiteKey: getSiteKey,
                setVerificationResponse: setVerificationResponse,
                getVerificationResponse: getVerificationResponse
            };

        activate();

        return service;

        ///////////////////////////////////////////////////////////////////////

        function activate() {
        }

        function getSiteKey() {
            return RECAPTCHA_SITE_KEY;
        }

        function setVerificationResponse(response) {
            verificationResponse = response;
        }

        function getVerificationResponse() {
            return verificationResponse;
        }
    }
})();
