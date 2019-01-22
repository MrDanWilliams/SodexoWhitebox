var gulp        = require('gulp');
var sass        = require('gulp-sass');
var sassLint    = require('gulp-sass-lint');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

// Move the javascript files into our /src/js folder
// gulp.task('js', function() {
//     return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
//         .pipe(gulp.dest("src/js"))
//         .pipe(browserSync.stream());
// });
 
gulp.task('scripts', function() {
  return gulp.src(['node_modules/jquery/dist/jquery.min.js', 'node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/popper.js/dist/umd/popper.min.js','node_modules/slick-carousel/slick/slick.min.js'])
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('src/js'));
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./src"
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

// SASS Linting
gulp.task('lint', function () {
  return gulp.src('src/scss/**/*.s+(a|c)ss')
    .pipe(sassLint({'config-file': 'sass-lint.yml'}))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});

// gulp.task('default', ['js','serve', 'lint']);
gulp.task('default', ['scripts', 'serve', 'lint']);