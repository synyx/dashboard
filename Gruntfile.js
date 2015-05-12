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
                spawn: false,
                livereload: true
            },
            sass: {
                files: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['sass:app']
            },
            app: {
                files: [
                    '<%= config.app %>/*.html',
                    '{.tmp,<%= config.app %>}/styles/{,*/}*.css',
                    '{.tmp,<%= config.app %>}/scripts/{,*/}*.js',
                    'test/spec/{,*/}*.js'
                ]
            },
            test: {
                files: ['<%= config.app %>/scripts/{,*/}*.js', 'test/spec/{,*/}*.js']
            }
        },
        connect: {
            options: {
                port: 9000,
                hostname: 'localhost',
                livereload: 35729
            },
            app: {
                options: {
                    middleware: function (connect) {
                        return [
                            connect.static(require('path').resolve('.tmp')),
                            connect.static(require('path').resolve(config.app))
                        ];
                    },
                    open: 'http://localhost:<%= connect.options.port %>'
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            connect.static(require('path').resolve(config.dist))
                        ];
                    },
                    open: 'http://localhost:<%= connect.options.port %>'
                }
            },
            test: {
                options: {
                    port: 9001,
                    middleware: function (connect) {
                        return [
                            connect.static(require('path').resolve('.tmp')),
                            connect.static(require('path').resolve('test')),
                            connect.static(require('path').resolve(config.app))
                        ];
                    }
                }
            },
            testOpen: {
                options: {
                    port: 9001,
                    middleware: function (connect) {
                        return [
                            connect.static(require('path').resolve('.tmp')),
                            connect.static(require('path').resolve('test')),
                            connect.static(require('path').resolve(config.app))
                        ];
                    },
                    open: 'http://localhost:<%= connect.test.options.port %>'
                }
            }
        },
        clean: {
            dist: ['.tmp', '<%= config.dist %>/*'],
            server: '.tmp'
        },
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= config.app %>',
                        src: [
                            '*.{ico,html,txt}',
                            'listing-problem.json'
                        ],
                        dest: '<%= config.dist %>'
                    },
                    {
                        expand: true,
                        cwd: '<%= config.app %>/styles',
                        src: [
                            '{,*/}*.{css,scss}'
                        ],
                        dest: '<%= config.dist %>/styles'
                    },
                    {
                        expand: true,
                        flatten: true,
                        cwd: '<%= config.app %>/bower_components',
                        src: [
                            'bootstrap/dist/css/{,*/}*.{css,map}'
                        ],
                        dest: '<%= config.dist %>/styles'
                    },
                    {
                        expand: true,
                        cwd: '<%= config.app %>/scripts',
                        src: ['{,*/}*.js'],
                        dest: '<%= config.dist %>'
                    },
                    {
                        expand: true,
                        cwd: '<%= config.app %>/templates',
                        src: ['{,*/}*.html'],
                        dest: '<%= config.dist %>/templates'
                    },
                    {
                        expand: true,
                        cwd: '<%= config.app %>/images',
                        src: ['{,*/}*'],
                        dest: '<%= config.dist %>/images'
                    },
                    {
                        expand: true,
                        flatten: true,
                        cwd: '<%= config.app %>/bower_components',
                        src: [
                            'backbone/backbone.js',
                            'bootstrap/dist/js/bootstrap.js',
                            'handlebars/handlebars.js',
                            'jquery/dist/jquery.js',
                            'string-to-color/dist/string-to-color.umd.js',
                            'lodash/lodash.js',
                            'requirejs/require.js'
                        ],
                        dest: '<%= config.dist %>/libs'
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'bouncer',
                        src: ['{,*/}*'],
                        dest: '<%= config.dist %>/bouncer'
                    }
                ]
            }
        },
        sass: {
            dist: {
                files: {
                    '<%= config.dist %>/styles/main.css': '<%= config.dist %>/styles/main.scss'
                }
            },
            app: {
                files: {
                    '.tmp/styles/main.css': '<%= config.app %>/styles/main.scss'
                }
            }
        },
        'regex-replace': {
            'dist-index': {
                src: ['<%= config.dist %>/index.html'],
                actions: [
                    {
                        search: '<script data-main=".*" src="bower_components/requirejs/require.js"></script>',
                        replace: function (match) {
                            var regex = /scripts\/.*main/;
                            var result = regex.exec(match);
                            return '<script data-main="' + result[0] + '" src="libs/require.js"></script>';
                        },
                        flags: 'g'
                    },
                    {
                        search: 'scripts/main',
                        replace: function () {
                            return 'main';
                        },
                        flags: 'g'
                    },
                    {
                        search: 'bower_components/bootstrap/dist/css/',
                        replace: function () {
                            return 'styles/';
                        },
                        flags: 'g'
                    }
                ]
            },
            'dist-main': {
                src: ['<%= config.dist %>/main.js'],
                actions: [
                    {
                        search: '../bower_components/backbone/',
                        replace: function () {
                            return 'libs/';
                        },
                        flags: 'g'
                    },
                    {
                        search: '../bower_components/jquery/dist/',
                        replace: function () {
                            return 'libs/';
                        },
                        flags: 'g'
                    },
                    {
                        search: '../bower_components/handlebars/',
                        replace: function () {
                            return 'libs/';
                        },
                        flags: 'g'
                    },
                    {
                        search: '../bower_components/lodash/',
                        replace: function () {
                            return 'libs/';
                        },
                        flags: 'g'
                    },
                    {
                        search: '../bower_components/bootstrap/dist/js/',
                        replace: function () {
                            return 'libs/';
                        },
                        flags: 'g'
                    },
                    {
                        search: '../bower_components/string-to-color/dist/',
                        replace: function () {
                            return 'libs/';
                        },
                        flags: 'g'
                    }
                ]
            }
        },
        eslint: {
            options: {
                configFile: '.eslint.json'
            },
            target: [
                '<%= config.app %>/scripts/**/*.js',
                'Gruntfile.js'
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
        }
    });

    grunt.registerTask('serve', function (target) {
        var tasks = [
            'clean:server',
            'sass:app',
            'connect:app',
            'watch'
        ];

        if (target === 'dist') {
            tasks = [
                'build',
                'connect:dist:keepalive'
            ];
        }
        else if (target === 'test') {
            tasks = [
                'clean:server',
                'connect:testOpen',
                'watch'
            ];
        }

        grunt.task.run(tasks);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'copy',
        'regex-replace:dist-index',
        'regex-replace:dist-main',
        'sass:dist'
    ]);

    grunt.registerTask('test', [
        'clean:server',
        'connect:test',
        'mocha'
    ]);

    grunt.registerTask('default', [
        'eslint',
        'test',
        'build'
    ]);
};
