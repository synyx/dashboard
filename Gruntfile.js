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
            sass: {
                files: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['sass']
            },
            livereload: {
                options: {
                    livereload: grunt.option('livereloadport') || LIVERELOAD_PORT
                },
                files: [
                    '<%= config.app %>/*.html',
                    '{.tmp,<%= config.app %>}/styles/{,*/}*.css',
                    '{.tmp,<%= config.app %>}/scripts/{,*/}*.js',
                    '<%= config.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}'
                ]
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
        else {
            tasksToRun = [
                'clean:server',
                'connect:livereload',
                'open:server',
                'watch'
            ];
        }

        grunt.task.run(tasksToRun);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'copy',
        'regex-replace'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);
};