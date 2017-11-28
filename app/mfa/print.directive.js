(function () {
    'use strict';

    angular
      .module('password.mfa')
      .directive('pwPrint', pwPrint);

    function pwPrint($window) {
        return {
            restrict: 'A',
            link: function (scope, button, attrs) {
                var selector = attrs.pwPrint;

                var elementToPrint = document.querySelector(selector);
                elementToPrint.classList.add('pw-print');

                button.on('click', print);
            }
        };

        function print() {
            $window.print();
        }
    }
})();
