(function () {
    'use strict';

    angular
      .module('password.reset')
      .controller('AlternatesController', AlternatesController);

    function AlternatesController(dataService, $routeParams,
                                  dialogService) {
        var vm = this;

        vm.phones = [];
        vm.emails = [];
        vm.super = [];
        vm.spouse = [];
        vm.primary = [];
        
        activate();

        //////////////////////////////////////////////////////////////////

        function activate() {
            dataService
              .get('reset/' + $routeParams.resetId)
              .then(retrieved, failedToRetrieve);
        }

        function retrieved(response) {
            response.data.methods.forEach(function (method) {
                switch (method.type) {
                    case 'primary'   : vm.primary.push(method); break;
                    case 'phone'     : vm.phones.push(method) ; break;
                    case 'spouse'    : vm.spouse.push(method) ; break;
                    case 'supervisor': vm.super.push(method)  ; break;
                    default          : vm.emails.push(method) ;
                }
            });
        }

        function failedToRetrieve(response) {
            dialogService
              .fail('Unable to retrieve alternate methods.',
                    response.data);
        }
    }
})();
