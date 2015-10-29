var gulp     = require('gulp'),
	config   = require('../config'),
	id       = 'site',
	task     = config.tasks[id];

module.exports = gulp;

gulp.task(id, function(callback) {
	return callback();
});