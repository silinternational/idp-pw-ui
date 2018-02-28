(function () {
    'use strict';

    angular
      .module('password.dialog', [
          'ngMaterial',
          'ngRoute',
          'ngMessages',
          'password.verification',
          'password.data',
          'password.title'
      ]);
})();
