(function () {
    'use strict';

    angular
        .module('password.data')
        .factory('dataService', dataService);

    function dataService($http, DATA_API_BASE_URL) {
        var service = {
                get: get,
                baseUrl: baseUrl
            };

        activate();

        return service;

        ///////////////////////////////////////////////////////////////////////

        function activate() {
        }

        function buildFullyQualifiedUrl(url) {
            if (url.indexOf('//') === -1) {
                return DATA_API_BASE_URL + url;
            }

            return url;
        }


        function get(url) {
            return $http.get(buildFullyQualifiedUrl(url));
        }

        function baseUrl() {
            return DATA_API_BASE_URL;
        }
    }
})();
