var gulp = require('gulp');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');
var uglify = require('gulp-uglify');
var imageMin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

gulp.task('less', function () {
    gulp.src('css/main.less') //path to your main less file
        .pipe(less({compress: true}))
        .pipe(minifyCSS({keepBreaks: false}))
        .pipe(gulp.dest('./dist/css/')); // your output folder
});

gulp.task('minHtml', function () {
    gulp.src('./index.html') //path to your main less file
        .pipe(minifyHTML())
        .pipe(gulp.dest('./dist/')); // your output folder
});

gulp.task('imagemin', function () {
    return gulp.src('./img/*')
        .pipe(imageMin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./dist/img/'));
});

gulp.task('uglify', function () {
    return gulp.src('./js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'));
});




gulp.task('default',['less','minHtml','imagemin','uglify']);