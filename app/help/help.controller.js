(function () {
    'use strict';

    angular
      .module('password.help')
      .controller('HelpController', HelpController);

    function HelpController(config, $window, $location, $scope) {
        var vm = this;

        vm.config = config;
        vm.selectedTab = 0;
        vm.history = $window.history;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
            $scope.$on('$viewContentLoaded', checkForRequestedSection);
        }

        function checkForRequestedSection() {
            // NodeList.forEach won't work on IE11
            var tabs = Array.prototype.slice.call(document.querySelectorAll('md-tab'));

            tabs.forEach(function (tab, i) {
                if (tab.id === $location.hash()) {
                    vm.selectedTab = i;
                }
            });
        }
    }
})();
