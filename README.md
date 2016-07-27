# idp-pw-ui

## Required tools

1.  [node](https://nodejs.org) Downloads at https://nodejs.org/download
2.  [bower](http://bower.io) `npm install -g bower`
3.  [grunt](http://gruntjs.com) `npm install -g grunt-cli`

## Setup

1.  `git clone https://github.com/silinternational/idp-pw-ui` to get the project.
2.  `npm install` to install the build plugins. _(`bower install` will run automatically to install the app dependencies)_
3.  In order to fully run the app, the API needs to be available. _(see [API repo](https://github.com/silinternational/idp-pw-api) for local setup instructions)_
4.  `grunt` will open your browser to a default version of the running app. _(`grunt serve:dist` if you'd like to run the app against an optimized, distributable version of the app)_

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

There are 2 test targets:

1.  `app` for the working copy of the application
2.  `dist` for the optimized distributable

### One-time runs

Running `grunt test` will run both.

Running `grunt test:app` will just run the app

Running `grunt test:dist` will just run the dist copy

### Continuous testing or Debugging

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
