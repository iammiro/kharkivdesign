const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const stylus = require('gulp-stylus');
const coffee = require('gulp-coffee');
const imagemin = require('gulp-imagemin');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const nested = require('postcss-nested');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const concatCss = require('gulp-concat-css');
const Filter = require('gulp-filter');
const minify = require('gulp-minify');



// Static server
gulp.task('serve', ['stylus', 'pug', 'min-js', 'min-css', 'min-scripts'], function() {
    browserSync.init({
        server: {
            baseDir: "./build/"
        }
    });

    gulp.watch('src/**/*.styl', ['stylus']);
    gulp.watch('src/**/*.pug', ['pug']);
    gulp.watch('src/**/*.coffee', ['coffee']);
    gulp.watch('build/*.*').on('change', browserSync.reload);
});

//Сжатие и перемещение изображений
gulp.task('compress-images', function () {
    gulp.src('src/assets/i**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/img'))
});

//Сжатие js
gulp.task('min-js', function() {
    gulp.src('src/block/**/*.js')
        .pipe(concat('main.js'))
        .pipe(minify())
        .pipe(gulp.dest('build/js/'))
        .pipe(browserSync.stream());
});

//Конкатенация js библиотек
gulp.task('min-scripts', function() {
    return gulp.src('src/assets/vendor/**/*.js')
        .pipe(concat('all.js'))
        .pipe(minify())
        .pipe(gulp.dest('build/js/'));
});

//Конкатенация CSS сторонних вендоров
gulp.task('min-css', function () {
    return gulp.src('src/assets/vendor/**/*.css')
        .pipe(concatCss("bundle.css"))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('build/css/'));
});

// Компиляция + автопрефиксер + минификация файлов Stylus
gulp.task('stylus', function(){
  return gulp.src('src/assets/kharkivdesign.styl')
  .pipe(stylus())
  .pipe(postcss([ autoprefixer() ]))
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(gulp.dest('build/css/'))
  .pipe(browserSync.stream());
});

// Компиляция файлов PUG
gulp.task('pug', function(){
  return gulp.src('src/index.pug')
  .pipe(pug({pretty: true}))
  .pipe(gulp.dest('build/'))
  .pipe(browserSync.stream());
});

// Компиляция файлов Coffee
gulp.task('coffee', function(){
  return gulp.src('src/**/*.coffee')
  .pipe(coffee())
  .pipe(gulp.dest('build/js/'))
  .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);