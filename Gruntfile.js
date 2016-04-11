'use strict';

module.exports = function (grunt) {
    grunt.registerTask('default', [
        'init',
        'test:app',
        'serve'
    ]);

    grunt.registerTask('test', 'tests the app in different states, e.g., app or dist forms', function (appState) {
        grunt.task.run('jshint:testFiles');
        grunt.task.run('karma' + (appState ? ':' + appState : ''));
    });

    grunt.registerTask('dist', [
        'clean',
        'init',
        'wiredep',
        'jshint:appFiles',
        'useminPrepare',
        'html2js',
        'concat:generated',
        'replace:templateCache',
        'concat:templateCache',
        'ngAnnotate',
        'uglify',
        'cssmin',
        'copy',
        'imagemin',
        'filerev',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['dist', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'wiredep',
            'connect:livereload',
            'watch'
        ]);
    });

    var appConfig = {
        app: {
            root: 'app',
            files: {
                css: [
                    '<%= passwordConfig.app.root %>/*.css',
                    '<%= passwordConfig.app.root %>/!(bower_components)/**/*.css'
                ],
                html: {
                    all: [
                        '<%= passwordConfig.app.root %>/*.html',
                        '<%= passwordConfig.app.files.html.views %>'
                    ],
                    views: '<%= passwordConfig.app.root %>/!(bower_components)/**/*.html'
                },
                images: {
                    full: '<%= passwordConfig.app.root %>/images/**/*.{png,svg}',
                    relative: [
                        '*.ico',
                        'images/**/*.{png,svg}'
                    ]
                },
                index: '<%= passwordConfig.app.root %>/index.html',
                js: {
                    all: [
                        '<%= passwordConfig.app.root %>/*.js',
                        '<%= passwordConfig.app.root %>/!(bower_components)/**/*.js'
                    ],
                    modules: [
                        '<%= passwordConfig.app.root %>/*.module.js',
                        '<%= passwordConfig.app.root %>/!(bower_components)/**/*.module.js'
                    ],
                    deps: [
                        '<%= passwordConfig.app.root %>/bower_components/angular/angular.js',
                        '<%= passwordConfig.app.root %>/bower_components/angular-route/angular-route.js',
                        '<%= passwordConfig.app.root %>/bower_components/angular-material/angular-material.js',
                        '<%= passwordConfig.app.root %>/bower_components/angular-animate/angular-animate.js',
                        '<%= passwordConfig.app.root %>/bower_components/angular-aria/angular-aria.js',
                        '<%= passwordConfig.app.root %>/bower_components/angular-messages/angular-messages.js',
                        '<%= passwordConfig.app.root %>/bower_components/angularytics/dist/angularytics.min.js'
                    ],
                    mocks: [
                        '<%= passwordConfig.app.root %>/bower_components/angular-mocks/angular-mocks.js',
                        '<%= passwordConfig.app.root %>/bower_components/angular-material/angular-material-mocks.js'
                    ]
                },
                spec: [
                    '<%= passwordConfig.app.root %>/*.spec.js',
                    '<%= passwordConfig.app.root %>/!(bower_components)/**/*.spec.js'
                ]
            }
        },
        dist: {
            root: 'dist',
            dirs: {
                images: '<%= passwordConfig.dist.root %>/images'
            },
            files: {
                css: '<%= passwordConfig.dist.root %>/styles/*.css',
                images: {
                    full: [
                        '<%= passwordConfig.dist.root %>/*.ico',
                        '<%= passwordConfig.dist.root %>/images/**/*.{png,svg}'
                    ],
                    relative: [
                        '*.ico',
                        '**/*.{png,svg}'
                    ]
                },
                index: '<%= passwordConfig.dist.root %>/index.html',
                js: {
                    all: '<%= passwordConfig.dist.root %>/scripts/*.js',
                    app: '<%= passwordConfig.dist.root %>/scripts/password.*.js',
                    lib: '<%= passwordConfig.dist.root %>/scripts/lib.*.js'
                }
            }
        },
        tmp: {
            root: '.tmp',
            dirs: {
                specs: '<%= passwordConfig.tmp.root %>/specs',
                scripts: '<%= passwordConfig.tmp.root %>/concat/scripts'
            },
            files: {
                app: '<%= passwordConfig.tmp.dirs.scripts %>/password.js',
                templateCache: '<%= passwordConfig.tmp.dirs.scripts %>/templates.js'
            }
        },
        htmlminOptions: {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
            removeAttributeQuotes: true,
            removeComments: true,
            removeCommentsFromCDATA: true,
            removeEmptyAttributes: true,
            removeIgnored: true,
            removeOptionalTags: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
        },
        templateCache: {
            module: 'password.templates'
        }
    };

    grunt.registerTask('init', 'ensure theme-specific files are in place', function () {
        if (! grunt.file.exists(appConfig.app.root + '/favicon.ico')) {
            grunt.file.copy(appConfig.app.root + '/favicon.default.ico',
              appConfig.app.root + '/favicon.ico');
        }

        if (! grunt.file.exists(appConfig.app.root + '/images/logo.png')) {
            grunt.file.copy(appConfig.app.root + '/images/logo.default.png',
              appConfig.app.root + '/images/logo.png');
        }

        if (! grunt.file.exists(appConfig.app.root + '/password.env.js')) {
            grunt.file.copy(appConfig.app.root + '/password.env.default.js',
              appConfig.app.root + '/password.env.js');
        }

        if (! grunt.file.exists(appConfig.app.root + '/password.config.theme.js')) {
            grunt.file.copy(appConfig.app.root + '/password.config.theme.default.js',
              appConfig.app.root + '/password.config.theme.js');
        }
    });

    require('load-grunt-tasks')(grunt);

    require('time-grunt')(grunt);

    grunt.initConfig({
        passwordConfig: appConfig,

        replace: {
            templateCache: {
                src: appConfig.tmp.files.app,
                options: {
                    patterns: [{
                        match: /\/\*@@DIST-TEMPLATE-CACHE\*\//,
                        replacement: '\'' + appConfig.templateCache.module + '\','
                    }]
                },
                dest: appConfig.tmp.files.app
            }
        },

        watch: {
            js: {
                files: appConfig.app.files.js.all,
                tasks: ['newer:jshint:appFiles'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            test: {
                files: appConfig.app.files.spec,
                tasks: ['newer:jshint:testFiles', 'test:app']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    appConfig.app.files.html.all,
                    appConfig.app.files.css,
                    appConfig.app.files.images.full
                ]
            }
        },

        connect: {
            options: {
                port: 9000,
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    base: appConfig.app.root
                }
            },
            dist: {
                options: {
                    open: true,
                    base: appConfig.dist.root
                }
            }
        },

        jshint: {
            options: {
                jshintrc: true,
                reporter: require('jshint-stylish')
            },
            appFiles: [
                'Gruntfile.js',
                appConfig.app.files.js.all
            ],
            testFiles: {
                src: appConfig.app.files.spec
            }
        },

        clean: {
            tmp: appConfig.tmp.root,
            dist: appConfig.dist.root
        },

        wiredep: {
            index: {
                src: appConfig.app.files.index
            }
        },

        copy: {
            html: {
                src: appConfig.app.files.index,
                dest: appConfig.dist.files.index
            },
            images: {
                files: [{
                    expand: true,
                    cwd: appConfig.app.root,
                    src: appConfig.app.files.images.relative,
                    dest: appConfig.dist.root
                }]
            }
        },

        useminPrepare: {
            html: appConfig.app.files.index,
            options: {
                dest: appConfig.dist.root
            }
        },

        html2js: {
            templateCache: {
                options: {
                    base: appConfig.app.root,
                    htmlmin: appConfig.htmlminOptions,
                    module: appConfig.templateCache.module,
                    singleModule: true,
                    useStrict: true,
                    quoteChar: '\''
                },
                src: appConfig.app.files.html.views,
                dest: appConfig.tmp.files.templateCache
            }
        },

        concat: {
            templateCache: {
                src: [
                    appConfig.tmp.files.app,
                    appConfig.tmp.files.templateCache
                ],
                dest: appConfig.tmp.files.app
            }
        },

        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            dist: {
                src: appConfig.tmp.files.app,
                dest: appConfig.tmp.files.app
            }
        },

        filerev: {
            dist: {
                src: [
                    appConfig.dist.files.js.all,
                    appConfig.dist.files.css,
                    appConfig.dist.files.images.full
                ]
            }
        },

        usemin: {
            html: appConfig.dist.files.index,
            js: appConfig.dist.files.js.app,
            css: appConfig.dist.files.css,
            options: {
                assetsDirs: appConfig.dist.root,
                patterns: {
                    js: [[
                        /["'=](\S+\.(?:svg|png)).?['"]?/g,
                        'Update new img filenames (within js files)'
                    ]]
                }
            }
        },

        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: appConfig.dist.dirs.images,
                    src: appConfig.dist.files.images.relative,
                    dest: appConfig.dist.dirs.images
                }]
            }
        },

        htmlmin: {
            dist: {
                src: appConfig.dist.files.index,
                options: appConfig.htmlminOptions,
                dest: appConfig.dist.files.index
            }
        },

        karma: {
            options: {
                singleRun: true, // set to false to debug in browser
                frameworks: ['jasmine'],
                browsers: [
                    'Chrome',
                    'Firefox',
                    'PhantomJS'
                ],
                plugins: [
                    'karma-jasmine',
                    'karma-chrome-launcher',
                    'karma-firefox-launcher',
                    'karma-phantomjs-launcher',
                    'karma-ng-html2js-preprocessor'
                ]
            },
            app: {
                preprocessors: {
                    '**/*.html': ['ng-html2js']
                },
                ngHtml2JsPreprocessor: {
                    stripPrefix: appConfig.app.root + '/',
                    moduleName: appConfig.templateCache.module
                },
                files: [{
                    src: [
                        appConfig.app.files.js.deps,
                        appConfig.app.files.js.mocks,
                        appConfig.app.files.js.modules,
                        appConfig.app.files.js.all,
                        appConfig.app.files.html.views // needed for html2js
                    ]
                }]
            },
            dist: {
                files: [{
                    src: [
                        appConfig.dist.files.js.lib,
                        appConfig.dist.files.js.app,
                        appConfig.app.files.js.mocks,
                        appConfig.app.files.spec
                    ]
                }]
            }
        }
    });
};
