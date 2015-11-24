const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const reactify = require('reactify');
const source = require('vinyl-source-stream');

gulp.task('build', () => {
  return browserify({
    entries: 'src/app/index.js',
    debug: true,
    transform: [reactify, babelify],
    paths: ['src/app']
  })
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest('public/build'));
});

gulp.task('watch', () => {
  gulp.watch(['src/**/*.js'], ['build'])
});

gulp.task('default', ['watch']);
