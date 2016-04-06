# idp-pw-ui

## Required tools

1.  [node](https://nodejs.org) Downloads at https://nodejs.org/download
2.  [bower](http://bower.io) `npm install -g bower`
3.  [grunt](http://gruntjs.com) `npm install -g grunt-cli`

## Setup

1.  `git clone https://github.com/silinternational/idp-pw-ui` to get the project.
2.  `npm install` to install the build plugins. _(`bower install` will run automatically to install the app dependencies)_
3.  In order to fully run the app, the API needs to be available. _(see [API repo](https://github.com/silinternational/idp-pw-api) for local setup instructions)_
4.  `grunt targetEnv:[dev|staging|prod]` must be run to configure certain environment variables before running the tests or the app. This enables th app to easily run on different target environments by using a single command to swap configurations.  
5.  `grunt test:app` to ensure everything is going to work.
6.  `grunt serve` will open your browser to the running app. _(`grunt serve:dist` if you'd like to run the app against an optimized, distributable version of the app)_

>###Quickstart note
>`grunt` by itself will configure the env for dev, run the app tests and start the app in a browser effectively running steps 4-6 for you.

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

## Issues

TODO: Add JIRA project

## Feedback collector

TODO: Add JIRA project
