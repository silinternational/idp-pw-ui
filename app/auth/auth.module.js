(function () {
    'use strict';

    angular
      .module('password.auth', [
          'password.data',
          'ngMaterial',
          'password.token',
          'password.nav',
          'ngRoute',
          'password.dialog'
      ]);
})();