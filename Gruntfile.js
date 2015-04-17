var LIVERELOAD_PORT = 35729;
var SERVER_PORT = 9000;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
    'use strict';

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt, {pattern: ['grunt-*', 'gruntify-*', '@*/grunt-*']});

    var config = {
        app: 'app',
        dist: 'dist'
    };

    grunt.initConfig({
        config: config,
        watch: {
            options: {
                nospawn: true,
                livereload: true
            },
            compass: {
                files: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass']
            },
            livereload: {
                options: {
                    livereload: grunt.option('livereloadport') || LIVERELOAD_PORT
                },
                files: [
                    '<%= config.app %>/*.html',
                    '{.tmp,<%= config.app %>}/styles/{,*/}*.css',
                    '{.tmp,<%= config.app %>}/scripts/{,*/}*.js',
                    '<%= config.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                    'test/spec/{,*/}*.js'
                ]
            },
            test: {
                files: ['<%= config.app %>/scripts/{,*/}*.js', 'test/spec/{,*/}*.js'],
                tasks: ['test:true']
            }
        },
        connect: {
            options: {
                port: grunt.option('port') || SERVER_PORT,
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, config.app)
                        ];
                    }
                }
            },
            test: {
                options: {
                    port: 9001,
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'test'),
                            mountFolder(connect, config.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, config.dist)
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            },
            test: {
                path: 'http://localhost:<%= connect.test.options.port %>'
            }
        },
        clean: {
            dist: ['.tmp', '<%= config.dist %>/*'],
            server: '.tmp'
        },
        eslint: {
            options: {
                config: '.eslint.json'
            },
            all: [
                'Gruntfile.js',
                '<%= config.app %>/scripts/**/*.js',
                'test/spec/{,*/}*.js'
            ]
        },
        mocha: {
            all: {
                options: {
                    log: true,
                    reporter: 'Spec',
                    run: false,
                    timeout: 10000,
                    urls: ['http://localhost:<%= connect.test.options.port %>/index.html']
                }
            }
        },
        compass: {
            options: {
                sassDir: '<%= config.app %>/styles',
                cssDir: '.tmp/styles',
                imagesDir: '<%= config.app %>/images',
                javascriptsDir: '<%= config.app %>/scripts',
                fontsDir: '<%= config.app %>/styles/fonts',
                importPath: '<%= config.app %>/bower_components',
                relativeAssets: true
            },
            dist: {},
            server: {
                options: {
                    debugInfo: true
                }
            }
        },
        requirejs: {
            dist: {
                options: {
                    baseUrl: '<%= config.app %>/scripts',
                    optimize: 'none',
                    dir: '<%= config.dist %>',
                    paths: {
                        'jquery': '../../<%= config.app %>/bower_components/jquery/dist/jquery',
                        'handlebars': '../../<%= config.app %>/bower_components/handlebars/handlebars',
                        'backbone': '../../<%= config.app %>/bower_components/backbone/backbone',
                        'lodash': '../../<%= config.app %>/bower_components/lodash/lodash',
                        'bootstrap': '../../<%= config.app %>/bower_components/bootstrap/dist/js/bootstrap',
                        'string-to-color': '../../<%= config.app %>/bower_components/string-to-color/dist/string-to-color.umd',
                        'require': '../../<%= config.app %>/bower_components/requirejs/require'
                    },
                    preserveLicenseComments: false,
                    useStrict: true,
                    wrap: true
                }
            }
        },
        useminPrepare: {
            html: '<%= config.app %>/index.html',
            options: {
                dest: '<%= config.dist %>'
            }
        },
        usemin: {
            html: ['<%= config.dist %>/{,*/}*.html'],
            css: ['<%= config.dist %>/styles/{,*/}*.css'],
            options: {
                dirs: ['<%= config.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.app %>/images',
                        src: '{,*/}*.{png,jpg,jpeg}',
                        dest: '<%= config.dist %>/images'
                    }
                ]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= config.dist %>/styles/main.css': [
                        '.tmp/styles/{,*/}*.css',
                        '<%= config.app %>/styles/{,*/}*.css'
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                     collapseWhitespace: true,
                     collapseBooleanAttributes: true,
                     removeAttributeQuotes: true,
                     removeRedundantAttributes: true,
                     useShortDoctype: true,
                     removeEmptyAttributes: true,
                     removeOptionalTags: true*/
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.app %>',
                        src: '*.html',
                        dest: '<%= config.dist %>'
                    }
                ]
            }
        },
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= config.app %>',
                        src: [
                            '*.{ico,txt}',
                            'images/{,*/}*.{webp,gif}',
                            'styles/fonts/{,*/}*.*'
                        ],
                        dest: '<%= config.dist %>'
                    },
                    {
                        expand: true,
                        flatten: true,
                        cwd: '<%= config.app %>',
                        src: ['templates/*.html'],
                        dest: '<%= config.dist %>/templates'
                    },
                    {
                        expand: true,
                        flatten: true,
                        cwd: '<%= config.app %>',
                        src: ['listing-problem.json'],
                        dest: '<%= config.dist %>/'
                    },
                    {
                        expand: true,
                        dot: true,
                        src: ['bouncer/*'],
                        dest: '<%= config.dist %>/'
                    }
                ]
            },
            test: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= config.app %>',
                        src: [
                            '*.{ico,txt}',
                            'images/{,*/}*.{webp,gif}',
                            'styles/fonts/{,*/}*.*'
                        ],
                        dest: '<%= config.dist %>'
                    }
                ]
            }
        },
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= config.dist %>/scripts/{,*/}*.js',
                        '<%= config.dist %>/styles/{,*/}*.css',
                        '<%= config.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                        '/styles/fonts/{,*/}*.*',
                        'bower_components/sass-bootstrap/fonts/*.*'
                    ]
                }
            }
        },
        'regex-replace': {
            dist: {
                src: ['<%= config.dist %>/index.html'],
                actions: [
                    {
                        name: 'requirejs-newpath',
                        search: '<script data-main=".*" src="bower_components/requirejs/require.js"></script>',
                        replace: function(match){
                            var regex = /scripts\/.*main/;
                            var result = regex.exec(match);
                            return '<script data-main="' + result[0] + '" src="require.js"></script>'
                        },
                        flags: 'g'
                    }
                ]
            }
        }
    });

    grunt.registerTask('serve', function (target) {
        var tasksToRun;
        if (target === 'dist') {
            tasksToRun = [
                'build',
                'open:server',
                'connect:dist:keepalive'
            ];
        }
        else if (target === 'test') {
            tasksToRun = [
                'clean:server',
                'compass:server',
                'connect:test',
                'open:test',
                'watch'
            ];
        }
        else {
            // TODO geht nicht
            tasksToRun = [
                'clean:server',
                'compass:server',
                'connect:livereload',
                'open:server',
                'watch'
            ];
        }

        grunt.task.run(tasksToRun);
    });

    grunt.registerTask('test', function (isConnected) {
        var testTasks = [
            'clean:server',
            'compass',
            'connect:test',
            'mocha'
        ];

        if (Boolean(isConnected)) {
            testTasks.splice(testTasks.indexOf('connect:test'), 1);
        }
        return grunt.task.run(testTasks);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'compass:dist',
        'useminPrepare',
        'requirejs',
        'imagemin',
        'htmlmin',
        'cssmin',
        'copy',
        'rev',
        'usemin',
        'regex-replace'
    ]);

    grunt.registerTask('default', [
        'eslint',
        'test',
        'build'
    ]);
};