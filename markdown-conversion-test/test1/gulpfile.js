var gulp        = require('gulp'),
    markdown    = require('gulp-remarkable'),
    frontMatter = require('gulp-front-matter'),
    layout      = require('gulp-layout');
 
gulp.task('Build Docs', function() {
    return gulp.src('Documentation/src/*.md')
        .pipe(frontMatter())
        .pipe(markdown({html: true}))
        .pipe(layout(function(file) {
            return file.frontMatter;
        }))
        .pipe(gulp.dest('Documentation'));
});
 
gulp.task('default', function() {
    gulp.watch('Documentation/src/*.md', ['Build Docs']);
});