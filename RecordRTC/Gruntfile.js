'use strict';

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt, {
        pattern: 'grunt-*',
        config: 'package.json',
        scope: 'devDependencies'
    });

    // configure project
    grunt.initConfig({
        // make node configurations available
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                stripBanners: true,
                separator: ''
            },
            dist: {
                src: [
                    'dev/head.js',
                    'dev/RecordRTC.js',
                    'dev/MRecordRTC.js',
                    'dev/Cross-Browser-Declarations.js',
                    'dev/Storage.js',
                    'dev/MediaStreamRecorder.js',
                    'dev/StereoRecorder.js',
                    'dev/StereoAudioRecorder.js',
                    'dev/CanvasRecorder.js',
                    'dev/WhammyRecorder.js',
                    'dev/Whammy.js',
                    'dev/DiskStorage.js',
                    'dev/GifRecorder.js'
                ],
                dest: 'RecordRTC.js',
            },
        },
        htmlhint: {
            html1: {
                src: [
                    './Canvas-Recording/*.html',
                    './MRecordRTC/*.html',
                    './PHP-and-FFmpeg/*.html',
                    './RecordRTC-over-Socketio/*.html',
                    './RecordRTC-to-Nodejs/static/*.html',
                    './RecordRTC-to-PHP/*.html'
                ],
                options: {
                    'tag-pair': true
                }
            }
        },
        jshint: {
            options: {
                ignores: [],
                // use default .jshintrc files
                jshintrc: true
            },
            files: ['RecordRTC.js']
        },
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    'RecordRTC.min.js': ['RecordRTC.js']
                }
            }
        },
        jsbeautifier: {
            files: [
                // 'RecordRTC.js',
                'dev/*.js',
                'Gruntfile.js',
                './Canvas-Recording/*.html',
                './MRecordRTC/*.html',
                './PHP-and-FFmpeg/*.html',
                './RecordRTC-over-Socketio/*.html',
                './RecordRTC-to-Nodejs/static/*.html',
                './RecordRTC-to-PHP/*.html'
            ],
            options: {
                js: {
                    braceStyle: "collapse",
                    breakChainedMethods: false,
                    e4x: false,
                    evalCode: false,
                    indentChar: " ",
                    indentLevel: 0,
                    indentSize: 4,
                    indentWithTabs: false,
                    jslintHappy: false,
                    keepArrayIndentation: false,
                    keepFunctionIndentation: false,
                    maxPreserveNewlines: 10,
                    preserveNewlines: true,
                    spaceBeforeConditional: true,
                    spaceInParen: false,
                    unescapeStrings: false,
                    wrapLineLength: 0
                },
                html: {
                    braceStyle: "collapse",
                    indentChar: " ",
                    indentScripts: "keep",
                    indentSize: 4,
                    maxPreserveNewlines: 10,
                    preserveNewlines: true,
                    unformatted: ["a", "sub", "sup", "b", "i", "u"],
                    wrapLineLength: 0
                },
                css: {
                    indentChar: " ",
                    indentSize: 4
                }
            }
        },
        bump: {
            options: {
                files: ['package.json', 'bower.json'],
                updateConfigs: [],
                commit: true,
                commitMessage: 'v%VERSION%',
                commitFiles: ['package.json', 'bower.json'],
                createTag: true,
                tagName: '%VERSION%',
                tagMessage: '%VERSION%',
                push: false,
                pushTo: 'upstream',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
            }
        }
    });

    // enable plugins

    // set default tasks to run when grunt is called without parameters
    // http://gruntjs.com/api/grunt.task
    grunt.registerTask('default', ['concat', 'jsbeautifier', 'htmlhint', 'jshint', 'uglify']);
};
