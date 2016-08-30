describe('Profile', function() {
    beforeEach(function() {
        browser.get('http://frontend-mock:9000/#/profile');
    });

    it('should have a title', function() {
        expect(browser.getTitle()).toContain('Profile');
    });
});