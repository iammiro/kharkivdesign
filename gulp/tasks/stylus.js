var gulp         = require('gulp');
var sass         = require('gulp-sass');
var cssnano      = require('gulp-cssnano');
var sourcemaps   = require('gulp-sourcemaps');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var mqpacker     = require('css-mqpacker');
var gulpif       = require('gulp-if');
var config       = require('../config');
const browserSync = require('browser-sync').create();
const stylus = require('gulp-stylus');
const imagemin = require('gulp-imagemin');
const nested = require('postcss-nested');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const minify = require('gulp-minify');


var processors = [
    autoprefixer({
        browsers: ['last 5 versions'],
        cascade: false
    }),
    mqpacker({
        sort: sortMediaQueries
    })
];

gulp.task('stylus', function() {
    return gulp.src('src/assets/kharkivdesign.styl')
        .pipe(stylus())
        .pipe(postcss([ autoprefixer() ]))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('build/css/'))
        .pipe(browserSync.stream());
});

gulp.task('sass:watch', function() {
    gulp.watch(config.src.sass + '/**/*.{sass,scss}', ['sass']);
});

function isMax(mq) {
    return /max-width/.test(mq);
}

function isMin(mq) {
    return /min-width/.test(mq);
}

function sortMediaQueries(a, b) {
    A = a.replace(/\D/g, '');
    B = b.replace(/\D/g, '');

    if (isMax(a) && isMax(b)) {
        return B - A;
    } else if (isMin(a) && isMin(b)) {
        return A - B;
    } else if (isMax(a) && isMin(b)) {
        return 1;
    } else if (isMin(a) && isMax(b)) {
        return -1;
    }

    return 1;
}
