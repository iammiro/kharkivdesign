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
const Filter = require('gulp-filter');
const minify = require('gulp-minify');



// Static server
gulp.task('serve', ['stylus', 'pug', 'coffee'], function() {
    browserSync.init({
        server: {
            baseDir: "./build/"
        }
    });

    gulp.watch('src/styl/*.*', ['stylus']);
    gulp.watch('src/**/*.*', ['pug']);
    gulp.watch('src/coffee/*.*', ['coffee']);
    gulp.watch('build/*.*').on('change', browserSync.reload);
});

//Сжатие и перемещение изображений
gulp.task('compress-images', function () {
    gulp.src('src/assets/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/img'))
});

// Компиляция + автопрефиксер + минификация файлов Stylus
gulp.task('stylus', function(){
  return gulp.src('src/assets/*.*')
  .pipe(stylus())
  .pipe(postcss([ autoprefixer() ]))
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(gulp.dest('build/css/'))
  .pipe(browserSync.stream());
});

// Компиляция файлов PUG
gulp.task('pug', function(){
  return gulp.src('src/index.pug')
  .pipe(pug())
  .pipe(gulp.dest('build/'))
  .pipe(browserSync.stream());
});

// Компиляция файлов Coffee
gulp.task('coffee', function(){
  return gulp.src('src/coffee/*.*')
  .pipe(coffee())
  .pipe(gulp.dest('build/js/'))
  .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);