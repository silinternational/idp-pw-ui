(function () {
    'use strict';

    angular
      .module('password.data')
      .factory('progressIndicatorService', progressIndicatorService);

    function progressIndicatorService($rootScope, dataService, $mdDialog) {
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
            // just in case there are any open dialogs from other views
            // that did not get closed yet.
            $rootScope.$on('$routeChangeStart', $mdDialog.hide);
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
                    templateUrl: 'data/progress-indicator.html',
                    escapeToClose: false
                });

                isIndicatorOn = true;
            } else if (apiRequests < 1 && isIndicatorOn) {
                $mdDialog.hide();

                isIndicatorOn = false;
            }
        }
    }
})();