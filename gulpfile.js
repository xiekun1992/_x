var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var header = require('gulp-header');
var pkg = require('./package.json');
var fs = require('fs');
var Server = require('karma').Server;

gulp.task('test',function(done){
	new Server({
		configFile:__dirname+'/karma.conf.js',
		singleRun:false
	},done).start();
});

gulp.task('build',function(){
	gulp.src('./src/_x.js')
	.pipe(uglify())
	.pipe(rename({
		suffix:'.min'
	}))
	.pipe(header(fs.readFileSync('./version.txt','utf8'),{
		pkg:pkg
	}))
	.pipe(gulp.dest('./build/'));
});

gulp.task('watcher',function(){
	gulp.watch(['./src/*.js'],['build','test']);
});

gulp.task('default',['build','test','watcher']);