(function() {
    'use strict';

    angular
        .module('password.forgot', [
            'ngRoute',
            'ngMaterial',
            'ngMessages',
            'password.html',
            'vcRecaptcha',
            'password.data'
        ]);
})();
