(function () {
    'use strict';

    angular
        .module('password.html')
        .directive('autofocus', autofocus);

    /*
     This is meant to address the differences between a true page load in the HTML5 spec
     and a view change in SPA's.  There are tons of conversations about this online as well
     as in the angular github issues.  This should be removed if browsers or angular-core
     resolve this.
     */
    function autofocus() {
        return {
            link: link
        };

        ///////////////////////////////////////////////////////////////////////

        function link(scope, element) {
            element[0].focus();
        }
    }
})();
