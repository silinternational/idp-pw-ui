'use strict';

describe('autofocus directive', function () {
    beforeEach(function () {
        module('password.html');
    });

    it('should activate it\'s host element', inject(function ($compile, $rootScope) {
        var linkedElement = $compile('<input autofocus />')($rootScope);

        $rootScope.$digest();

        expect(linkedElement[0].autofocus).toBeTruthy();
        // TODO: would like to find a better assertion.  Unfortunately document.activeElement was returning the
        // <body> of the testRunner
    }));
});
