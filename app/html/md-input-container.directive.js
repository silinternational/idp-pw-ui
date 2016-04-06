(function () {
    'use strict';

    angular
      .module('password.html')
      .directive('mdInputContainer', mdInputContainer);

    /*  Some users were clicking just outside md's input and confused why
        they couldn't type...so this will simply add a click listener to
        a little wider area, i.e., md's input container area, and kick off
        the same event as if the user had clicked inside the input.
     */
    function mdInputContainer() {
        return {
            restrict: 'E',
            require: 'mdInputContainer',
            link: link
        };

        //////////////////////////////////////////////////////////////////

        function link(scope, element, attrs, mdInputContainerCtrl) {
            element.on('click', function () {
                mdInputContainerCtrl.delegateClick();
            });
        }
    }
})();