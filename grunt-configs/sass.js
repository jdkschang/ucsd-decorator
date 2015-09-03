// ================================================================================
// GRUNT CONFIG: SASS
// converts sass,scss extensions into css
// grunt-contrib-sass
// https://github.com/gruntjs/grunt-contrib-sass
// ================================================================================

module.exports = function(grunt) {
    'use strict';
    grunt.config('sass', {
        dist: {
            options: {
                style: 'expanded'
            }
        },
        files: {
            'app/styles/base.css': '<%= gruntScope.srcMainSassFile %>'
        }
    });
};