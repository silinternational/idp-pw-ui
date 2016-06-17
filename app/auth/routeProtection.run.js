(function () {
    'use strict';

    angular
      .module('password.auth')
      .run(establishRouteProtection);

    function establishRouteProtection($rootScope, userService) {
        $rootScope.$on('$routeChangeStart', protect);
        $rootScope.$on('$routeChangeError', defend);

        //////////////////////////////////////////////////////////////////
        
        function protect(event, targetRoute) {
            if (targetRoute.protected) {
                targetRoute.resolve = targetRoute.resolve || {};

                targetRoute.resolve.authorizer = authorize;
            }
        }

        function authorize() {
            return userService
                     .getUser()
                     .then(retrieved, failed);
        }

        function retrieved(user) {
            if (! user.isAuthenticated) {
                throw new IntruderError();
            }
        }

        function failed() {
            throw new IntruderError();
        }

        function defend(event, targetRoute, currentRoute, error) {
            if (error instanceof IntruderError) {
                userService.login(targetRoute.originalPath);
            }
        }

        function IntruderError() {
            this.message = 'Unauthorized';
        }
        IntruderError.prototype = Object.create(Error.prototype);
        IntruderError.prototype.constructor = IntruderError;
    }
})();
