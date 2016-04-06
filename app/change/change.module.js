(function() {
    'use strict';

    angular
        .module('password.change', [
            'ngMaterial',
            'ngRoute',
            'ngMessages',
            'password.html',
            'zxcvbn'
        ]);
})();
