(function () {
    'use strict';

    angular
      .module('password.profile', [
          'ngMaterial',
          'ngRoute',
          'ngMessages',
          'password.auth',
          'password.data', 
          'password.dialog'
      ]);
})();
