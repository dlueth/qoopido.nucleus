var gulp     = require('gulp'),
	sequence = require('run-sequence').use(gulp),
	plugins  = require('gulp-load-plugins')(),
	clean    = require('del'),
	shared   = require('../../shared'),
	config   = require('../../config'),
	id       = 'site:less',
	task     = config.tasks[id];

module.exports = gulp;

gulp.task(id, function(callback) {
	return sequence(id + ':clean', id + ':build', callback);
});

gulp.task(id + ':clean', function(callback) {
	return clean(task.clean, callback);
});

gulp.task(id + ':build', function() {
	return gulp.src(task.watch)
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.plumber({ errorHandler: shared.handleError}))
		.pipe(plugins.pleeease(config.settings.pleeease))
		.pipe(plugins.rename({ extname: '.css' }))
		.pipe(plugins.chmod(644))
		.pipe(plugins.size({ showFiles: true, gzip: true }))
		.pipe(plugins.sourcemaps.write('.'))
		.pipe(gulp.dest(task.dest));
});