const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const coffee = require('gulp-coffee');
const concat = require('gulp-concat');

gulp.task('coffee', function(){
    return gulp.src('src/**/*.coffee')
        .pipe(coffee())
        .pipe(concat('main.js'))
        .pipe(gulp.dest('build/js/'))
        .pipe(browserSync.stream());
});

gulp.task('default', ['server']);