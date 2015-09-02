module.exports = {
    'default': [],
    'lint': [
        'eslint'
    ],
    'build': [
        'lint',
        'mocha',
        'notify'
    ]
};