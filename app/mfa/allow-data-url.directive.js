(function () {
    'use strict';

    angular
      .module('password.mfa')
      .directive('pwAllowDataUrl', pwAllowDataUrl);

    function pwAllowDataUrl($timeout) {
        activate();

        return {
            restrict: 'A',
            link: monitorHref
        };

        //////////////////////////////////////////////////////////////////

        function activate() {
        }

        function monitorHref(scope, el, attrs) {
            attrs.$observe('href', isMarkedUnsafe);
        }

        function isMarkedUnsafe(value) {
            var key = 'unsafe:data:text/plain,';

            if (value.startsWith(key) && value.length > key.length) {
                // Angular doesn't accept data urls in href's at this time so this will simply
                // "wait" (200 ms is pretty arbitrary at this point) to rewrite the href so it will
                // work as intended.
                $timeout(cleanHref, 200);
            }
        }

        function cleanHref() {
            var a = document.querySelector('a[ng-href][download][pw-allow-data-url]');
            a.href = a.href.replace('unsafe:', '');
        }
    }
})();
