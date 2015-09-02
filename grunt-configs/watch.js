// ================================================================================
// GRUNT CONFIG: WATCH
// Continuously watches and live reloads with file changes.
// grunt-contrib-watch
// https://github.com/gruntjs/grunt-contrib-watch
// ================================================================================

module.exports = function(grunt) {
    'use strict';
    grunt.config('watch', {
        html: {
            files: [
                '<%= gruntScope.srcHtmlFiles %>'
            ],
            tasks: [
                'htmlmin',
                'usebanner'
            ]
        },
        sass: {
            files: [
                '<%= gruntScope.srcSassFiles %>'
            ],
            tasks: [
                'scsslint',
                'sass:dist',
                'autoprefixer'
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