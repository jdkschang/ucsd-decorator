module.exports = {
    'default': ['build'],
    'lint': ['eslint'],
    'b-test': ['browserify'],
    'build': [
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'cssmin',
        'uglify',
        'copy:dist',
        'modernizr',
        'usemin',
        'compress'
    ]
};