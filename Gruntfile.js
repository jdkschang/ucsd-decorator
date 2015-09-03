// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    'use strict';

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // ------------------------------------------------------------------------------
    // PROJECT LEVEL: VARIABLES
    // Contains only variables shared across Grunt files.
    // ------------------------------------------------------------------------------
    var gruntScope = {

        // COMMENT BANNER
        // Placed on generated files to warn developers not to edit `dist` files directly.
        versionBanner: '/*! <%= package.name %>' + ' v' + '<%= package.version %> <%= grunt.template.today("mm-yyyy")*/',

        // HTML FILES
        srcHtmlFiles: [
            'app/*.html',
            'app/docs/*.html'
        ],
        distHtmlFiles: [
            'dist/*.html'
        ],

        // SASS/CSS FILES
        srcSassDir: 'app/styles/**/*',
        srcSassFiles: [
            'app/styles/**/*.scss'
            'app/vendor/**/*.scss'
        ],
        srcMainSassFile: 'app/styles/base.scss',
        distMainCssFile: 'dist/styles/base-min.css',

        // JS FILES
        srcMainJsFiles: 'app/scripts/ucsd/*.js',
        srcVendorJsFiles: 'app/vendor/**/*.js',
        distMainJsFile: 'dist/scripts/base-min.js',
        distVendorJsFile: 'dist/scripts/vendor.js',
        gruntConfigJsFiles: [
            'Gruntfile.js',
            'grunt-configs/*.js'
        ],

        // IMAGES
        srcImageFiles: [
            'app/img/*.{png,jpg,gif,svg}',
            'app/styles/img/*.{png,jpg,gif,svg}'
        ],

        // FONTS
        srcFontDir: 'app/fonts',

        // VENDOR
        srcVendorDir: 'app/vendor'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        pkg: require('./package.json'),

        // Pass shared variables to be used by external config files.
        gruntScope: gruntScope
    });

    // LOAD TASKS
    // Load tasks automatically with 'load-grunt-tasks' plugin.
    // https://github.com/sindresorhus/load-grunt-tasks
    require('load-grunt-tasks')(grunt);

    // TASK CONFIGS
    // Load per-task configs from separate files.
    grunt.loadTasks('grunt-configs/');


    // ------------------------------------------------------------------------------
    // REGISTER TASKS
    // ------------------------------------------------------------------------------
    grunt.registerTask('default', ['build']);
    grunt.registerTask('b-test', ['browserify']);

    grunt.registerTask('build', [
        'clean:dist',
        //'compass',
        'postcss',
        'eslint',
        'uglify:dist'
    ]);

    grunt.registerTask('serve', [
        'build',
        'browserSync',
        'watch'
    ]);

};
