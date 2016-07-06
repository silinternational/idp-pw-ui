(function () {
    'use strict';

    angular
      .module('password.nav')
      .factory('returnToService', returnToService);

    function returnToService() {
        var url = null;

        return {
            url: url
        };
    }
})();
