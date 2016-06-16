'use strict';

describe('user service', function () {
    var serviceUnderTest,
        $httpBackend,
        stubUserData = {};

    beforeEach(function () {
        module('password.auth');

        inject(function ($injector) {
            serviceUnderTest = $injector.get('userService');
            $httpBackend = $injector.get('$httpBackend');
        });

        $httpBackend.expectGET(/user\/me/).respond(stubUserData);
        $httpBackend.expectGET(/data\/progress-indicator.html/).respond(200);
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
    });

    it('should attach all properties of received data to user object'/*, function () {
        stubUserData.abc = 123;

        $httpBackend.flush();

        expect(serviceUnderTest.user.abc).toBe(123);
    }*/);

    it('should attach convenience API for authentication status to user object'/*, function () {
        expect(serviceUnderTest.user.isAuthenticated).toBeUndefined();

        $httpBackend.flush();

        expect(serviceUnderTest.user.isAuthenticated).toBeDefined();
    }*/);

    it('should base authentication status on an idp_username property'/*, function () {
        expect(serviceUnderTest.user.isAuthenticated).toBeFalsy();

        stubUserData.idp_username = 123;

        $httpBackend.flush();

        expect(serviceUnderTest.user.isAuthenticated).toBeTruthy();
    }*/);

    it('should use cache upon subsequent calls'/*, function () {
        stubUserData.abc = 123;

        $httpBackend.flush();

        expect(serviceUnderTest.user.abc).toBe(123);

        stubUserData.abc = 456;

        serviceUnderTest.getUser();
    }*/);

    it('should provide API to logout'); //TODO:

    it('should provide API to login'); //TODO:
});
