(function () {
    'use strict';

    angular
      .module('password.mfa')
      .directive('pwCodes', pwCodes);

    function pwCodes() {
        return {
            restrict: 'E',
            controller: CodesController,
            bindToController: true,
            controllerAs: 'vm',
            scope: {
                codes: '='
            },
            templateUrl: 'mfa/codes.html'
        };

        //////////////////////////////////////////////////////////////////

        function CodesController() {
            var vm = this;

            vm.codes = vm.codes || [];

            vm.calculateMaxHeight = calculateMaxHeight;

            activate();

            //////////////////////////////////////////////////////////////

            function activate() {
            }

            function calculateMaxHeight(codes) {
                var numCodes = codes.length,
                    numCols = numCodes <= 5 ? 1 : numCodes <= 10 ? 2 : 3,
                    numCodesPerRow = Math.ceil(numCodes / numCols);

                return {
                    // the .2 here accounts for px differences in <code> and base em sizes.
                    'max-height': numCodesPerRow * 1.2 + 'em'
                };
            }
        }
    }
})();