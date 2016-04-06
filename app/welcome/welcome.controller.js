(function () {
    'use strict';

    angular
        .module('password.welcome')
        .controller('WelcomeController', WelcomeController);

    function WelcomeController($location, $window) {
        var vm = this;

        vm.navigate = navigate;

        activate();

        ///////////////////////////////////////////////////////////////////////

        function activate() {
        }

        function navigate(url) {
            if (isFullyQualifiedUrl(url)) {
                $window.location.href = url;
            } else {
                $location.url(url);
            }
        }

        function isFullyQualifiedUrl(url) {
            return url.indexOf('//') !== -1;
        }
    }
})();
