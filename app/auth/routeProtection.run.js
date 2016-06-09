(function () {
    'use strict';

    angular
      .module('password.auth')
      .run(establishRouteProtection);

    function establishRouteProtection($rootScope, $mdDialog) {
        $rootScope.$on('$routeChangeStart', protect);
        $rootScope.$on('$routeChangeError', defend);

        //////////////////////////////////////////////////////////////////
        
        function protect(event, targetRoute) {
            if (targetRoute.protected) {
                targetRoute.resolve = targetRoute.resolve || {};
                
                targetRoute.resolve.authorizer = authorize;
            }
        }

        function authorize(userService) {
            return userService
                     .getUser()
                     .then(function (user) {
                         if (! user.isAuthenticated) {
                             throw new IntruderError();
                         }
                     });
        }

        function defend(event, targetRoute, currentRoute, error) {
            if (error instanceof IntruderError) {
                $mdDialog.show({
                    templateUrl: 'auth/not-authorized-dialog.html',
                    controller: 'NotAuthorizedDialogController',
                    controllerAs: 'vm',
                    escapeToClose: false
                });
            }
        }

        function IntruderError() {
            this.message = 'Unauthorized';
        }
        IntruderError.prototype = Object.create(Error.prototype);
        IntruderError.prototype.constructor = IntruderError;
    }
})();
