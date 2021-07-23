/********* to run gulp script *********
$ npm run gulp dist
or to watch files
$ npm run gulp watch
**************************************/

// include plug-ins
var gulp           = require('gulp');
var umd            = require('gulp-umd');
var inject         = require('gulp-inject-string')
var rename         = require('gulp-rename');
var uglify         = require('gulp-uglify');
var babel          = require('gulp-babel');
var path           = require('path');
var camelCase      = require('camelcase');
var HEADER_COMMENT = '// Simple React Validator v1.6.1 | Created By Dockwa | MIT License | 2017 - Present\n';

var gutil = require('gulp-util');

function build() {
  return gulp.src('./src/simple-react-validator.js')
  .pipe(babel())
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
  .pipe(gulp.dest('./dist/'))

  // minify
  .pipe(uglify().on('error', function(err) {
    gutil.log(gutil.colors.red('[Error]'), err.toString());
    this.emit('end');
  }))
  .pipe(inject.prepend(HEADER_COMMENT))
  .pipe(rename({ extname: '.min.js' }))
  .pipe(gulp.dest('./dist/'));
}

function buildLocales() {
  return gulp.src('./src/locale/*')
  .pipe(babel())
  .pipe(umd({
    exports: function(file) {
      return 'null';
    },
    namespace: function(file) {
      return `SimpleReactValidatorLocale${capitalizeFilename(file)}`;
    },
    dependencies: function() {
      return [
        {
          name: 'simple-react-validator',
          amd: 'simple-react-validator',
          cjs: 'simple-react-validator',
          global: 'SimpleReactValidator',
          param: 'SimpleReactValidator'
        }
      ]
    }
  }))
  .pipe(inject.prepend(HEADER_COMMENT))
  .pipe(gulp.dest('./dist/locale/'))

  // minify
  .pipe(uglify().on('error', function(err) {
    gutil.log(gutil.colors.red('[Error]'), err.toString());
    this.emit('end');
  }))
  .pipe(inject.prepend(HEADER_COMMENT))
  .pipe(rename({ extname: '.min.js' }))
  .pipe(gulp.dest('./dist/locale/min/'));
}

function watch() {
  gulp.watch('src/*', build);
  gulp.watch('src/*', buildLocales);
}

var dist = gulp.series(build, buildLocales)

exports.build = build;
exports.buildLocales = buildLocales;
exports.watch = watch;
exports.dist = dist;

function capitalizeFilename(file) {
  return camelCase(path.basename(file.path, '.js'), {pascalCase: true});
}
