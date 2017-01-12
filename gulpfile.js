var docgen = require('baasic-javascript-docgen');
var injectVersion = require('gulp-inject-version');
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var paths = {
  scripts: ['src/**/*.js']
};

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(plugins.order(["*.moduleDefinition.js", "*.js"]))
	.pipe(plugins.concat('baasic-angular-key-value.js'))
	.pipe(plugins.header('/*\n Baasic AngularJS Key Value %%GULP_INJECT_VERSION%%\n (c) 2014-2016 Mono http://baasic.com\n License: MIT\n*/\n(function (angular, undefined) {\n'))  
	.pipe(plugins.footer('\n})(angular);'))
    .pipe(injectVersion())
	.pipe(plugins.beautify())
	.pipe(gulp.dest('dist'))
	.pipe(plugins.uglify({output: {comments: /^!|License: MIT/i}}))
	.pipe(plugins.rename('baasic-angular-key-value.min.js'))
	.pipe(gulp.dest('dist'));
});



gulp.task('docs', function() {
  docgen.generateBaasicDocs('src', 'wiki', 'Baasic Key Value Set Navigation', ['config.js'], ['home.md']);
});

gulp.task('default', ['scripts', 'docs']);
