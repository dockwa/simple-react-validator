// include plug-ins
var gulp       = require('gulp');
var umd        = require('gulp-umd');
var inject     = require('gulp-inject-string')
var rename     = require('gulp-rename');
var uglify     = require('gulp-uglify');
var babel      = require('gulp-babel');
var HEADER_COMMENT = '// Simple React Validator v0.0.5 | Created By Dockwa | MIT License | 2017\n';

var gutil = require('gulp-util');

// JS concat, strip debugging and minify
gulp.task('build', function() {
  gulp.src('./src/simple-react-validator.js')
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(umd({
    exports: function() {
      return 'SimpleReactValidator';
    },
    namespace: function() {
      return 'SimpleReactValidator';
    },
    dependencies: function() {
      return [
        {
          name: 'react',
          amd: 'react',
          cjs: 'react',
          global: 'React',
          param: 'React'
        }
      ]
    }
  }))
  .pipe(inject.prepend(HEADER_COMMENT))
  // This will output the non-minified version
  .pipe(gulp.dest('./dist/'))

  // minify
  .pipe(uglify().on('error', function(err) {
    gutil.log(gutil.colors.red('[Error]'), err.toString());
    this.emit('end');
  }))
  .pipe(inject.prepend(HEADER_COMMENT))
  .pipe(rename({ extname: '.min.js' }))
  .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function() {
  gulp.watch(['src/*'], ['build']);
});

gulp.task('dist', ['build']);
