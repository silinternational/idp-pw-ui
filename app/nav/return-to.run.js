(function () {
    'use strict';

    angular
      .module('password.nav')
      .run(lookForParameter);

    function lookForParameter($rootScope, returnToService, $location) {
        //TODO: is it really necessary to do this on every route change?
        $rootScope.$on('$locationChangeStart', checkForReturnToUrl);

        //////////////////////////////////////////////////////////////////

        function checkForReturnToUrl() {
            var queryString = $location.search();

            if (queryString.returnTo &&
                angular.isString(queryString.returnTo)) {
                returnToService.url = queryString.returnTo;
            }
        }
    }
})();
