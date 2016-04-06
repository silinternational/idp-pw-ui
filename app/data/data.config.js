(function () {
    'use strict';

    angular
        .module('password.data')
        .config(configureData);

        function configureData($httpProvider) {
            $httpProvider.defaults.withCredentials = true;  //TODO: is this needed?
        }
})();
