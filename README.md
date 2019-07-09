# idp-pw-ui

---

## NOTE: This repo is no longer maintained. ##

See https://github.com/silinternational/idp-profile-ui as a replacement

---

## Required tools

### Development mode

1.  [node](https://nodejs.org) Downloads at https://nodejs.org/download
2.  [bower](http://bower.io) `npm install -g bower`
3.  [grunt](http://gruntjs.com) `npm install -g grunt-cli`

### Run-only mode

1.  Install [Docker](https://www.docker.com/products/overview) ([mac](https://download.docker.com/mac/stable/Docker.dmg), [windows](https://download.docker.com/win/stable/InstallDocker.msi))
2.  Install [Docker Compose](https://docs.docker.com/compose/install)

## Setup

This project relies on an API.  You may run your own, see https://github.com/silinternational/idp-pw-api or you can run a mock backend.  Use `grunt backend` or `grunt backend:mock` to switch between backends.  The `mock-server` container must be running to get responses back from mock API calls.

### Development mode

1.  `git clone https://github.com/silinternational/idp-pw-ui` to get the project.
2.  `npm install` to install the build plugins. _(`bower install` will run automatically to install the app dependencies)_
3.  In order to fully run the app, the API needs to be available. _(see [API repo](https://github.com/silinternational/idp-pw-api) for local setup instructions)_
4.  `grunt` will open your browser to a default version of the running app. _(`grunt serve:dist` if you'd like to run the app against an optimized, distributable version of the app)_

### Run-only mode

1.  `git clone https://github.com/silinternational/idp-pw-ui` to get the project.
2.  `mock-server` needs an alias to localhost in your `/etc/hosts`, e.g., `0.0.0.0   mock-server`.
3.  `docker-compose up -d [frontend | frontend-mock mock-server]` depending upon which backend you want.
4.  App will be running on http://localhost:9000

## Customization
This application has a default vendor theme but can easily be changed by replacing the following files **prior** to a build:
    
    1.  favicon.ico
    2.  images/logo.png
    3.  password.env.js
    4.  password.config.theme.js

## Images/Icons

*   Images are served from `app\images` with a preference for SVG's.
*   Icons can be found on
[GitHub](https://github.com/google/material-design-icons).
*   `bower install material-design-icons` will pull them down locally but
please don't save them into the `bower.json` file as it slows the builds down
too much.
*   Just copy the image you want into the `images` folder in the "appropriate"
location.

## Testing

### Unit testing

There are 2 test targets:

1.  `app` for the working copy of the application
2.  `dist` for the optimized distributable

#### One-time runs

Running `grunt test` will run both.

Running `grunt test:app` will just run the app

Running `grunt test:dist` will just run the dist copy

#### Continuous testing or Debugging

In order to keep your test running while you're working on them or to debug,
the `singleRun` configuration needs to be temporarily set to `false` within
the `Gruntfile`.

```javascript
...
karma: {
    options: {
        singleRun: true, // set to false to debug in browser
...
```

### Functional testing

Functional tests have been written and are configured to run in a [SauceLabs](https://saucelabs.com) environment.
1.  Configure the appropriate values in the `local.env` file.
2.  `docker-compose up -d frontend-mock mock-server`.
3.  `docker-compose up selenium`.