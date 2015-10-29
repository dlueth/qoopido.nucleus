var gulp     = require('gulp'),
	sequence = require('run-sequence').use(gulp),
	plugins  = require('gulp-load-plugins')(),
	clean    = require('del'),
	shared   = require('../../shared'),
	config   = require('../../config'),
	id       = 'site:images',
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
		.pipe(plugins.chmod(644))
		.pipe(gulp.dest(task.dest));
});