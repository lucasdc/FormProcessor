var gulp   = require('gulp');
var header = require('gulp-header');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('build', function() {
  var pkg = require('./package.json');
  var banner = [
    '/*!',
    ' * jQuery Form Processor v<%= pkg.version %>',
    ' *',
    ' * Copyright (c) 2016 Lucas Dupke; MIT License',
    ' */\n\n'
  ].join('\n');

  return gulp.src(['./src/jquery.formProcessor.js'])
    .pipe(header(banner, { pkg: pkg }))
    .pipe(gulp.dest('./dist/'))
    .pipe(uglify({
      preserveComments: 'license'
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['build']);