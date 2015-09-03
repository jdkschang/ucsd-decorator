// ================================================================================
// GRUNT CONFIG: COMPRESS
// Compresses dist/ into a zip file
// grunt-browser-sync
// http://www.browsersync.io/docs/grunt/
// ================================================================================

module.exports = function(grunt) {
    'use strict';
    grunt.config('browserSync', {
        options: {
            archive: 'ucsd-decorator.zip'
        },
        files: [
            {cwd:'dist/', src: ['**'], expand: true, dest: 'ucsd-decorator/'}
        ]
    });
};