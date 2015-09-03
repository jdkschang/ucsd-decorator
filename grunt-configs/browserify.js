module.exports = {
    main: {
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
    }
};