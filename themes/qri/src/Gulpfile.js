const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('styles', function() {
    gulp.src('./sass/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('../static/css/'));
});

//Watch task
gulp.task('default',function() {
	gulp.watch('sass/**/*.scss',['styles']);
});