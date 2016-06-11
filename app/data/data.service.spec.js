'use strict';

describe('data service', function () {
    var $httpBackend,
        serviceUnderTest,
        stubApiHost = '//stub.api.server/';

    beforeEach(function () {
        module('password.data');

        module(function ($provide) {
            // since this constant will change for each development env, might as
            // well mock it.
            $provide.constant('DATA_API_BASE_URL', stubApiHost);
        });

        inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
            serviceUnderTest = $injector.get('dataService');
        });
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
    });

    it('should supply a base url', function () {
        expect(serviceUnderTest.baseUrl()).toBe(stubApiHost);
    });

    it('should handle fully qualified GET\'s properly', function () {
        $httpBackend.expectGET('http://stub/api/call').respond();

        serviceUnderTest.get('http://stub/api/call');

        $httpBackend.flush();
    });

    it('should handle relative GET\'s properly', function () {
        $httpBackend.expectGET(stubApiHost + 'api/call').respond();
        $httpBackend.expectGET(/data\/progress-indicator.html/).respond(200);

        serviceUnderTest.get('api/call');

        $httpBackend.flush();
    });
});
