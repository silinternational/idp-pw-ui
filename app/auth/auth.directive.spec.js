'use strict';

describe('auth directive', function () {
    var stubUser = {},
        $httpBackend,
        elementUnderTest;

    beforeEach(function () {
        module('password.auth');
        module('password.templates');

        inject(function ($injector, userService, $compile, $rootScope) {
            $httpBackend = $injector.get('$httpBackend');

            $httpBackend.whenGET(/user\/me/).respond(stubUser);
            userService.getUser();

            $httpBackend.whenGET(/images/).respond('<svg></svg>'); // mocks md-icon svg request

            elementUnderTest = $compile('<pw-auth></pw-auth>')($rootScope);
        });
    });

    describe('for guests, ', function () {
        beforeEach(function () {
            $httpBackend.flush();
        });

        it('no name should be shown', function () {
            expect(elementUnderTest.find('h1').text()).toBe(' ');
        });

        it('should provide a login link', function () {
            expect(elementUnderTest.find('button').text()).toMatch(/Login/);
        });
    });

    describe('for authenticated users, ', function () {
        beforeEach(function () {
            stubUser.idp_username = 'stubUsername';
            stubUser.first_name = 'stubFirst';
            stubUser.last_name = 'stubLast';

            $httpBackend.flush();
        });

        it('should should show user\'s name', function () {
            expect(elementUnderTest.find('h1').text()).toBe('stubFirst stubLast');
        });

        it('should provide a logout link', function () {
            expect(elementUnderTest.find('button').text()).toMatch(/Logout/);
        });
    });
});
