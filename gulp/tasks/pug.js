const gulp        = require('gulp');
const plumber     = require('gulp-plumber');
const changed     = require('gulp-changed');
const prettify    = require('gulp-prettify');
const config      = require('../config');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const concat = require('gulp-concat');
const yamlData = require('gulp-yaml-data');

function renderHtml() {
    return gulp.src('src/*.pug')
        .pipe(yamlData({
            property: 'data',
            src: 'src/data/data.yml',
            override: false
        }))
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest('build/'))
        .pipe(browserSync.stream());
}

gulp.task('pug', function() {
    return renderHtml();
});

gulp.task('jade:changed', function() {
    return renderHtml(true);
});

gulp.task('jade:watch', function() {
    gulp.watch([config.src.templates + '/**/_*.jade'], ['jade']);
    gulp.watch([config.src.templates + '/**/[^_]*.jade'], ['jade:changed']);
});
