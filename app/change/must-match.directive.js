(function() {
    'use strict';

    angular
        .module('password.change')
        .directive('pwMustMatch', pwMustMatch);

    function pwMustMatch() {
        return {
            restrict : 'A',
            require: 'ngModel',
            scope: {
                otherPw: '@pwMustMatch'
            },
            link: addValidator
        };

        //////////////////////////////////////////////////////////////////

        function addValidator(scope, el, attrs, ngModelController) {
            ngModelController.$validators.match = areEqual;

            //////////////////////////////////////////////////////////////

            function areEqual(modelValue, viewValue) {
                return viewValue === scope.otherPw;
            }
        }
    }
})();
