(function () {
    'use strict';

    angular
      .module('password.progress')
      .factory('progressIndicatorService', progressIndicatorService);

    function progressIndicatorService(dataService, $mdDialog) {
        var apiRequests = 0,
            isIndicatorOn = false,
            service = {
                queue: queue,
                dequeue: dequeue
            };

        activate();

        return service;

        //////////////////////////////////////////////////////////////////

        function activate() {
        }

        function queue(url) {
            if (isApiCall(url)) {
                apiRequests++;

                manageIndicator();
            }
        }

        function dequeue(url) {
            if (isApiCall(url)) {
                apiRequests--;

                manageIndicator();
            }
        }

        function isApiCall(url) {
            return url.indexOf(dataService.baseUrl()) !== -1;
        }

        function manageIndicator() {
            if (apiRequests > 0 && !isIndicatorOn) {
                $mdDialog.show({
                    templateUrl: 'progress/progress-indicator.html',
                    escapeToClose: false
                });

                isIndicatorOn = true;
            } else if (apiRequests < 1) {
                $mdDialog.hide();

                isIndicatorOn = false;
            }
        }
    }
})();