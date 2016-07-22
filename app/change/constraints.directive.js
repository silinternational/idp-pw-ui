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
            var rules = [
                'minLength',
                'maxLength',
                'minNum',
                'minSpecial',
                'minUpper'
            ];

            rules.forEach(function addValidator(rule) {
               ngModel.$validators[rule] = validate.bind(scope, rule);
            });
        }
        
        function validate(rule, modelValue, viewValue) {
            if (isRuleEnforced(rule)) {
                return isValid(viewValue, rule);
            }

            return true;
        }
        
        function isRuleEnforced(rule) {
            return config.password &&
                   config.password.hasOwnProperty(rule);
        }
        
        function isValid(viewValue, rule) {
            return !! viewValue.match(config.password[rule].pattern);
        }
    }
})();
