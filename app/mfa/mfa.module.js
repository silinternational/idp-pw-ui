(function () {
    'use strict';

    angular
      .module('password.mfa', [
          'ngMaterial',
          'ngRoute',
          'password.data',
          'password.dialog',
          'password.html'
      ]);
})();
