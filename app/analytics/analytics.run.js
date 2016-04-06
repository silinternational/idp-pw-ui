(function () {
    'use strict';

    angular
        .module('password.analytics')
        .run(initialize);

        function initialize(Angularytics) {
            Angularytics.init();
        }
})();
