'use strict'

let gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	webpack = require('webpack'),
	rename = require('gulp-rename'),
	del = require('del')


var config = require('./webpack.config');

gulp.task('clean', function(cb) {
	del(['./dist/*.js', './dist/*.css', './dist/*.map']).then( paths => {
		cb();
	})
})


gulp.task('webpack', ['clean'], cb => webpack(config, cb) )


gulp.task('default', ['webpack']);