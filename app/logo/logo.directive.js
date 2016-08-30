(function () {
    'use strict';

    angular
      .module('password.logo')
      .directive('pwLogoClick', pwLogoClick);

    function pwLogoClick(config, $window) {
        return {
            restrict: 'A',
            link: handleClick
        };

        //////////////////////////////////////////////////////////////////

        function handleClick(scope, element) {
            element.on('click', function () {
                $window.location = config.logoUrl || '//sil.org';
            });
        }
    }
})();
