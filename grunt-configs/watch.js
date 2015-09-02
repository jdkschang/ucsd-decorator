// ================================================================================
// GRUNT CONFIG: WATCH
// Continuously watches and live reloads with file changes.
// grunt-contrib-watch
// https://github.com/gruntjs/grunt-contrib-watch
// ================================================================================

module.exports = function(grunt) {
    'use strict';
    grunt.config('watch', {
        sass: {
            files: [
                '<%= gruntScope.srcSassFiles %>'
            ],
            tasks: [
                //'scsslint', compass?
                //'sass:dist',
                'postcss'
            ]
        },
        js: {
            files: [
                '<%= gruntScope.srcJsFiles %>'
            ],
            tasks: [
                'eslint',
                'uglify:dist'
            ]
        },
        images: {
            files: [
                '<%= gruntScope.srcImageFiles %>'
            ],
            tasks: [
            ]
        }
    });
};