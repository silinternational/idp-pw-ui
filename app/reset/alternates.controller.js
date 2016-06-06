(function () {
    'use strict';

    angular
      .module('password.reset')
      .controller('AlternatesController', AlternatesController);

    function AlternatesController(dataService, $routeParams,
                                  dialogService, configService) {
        var vm = this;

        vm.allMethods = [];
        vm.phones = [];
        vm.emails = [];
        vm.super = [];
        vm.spouse = [];
        vm.primary = [];

        vm.getHelp = getHelp;
        
        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
            dataService
              .get('reset/' + $routeParams.resetId)
              .then(retrievedMethods, failedToRetrieveMethods);
        }

        function retrievedMethods(response) {
            vm.allMethods = response.data.methods;

            vm.allMethods.forEach(function (method) {
                switch (method.type) {
                    case 'primary'   : vm.primary.push(method); break;
                    case 'phone'     : vm.phones.push(method) ; break;
                    case 'spouse'    : vm.spouse.push(method) ; break;
                    case 'supervisor': vm.super.push(method)  ; break;
                    default          : vm.emails.push(method) ;
                }
            });
        }

        function failedToRetrieveMethods(response) {
            dialogService
              .fail('Unable to retrieve alternate methods.',
                    response.data);
        }

        function getHelp() {
            dialogService
              .help(configService.config.support);
        }
    }
})();
