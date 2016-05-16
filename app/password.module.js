(function () {
    'use strict';

    angular
      .module('password', [
          'ngMaterial',
          'ngRoute',
          /*@@DIST-TEMPLATE-CACHE*/
          //'password.analytics',
          'password.title',
          'password.fail',
          'password.progress',
          'password.nav',
          'password.welcome',
          'password.forgot',
          'password.recovery',
          'password.change',
          'password.profile',
          'password.reset'
      ]);
})();
//TODO: need to review the lcoation of these and make sure they are
// in the right lcoation...some may belong lower.