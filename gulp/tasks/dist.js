var gulp     = require('gulp'),
	sequence = require('run-sequence').use(gulp),
	plugins  = require('gulp-load-plugins')(),
	clean    = require('del'),
	shared   = require('../shared'),
	config   = require('../config'),
	id       = 'dist',
	task     = config.tasks[id];

module.exports = gulp;

gulp.task(id, function(callback) {
	return sequence(id + ':lint', id + ':clean', id + ':build', callback);
});

gulp.task(id + ':lint', function() {
	return gulp.src(task.watch)
		.pipe(plugins.eslint())
		.pipe(plugins.eslint.format());
});

gulp.task(id + ':clean', function(callback) {
	return clean(task.clean, callback);
});

gulp.task(id + ':build', function() {
	return gulp.src(task.watch)
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.plumber({ errorHandler: shared.handleError}))
		.pipe(plugins.uglify({ preserveComments: 'none' }))
		.pipe(plugins.insert.transform(shared.transform))
		.pipe(plugins.chmod(644))
		.pipe(plugins.size({ showFiles: true, gzip: true }))
		.pipe(plugins.sourcemaps.write('.'))
		.pipe(gulp.dest(task.dest));
});