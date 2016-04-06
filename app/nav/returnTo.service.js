(function () {
    'use strict';

    angular
      .module('password.nav')
      .factory('returnToService', returnToService);

    function returnToService() {
        var url = null;

        var service = {
                url: url
            };

        activate();

        return service;

        ///////////////////////////////////////////////////////////////////////

        function activate() {
        }
    }
})();
