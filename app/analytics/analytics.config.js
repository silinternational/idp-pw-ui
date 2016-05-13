(function () {
    'use strict';

    angular
      .module('password.analytics')
      .config(configure);

    function configure(AngularyticsProvider) {
        AngularyticsProvider.setEventHandlers(['GoogleUniversal']);
    }
})();
