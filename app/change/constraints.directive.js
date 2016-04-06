(function() {
    'use strict';

    angular
        .module('password.change')
        .directive('pwConstraints', pwConstraints);

    function pwConstraints() {
        return {
            restrict : 'A',
            require: 'ngModel',
            link: addValidators
        };

        ///////////////////////////////////////////////////////////////////////

        function addValidators() {
        }
    }
})();
