(function () {
    'use strict';

    angular
      .module('password.mfa')
      .factory('bowser', config);

    function config($window) {
        return $window.bowser;
    }
})();
