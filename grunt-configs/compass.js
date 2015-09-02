// ================================================================================
// GRUNT CONFIG: COMPASS
// Minifies images using imagemin.
// grunt-contrib-imagemin
// https://github.com/gruntjs/grunt-contrib-imagemin
// ================================================================================

module.exports = function(grunt) {
    'use strict';
    grunt.config('compass', {
        options: {
            sassDir: '<%= gruntScope.srcSassDir %>',
            cssDir: '.tmp/styles',
            imagesDir: '<%= gruntScope.srcImageFiles %>',
            javascriptsDir: '<%= gruntScope.srcJsFiles %>',
            fontsDir: '<%= gruntScope.srcFontDir %>',
            importPath: '<%= gruntScope.srcVendorDir %>',
            httpImagesPath: '/img',
            httpFontsPath: '/fonts',
            relativeAssets: false,
            assetCacheBuster: false
        },
        dist: {
            options: {
                generatedImagesDir: '<%= config.dist %>/img/generated'
            }
        },
        server: {
            options: {
                debugInfo: true
            }
        }
    });
};