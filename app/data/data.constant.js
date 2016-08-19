(function () {
    'use strict';

    angular
      .module('password.data')
      .constant('DATA_API_BASE_URL', window.passwordEnv.apiBaseUrl)
      .constant('DATA_API_WITH_CREDENTIALS',
                angular.isDefined(window.passwordEnv.apiWithCredentials) ?
                  window.passwordEnv.apiWithCredentials : true);
})();
