const gulp   = require('gulp');
const config = require('../config.js');

// gulp.task('copy:fonts', function() {
//     return gulp
//         .src(config.src.fonts + '/**/*.{ttf,eot,woff,woff2}')
//         .pipe(gulp.dest(config.dest.fonts));
// });
//
// gulp.task('copy:lib', function() {
//     return gulp
//         .src(config.src.lib + '/**/*.*')
//         .pipe(gulp.dest(config.dest.lib));
// });
//
// gulp.task('copy:rootfiles', function() {
//     return gulp
//         .src(config.src.root + '/*.*')
//         .pipe(gulp.dest(config.dest.root));
// });
//
// gulp.task('copy:img', function() {
//     return gulp
//         .src([
//             config.src.img + '/**/*.{jpg,png,jpeg,svg,gif}',
//             '!' + config.src.img + '/svgo/**/*.*'
//         ])
//         .pipe(gulp.dest(config.dest.img));
// });
//
// gulp.task('copy', [
//     'copy:img',
//     'copy:rootfiles',
//     // 'copy:lib',
//     'copy:fonts'
// ]);
// gulp.task('copy:watch', function() {
//     gulp.watch(config.src.img+'/*', ['copy']);
// });



const imagemin = require('gulp-imagemin');

gulp.task('compress-images', function () {
    gulp.src('src/assets/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/img'))
});

gulp.task('copy', function () {
    gulp.src('src/assets/font/**/*')
        .pipe(gulp.dest('build/font'));
    gulp.src('src/assets/img/**/*')
        .pipe(gulp.dest('build/img'));
});

gulp.task('default', ['server']);