module.exports = {
    main: {
        options: {
            bundeOptions: {
                debug: true
            },
            banner: '/*! <%= pkg.name %>' + ' v' + '<%= pkg.version %> <%= grunt.template.today("dd-mm-yyyy") %>*/\n'
        },
        src: '<%= config.app %>/scripts/ucsd/*.js',
        dest: '<%= config.app %>/scripts/bundle.js'
    }
};