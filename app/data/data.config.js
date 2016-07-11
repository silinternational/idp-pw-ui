(function () {
    'use strict';

    angular
      .module('password.data')
      .config(configureDataCalls);

    function configureDataCalls($httpProvider) {
        $httpProvider.defaults.withCredentials = true;

        $httpProvider.interceptors.push(addTokenToRequests);

        //////////////////////////////////////////////////////////////////

        function addTokenToRequests(tokenService) {
            return {
                request: function (request) {
                    request
                      .headers
                      .Authorization = 'Bearer ' + tokenService.getToken();

                    return request;
                }
            };
        }
    }
})();
