const gulp = require('gulp');
const nested = require('postcss-nested');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const concatCss = require('gulp-concat-css');
const Filter = require('gulp-filter');
const minify = require('gulp-minify');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const pump = require('pump');

gulp.task('min-js', function (cb) {
    pump([
            gulp.src('src/block/**/*.js')
                .pipe(concat('main.js'))
                .pipe(babel({
                    presets: ['es2015']
                })),
            uglify(),
            gulp.dest('build/js/')
        ],
        cb
    );
});

gulp.task('min-scripts', function (cb) {
    pump([
            gulp.src('src/assets/vendor/**/*.js')
                .pipe(concat('bundle.js')),
            uglify(),
            gulp.dest('build/js/')
        ],
        cb
    );
});

gulp.task('min-css', function () {
    return gulp.src('src/assets/vendor/**/*.css')
        .pipe(concatCss("bundle.css"))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('build/css/'));
});

gulp.task('default', ['server']);