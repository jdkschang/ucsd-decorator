// ================================================================================
// GRUNT CONFIG: POSTCSS
// CSS post processor
// grunt-postcss
// plugins::
//   - autoprefixer-core
// https://github.com/nDmitry/grunt-postcss
// https://github.com/postcss/autoprefixer-core
// ================================================================================

module.exports = function(grunt) {
    'use strict';
    grunt.config('postcss', {
        options: {
            map: true,
            processors: [
                require('autoprefixer-core')({browsers: ['last 6 versions']})
            ]
        },
        dist: {
            files: [{
                expand: true,
                cwd: '.tmp/styles/',
                src: '{,*/}*.css',
                dest: '.tmp/styles/'
            }]
        }
    });
};