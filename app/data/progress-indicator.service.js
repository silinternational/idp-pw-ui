(function () {
    'use strict';

    angular
      .module('password.data')
      .factory('progressIndicatorService', progressIndicatorService);

    function progressIndicatorService(dataService, $mdDialog) {
        var apiRequests = [],
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
                if (apiRequests.length === 0) {
                    $mdDialog.show({
                        templateUrl: 'data/progress-indicator.html',
                        escapeToClose: false
                    });
                }

                apiRequests.push(url);
            }
        }

        function dequeue(url) {
            if (isApiCall(url)) {
                apiRequests.pop();

                if (apiRequests.length === 0) {
                    $mdDialog.hide();
                }
            }
        }

        function isApiCall(url) {
            return url.indexOf(dataService.baseUrl()) !== -1;
        }
    }
})();