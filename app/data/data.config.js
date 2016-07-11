(function () {
    'use strict';

    angular
      .module('password.data')
      .config(configureDataCalls);

    function configureDataCalls($httpProvider) {
        $httpProvider.defaults.withCredentials = true;

        $httpProvider.interceptors.push(addToken);

        //////////////////////////////////////////////////////////////////

        function addToken(tokenService) {
            return {
                request: function (req) {
                    req.headers.Authorization = 'Bearer ' + 
                                                tokenService.getToken();
                    return req;
                }
            };
        }
    }
})();
