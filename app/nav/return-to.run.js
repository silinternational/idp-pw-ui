(function () {
    'use strict';

    angular
      .module('password.nav')
      .run(lookForParameter);

    function lookForParameter(returnToService, $location) {
        var queryString = $location.search();

        returnToService.url = queryString.returnTo;
    }
})();
