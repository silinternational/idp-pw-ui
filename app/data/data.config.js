(function () {
    'use strict';

    angular
      .module('password.data')
      .config(configureDataCalls);

    function configureDataCalls($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    }
})();
