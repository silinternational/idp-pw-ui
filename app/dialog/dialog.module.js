(function () {
    'use strict';

    angular
      .module('password.dialog', [
          'ngMaterial',
          'ngRoute',
          'password.verification',
          'password.data'
      ]);
})();
