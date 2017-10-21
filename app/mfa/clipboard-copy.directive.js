(function () {
    'use strict';

    angular
      .module('password.mfa')
      .directive('pwClipboardCopy', pwClipboardCopy);

    function pwClipboardCopy(dialogService) {
        return {
            restrict: 'A',
            link: function (scope, el, attrs) {
                var textarea = document.createElement('textarea');

                textarea.style.position = 'absolute';
                textarea.style.right = '100%';
                el.append(textarea);

                attrs.$observe('pwClipboardCopy', function(value) {
                    textarea.value = value;
                });

                el.on('click', function() {
                    textarea.select();
                    document.execCommand('copy');
                    dialogService.info('Copied!');
                })
            }
        };
    }
})();
