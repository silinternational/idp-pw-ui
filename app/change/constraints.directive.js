(function () {
    'use strict';

    angular
      .module('password.change')
      .directive('pwConstraints', pwConstraints);

    function pwConstraints(config) {
        activate();

        return {
            restrict: 'A',
            require: 'ngModel',
            link: addValidators
        };

        //////////////////////////////////////////////////////////////////

        function activate() {
        }

        function addValidators(scope, el, attrs, ngModel) {
            if (config.password.minLength) {
                ngModel.$validators.minLength = minLength;
            }

            if (config.password.maxLength) {
                ngModel.$validators.maxLength = maxLength;
            }

            if (config.password.minNum) {
                ngModel.$validators.minNum = minNum;
            }

            if (config.password.minSpecial) {
                ngModel.$validators.minSpecial = minSpecial;
            }

            if (config.password.minUpper) {
                ngModel.$validators.minUpper = minUpper;
            }
        }

        function minLength(modelValue, viewValue) {
            return validate('minLength', viewValue);
        }

        function maxLength(modelValue, viewValue) {
            return validate('maxLength', viewValue);
        }

        function minNum(modelValue, viewValue) {
            return validate('minNum', viewValue);
        }

        function minSpecial(modelValue, viewValue) {
            return validate('minSpecial', viewValue);
        }

        function minUpper(modelValue, viewValue) {
            return validate('minUpper', viewValue);
        }

        function validate(rule, value) {
            return config.password &&
                   config.password.hasOwnProperty(rule) &&
                   new RegExp(config.password[rule].pattern).test(value);
        }
    }
})();
