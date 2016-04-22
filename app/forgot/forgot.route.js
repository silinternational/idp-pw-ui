(function() {
    'use strict';

    angular
        .module('password.forgot')
        .config(configureForgotRoutes);

    function configureForgotRoutes($routeProvider) {
        $routeProvider.when('/forgot', {
            title: 'Forgot Password',
            templateUrl: 'forgot/forgot.html',
            controller: 'ForgotController',
            controllerAs: 'vm',
            resolve: {
                // had to resolve this call to get the timing of the 
                // recaptcha right.  If vc-recaptcha fires off the call to 
                // google's api before the site key is available, the 
                // recaptcha component won't render.
                'resolvedConfig': getConfig
            }
        });

        function getConfig(dataService) {
            return dataService.get('config');
        }
    }
})();
