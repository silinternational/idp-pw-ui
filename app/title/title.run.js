(function () {
    'use strict';

    angular
        .module('password.title')
        .run(subscribeToTitleChangingEvents);

    function subscribeToTitleChangingEvents($rootScope) {
        $rootScope.$on('$routeChangeSuccess', handleRouteChange);

        function handleRouteChange(angularEvent, currentRouteConfig) {
            $rootScope.title = currentRouteConfig.title;
        }
    }
})();
