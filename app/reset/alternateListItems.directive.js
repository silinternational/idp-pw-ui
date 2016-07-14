(function () {
    'use strict';

    angular
      .module('password.reset')
      .directive('pwAlternateListItems', pwAlternateListItems);

    function pwAlternateListItems() {
        return {
            restrict: 'E',
            scope: {
                header: '@',
                methods: '=',
                icon: '@'
            },
            controller: AlternateListItemsController,
            controllerAs: 'vm',
            bindToController: true,
            templateUrl: 'reset/alternate-list-items.html'
        };
    }

    function AlternateListItemsController($routeParams, dataService,
                                          dialogService) {
        var vm = this;

        vm.send = send;

        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
        }

        function send(method) {
            dataService
              .put('reset/' + $routeParams.resetId, method)
              .then(function sent() {
                  dialogService.verify(method.value);
              }, failedToSend);

            dialogService.progress();
        }

        function failedToSend(response) {
            dialogService
              .fail('Unable to send verification.', response.data);
        }
    }
})();
