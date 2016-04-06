(function() {
    'use strict';

    angular
        .module('password.change')
        .directive('pwPasswordRequirements', pwPasswordRequirements)
        .directive('pwPasswordRequirement' , pwPasswordRequirement );

    function pwPasswordRequirements() {
        return {
            restrict : 'E',
            transclude: true,
            template: '<ul ng-transclude></ul>'
        };
    }

    function pwPasswordRequirement() {
        return {
            restrict : 'E',
            scope: {
                error: '='
            },
            transclude: true,
            template: '<li ng-class="error ? \'unmet\' : \'met\'" ' +
                      '    ng-transclude></li>'
        };
    }
})();
