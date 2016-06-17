(function () {
    'use strict';

    angular
      .module('password.data')
      .config(establishCache);

    function establishCache($httpProvider) {
        $httpProvider.interceptors.push(cacheInterceptor);

        //////////////////////////////////////////////////////////////////

        function cacheInterceptor() {
            var cachedEndpoints = [
                /user\/me/,
                /config/
            ];

            return {
                'request': cacheCalls
            };

            //////////////////////////////////////////////////////////////

            function cacheCalls(config) {
                if (isCacheable(config.url)) {
                    config.cache = true;
                }

                return config;
            }

            function isCacheable(url) {
                return cachedEndpoints.some(isCached);
                
                //////////////////////////////////////////////////////////

                function isCached(cachedUrl) {
                    return url.match(cachedUrl);
                }
            }
        }
    }
})();
