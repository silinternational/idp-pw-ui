(function () {
    'use strict';

    angular
      .module('password.change')
      .directive('pwStrengthWord', pwStrengthWord);

    function pwStrengthWord() {
        return {
            restrict: 'E',
            controller: StrengthWordController,
            bindToController: true,
            controllerAs: 'vm',
            scope: {
                score: '='
            },
            templateUrl: 'change/strength-word.html'
        };

        //////////////////////////////////////////////////////////////////

        function StrengthWordController($scope) {
            var vm = this;

            vm.strengthWord = 'N/A';
            
            activate();

            //////////////////////////////////////////////////////////////

            function activate() {
                $scope.$watch('vm.score', deriveStrengthWord);
            }

            function deriveStrengthWord() {
                switch (vm.score) {
                    case 4:
                        vm.strengthWord = 'Excellent';
                        break;
                    case 3:
                        vm.strengthWord = 'Very strong';
                        break;
                    case 2:
                        vm.strengthWord = 'Moderate';
                        break;
                    case 1:
                        vm.strengthWord = 'Very guessable';
                        break;
                    case 0:
                        vm.strengthWord = 'Too guessable';
                        break;
                    default:
                        vm.strengthWord = 'N/A';
                }
            }
        }
    }
})();
