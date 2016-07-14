(function () {
    'use strict';

    angular
      .module('password.reset', [
          'ngMaterial',
          'ngRoute',
          'ngMessages',
          'password.data',
          'password.dialog',
          'password.html',
          'password.verification'
      ]);
})();
