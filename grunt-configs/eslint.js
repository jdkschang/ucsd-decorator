// ================================================================================
// GRUNT CONFIG: ESLINT
// Lints JS files based on airbnb config
// eslint-config-airbnb
// https://github.com/airbnb/javascript
//
// grunt-eslint
// https://github.com/sindresorhus/grunt-eslint
// ================================================================================

module.exports = function(grunt) {
    'use strict';
    grunt.config('eslint', {
        target: [
            '<%= gruntScope.srcJsFiles %>',
            '<%= gruntScope.gruntConfigJsFiles %>'
        ]
    });
};