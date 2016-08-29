exports.config = {
    specs: ['tests/*.spec.js'],
    multiCapabilities: [
        {
            browserName: 'firefox'
        },
        {
            browserName: 'chrome',
            platform: 'OS X 10.11',
            version: 'latest'
        }
    ],
    sauceUser: process.env.SAUCE_USERNAME,
    sauceKey: process.env.SAUCE_ACCESS_KEY
};