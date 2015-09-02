// ================================================================================
// GRUNT CONFIG: UGLIFY
// Concatenates and minifies JavaScript files.
// grunt-contrib-uglify
// https://github.com/gruntjs/grunt-contrib-uglify
// ================================================================================

module.exports = function(grunt) {
    'use strict';
    grunt.config('uglify', {

        // While watch is running, uglify JS completely to optimize file loading
        dist: {
            files: {
                '<%= gruntScope.distMainJsFile %>': [
                    '<%= gruntScope.srcJsFiles %>'
                ]
            },
            options: {
                banner: '<%= gruntScope.versionBanner %>\n\n'
            }
        },

        // If 'grunt debug' is used, don't uglify JS completely - just concatenate
        debug: {
            files: {
                '<%= gruntScope.distMainJsFile %>': [
                    '<%= gruntScope.srcJsFiles %>'
                ]
            },
            options: {
                mangle: false,
                beautify: true,
                compress: false,
                preserveComments: true,
                banner: '<%= gruntScope.versionBanner %>\n\n'
            }
        }
    });
};