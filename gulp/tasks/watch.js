const gulp   = require('gulp');
const config = require('../config');

gulp.task('watch',
    ['copy:watch',
    'jade:watch',
    'sprite:svg:watch',
    'svgo:watch',
    'webpack:watch',
    'sass:watch'
]);
