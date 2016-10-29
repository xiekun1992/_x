var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var header = require('gulp-header');
var jshint = require('gulp-jshint');
var insert = require('gulp-insert');
var concat = require('gulp-concat');
var pkg = require('./package.json');
var fs = require('fs');
var Server = require('karma').Server;

gulp.task('test',function(done){
	new Server({
		configFile:__dirname+'/karma.conf.js',
		singleRun:false
	},done).start();
});

gulp.task('lint',function(){
	gulp.src('./src/_x.js')
	.pipe(jshint())
	.pipe(jshint.reporter('default'));
});

gulp.task('build',function(){
	gulp.src('./src/**/*.js')
	.pipe(concat('_x.js'))
	.pipe(uglify())
	.pipe(insert.transform(function(contents, file){
		var functions = contents.match(/function (\S+)\(\)/g), modules=[];
		console.log(functions)
		for(var i = 0; i < functions.length; i++){
			var classNames = /^function (\S+)\(\)$/.exec(functions[i]).pop();
			modules[i] = "_x['" + classNames +"'] = new " + classNames + "()";
		}
		var wrapper = "(function(global){'use strict';var _x = {};" + contents + ";" + modules.join(';') + ";global._x = _x;})(window);";
		// console.log(wrapper);
		return wrapper;
	}))
	.pipe(rename({
		suffix:'.min'
	}))
	.pipe(header(fs.readFileSync('./version.txt','utf8'),{
		pkg:pkg
	}))
	.pipe(gulp.dest('./build/'));
});

gulp.task('watcher',function(){
	gulp.watch(['./src/*.js'],['lint','build','test']);
});

gulp.task('default',['lint','test','watcher']);