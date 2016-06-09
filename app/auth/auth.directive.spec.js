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

        it('should provide a login link', function () {
            expect(elementUnderTest.find('button').text()).toMatch(/Login/);
        });
    });

    describe('for authenticated users, ', function () {
        beforeEach(function () {
            stubUser.idp_username = 'stubUsername';

            $httpBackend.flush();
        });

        it('should provide a logout link', function () {
            expect(elementUnderTest.find('button').text()).toMatch(/Logout/);
        });
    });
});
