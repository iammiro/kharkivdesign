const gulp = require('gulp');
const postcss = require('gulp-postcss');
var data = require('gulp-data');
var stylus = require('gulp-stylus');
const autoprefixer = require('autoprefixer');
const nested = require('postcss-nested');
const pug = require('gulp-pug');
var concat = require('gulp-concat');
var Filter = require('gulp-filter');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

const processors = [
    autoprefixer({
        browsers: ['last 6 versions']
    }),
    nested
];

gulp.task('serve', ['pug'], function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('*.jade', ['pug']);
    gulp.watch('*.html').on('change', reload);
});

gulp.task('styl', function () {
    const f = Filter(['src/blocks/**/*.styl'], {restore: true});
    return gulp.src('src/blocks/**/*.styl')
        .pipe(f)
        .pipe(stylus())
        // .pipe(f.restore())
        .pipe(concat('main.css'))
        .pipe(gulp.dest('build/css'));
});

gulp.task('pug', function buildHTML() {
    return gulp
        .src('src/index.pug')
        .pipe(pug({}))
        .pipe(gulp.dest('build/html/'));
});

gulp.task('pug:watch', function () {
    gulp.watch('src/pug/*', ['html'])
});

gulp.task('scss:watch', function () {
    gulp.watch('src/scss/*', ['scss']);
});

gulp.task('default', ['styl', 'pug']);