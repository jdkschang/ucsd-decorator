// ================================================================================
// GRUNT CONFIG: COMPASS
// Minifies images using imagemin.
// grunt-contrib-compass
// https://github.com/gruntjs/grunt-contrib-imagemin
// ================================================================================

module.exports = function(grunt) {
    'use strict';
    grunt.config('compass', {
        dist: {
            options: {
                sassDir: '<%= gruntScope.srcSassDir %>',
                cssDir: '.tmp/styles'
            }
        },
        server: {
            options: {
                debugInfo: true
            }
        }
    });
};