(function () {
    'use strict';

    angular
      .module('password.data')
      .config(configureDataCalls);

    function configureDataCalls($httpProvider, DATA_API_WITH_CREDENTIALS) {
        $httpProvider.defaults.withCredentials = DATA_API_WITH_CREDENTIALS;

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
