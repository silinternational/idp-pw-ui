(function () {
    'use strict';

    angular
        .module('password.forgot')
        .constant('RECAPTCHA_SITE_KEY', window.passwordEnv.recaptchaSiteKey);
})();
