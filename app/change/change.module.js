(function () {
    'use strict';

    angular
      .module('password.change', [
          'ngMaterial',
          'ngRoute',
          'ngMessages',
          'password.html',
          'zxcvbn',
          'password.data',
          'password.auth',
          'password.button',
          'password.fail'
      ]);
})();
