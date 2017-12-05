(function () {
    'use strict';

    angular
      .module('password.profile', [
          'ngMaterial',
          'ngRoute',
          'password.auth',
          'password.data',
          'password.dialog',
          'password.html',
          'password.mfa'
      ]);
})();
