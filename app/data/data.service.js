(function () {
    'use strict';

    angular
      .module('password.data')
      .factory('dataService', dataService);

    function dataService($http, DATA_API_BASE_URL, tokenService) {
        var service = {
            get: get,
            put: put,
            post: post,
            delete: remove,
            baseUrl: baseUrl
        };

        activate();

        return service;

        //////////////////////////////////////////////////////////////////

        function activate() {
        }

        function get(url) {
            return $http.get(buildFullyQualifiedUrl(url),
                             getConfig());
        }

        function put(url, data) {
            return $http.put(buildFullyQualifiedUrl(url),
                             data,
                             getConfig());
        }

        function post(url, data) {
            return $http.post(buildFullyQualifiedUrl(url),
                              data,
                              getConfig());
        }

        function remove(url) {
            return $http.delete(buildFullyQualifiedUrl(url),
                                getConfig());
        }

        function baseUrl() {
            return DATA_API_BASE_URL;
        }

        function getConfig() {
            return {
                headers: {
                    Authorization: 'Bearer ' + tokenService.getToken()
                }
            };
        }

        function buildFullyQualifiedUrl(url) {
            if (isNotFullyQualifiedAlready(url)) {
                return DATA_API_BASE_URL + url;
            }

            return url;
        }

        function isNotFullyQualifiedAlready(url) {
            return url.indexOf('//') === -1;
        }
    }
})();
