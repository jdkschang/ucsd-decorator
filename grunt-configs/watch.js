module.exports = {
    scripts: {
        files: ['<%= config.app %>/scripts/ucsd/*.js'],
        tasks: ['eslint']
    },
    styles: {
        files: ['<%= config.app %>/styles/**/*.scss'],
        tasks: ['compass']
    }
};