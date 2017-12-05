(function () {
    'use strict';

    angular
      .module('password.mfa')
      .directive('pwClipboardCopy', pwClipboardCopy);

    function pwClipboardCopy(dialogService) {
        return {
            restrict: 'A',
            link: function (scope, button, attrs) {
                var textarea = createTextareaOutOfSight(button);

                attrs.$observe('pwClipboardCopy', insertCodes(textarea));

                button.on('click', copyCodesToClipboard(textarea));
            }
        };

        function createTextareaOutOfSight(button) {
            var textarea = document.createElement('textarea');

            textarea.style.position = 'absolute';
            textarea.style.right = '100%';

            button.append(textarea);

            return textarea;
        }

        function insertCodes(textarea) {
            return function(value) {
                textarea.value = value;
            };
        }

        function copyCodesToClipboard(textarea) {
            return function() {
                textarea.select();

                document.execCommand('copy');

                dialogService.info('Your codes have now been copied to your clipboard.');
            };
        }
    }
})();
