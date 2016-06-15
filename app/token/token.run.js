(function () {
    'use strict';

    angular
      .module('password.token')
      .run(grabToken);

    function grabToken($location, tokenService) {
        tokenService.setApiToken($location.search().access_token);

        cleanUrl();

        //////////////////////////////////////////////////////////////////
        
        function cleanUrl() {
            $location.search('');
        }
    }

})();
