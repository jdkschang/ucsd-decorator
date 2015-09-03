// ================================================================================
// GRUNT CONFIG: BROWSERIFY
// bundles js apps
// https://github.com/jmreidy/grunt-browserify
// ================================================================================

module.exports = function(grunt) {
    'use strict';
    grunt.config('browserify', {
        options: {
            bundeOptions: {
                debug: true
            },
            banner: '/*! <%= pkg.name %>' + ' v' + '<%= pkg.version %> <%= grunt.template.today("dd-mm-yyyy") %>*/\n'
            watch: true
        },
        files: {
            '<%= gruntScope.distMainJsFile %>': '<%= gruntScope.srcMainJsFiles %>',
            '<%= gruntScope.distVendorJsFile %>': '<%= gruntScope.srcVendorJsFiles %>'
        }
    });
};