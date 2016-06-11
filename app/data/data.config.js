(function () {
    'use strict';

    angular
      .module('password.data')
      .config(configureDataCalls)
      .config(configureProgressInterceptor);

    function configureDataCalls($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    }

    function configureProgressInterceptor($httpProvider) {
        $httpProvider.interceptors.push(progressInterceptor);

        //////////////////////////////////////////////////////////////////

        function progressInterceptor($q, $injector) {
            return {
                'request': requestHandler,
                'response': responseHandler,
                'responseError': errorHandler
            };

            //////////////////////////////////////////////////////////////

            function requestHandler(config) {
                // wanted to simply inject service normally but it 
                // caused a circular dependency with $http
                // :-( TODO: would love to see this corrected
                $injector
                  .get('progressIndicatorService')
                  .queue(config.url);

                return config;
            }

            function responseHandler(response) {
                $injector
                  .get('progressIndicatorService')
                  .dequeue(response.config.url);

                return response;
            }

            function errorHandler(rejection) {
                $injector
                  .get('progressIndicatorService')
                  .dequeue(rejection.config.url);

                return $q.reject(rejection);
            }
        }
    }
})();
