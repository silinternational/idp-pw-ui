(function () {
    'use strict';

    angular
      .module('password.help')
      .controller('HelpController', HelpController);

    function HelpController(config, $window, $location) {
        var vm = this;

        vm.config = config;
        vm.selectedTab = 0;
        vm.history = $window.history;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
            checkForRequestedSection();
        }

        function checkForRequestedSection() {
            document
                .querySelectorAll('md-tab')
                .forEach(function (tab, i) {
                    if (tab.id === $location.hash()) {
                        vm.selectedTab = i;
                    }
                });
        }
    }
})();
