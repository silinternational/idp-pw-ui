(function () {
    'use strict';

    angular
      .module('password.change')
      .directive('pwStrengthMeter', pwStrengthMeter);

    function pwStrengthMeter() {
        return {
            restrict: 'E',
            controller: StrengthMeterController,
            bindToController: true,
            controllerAs: 'vm',
            scope: {
                strength: '=',
                pwInput: '='
            },
            templateUrl: 'change/strength-meter.html'
        };

        //////////////////////////////////////////////////////////////////

        function StrengthMeterController($scope) {
            var vm = this;

            vm.strength = vm.strength || {};

            activate();

            //////////////////////////////////////////////////////////////

            function activate() {
                $scope.$watch('vm.pwInput.$viewValue',
                  checkScoreApplicability);
            }

            function checkScoreApplicability() {
                // the zxcvbn library defaults a score to 0 whether or
                // or not there's anything to evaluate...having an
                // undefined for the situation where no password has been
                // entered helps with the styling.
                if (vm.pwInput.$viewValue === '') {
                    vm.strength.score = undefined;
                }
            }
        }
    }
})();
