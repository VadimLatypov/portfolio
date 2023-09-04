const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const autopref = require('gulp-autoprefixer')
const minifyCSS = require('gulp-clean-css')
const rename = require('gulp-rename')
const babel = require('gulp-babel')
const minifyJS = require('gulp-uglify')
const browser = require('browser-sync').create()

// Минификация CSS
gulp.task('scssToMinCSS', () => {
    return gulp.src('app/scss/*.scss')
        .pipe(sass()).on('error', sass.logError)
        .pipe(autopref({cascade: false}))
        .pipe(minifyCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('public/css'))
})

// Минификация JS
gulp.task('jsToMinJS', () => {
    return gulp.src('app/js/*.js')
        .pipe(babel({presets: ['@babel/preset-env']}))
        .pipe(minifyJS())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('public/js'))
})

// Локальный сервер
gulp.task('serve', () => {
    browser.init({server: 'public'})
    browser.watch('public/**/*').on('change', browser.reload)
})

// Watch
gulp.task('watchFiles', () => {
    gulp.watch('app/scss/*.scss', gulp.series('scssToMinCSS'))
    gulp.watch('app/js/*.js', gulp.series('jsToMinJS'))
})

// Default
gulp.task('default', gulp.parallel('watchFiles', 'serve'))