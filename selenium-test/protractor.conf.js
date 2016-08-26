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
    sauceUser: 'fillup',
    sauceKey: 'afd825cd-e866-47c4-8d11-f915ee9ff635'
};