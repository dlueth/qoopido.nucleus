var gulp     = require('gulp'),
	chmod    = require('gulp-chmod'),
	util     = require('gulp-util'),
	plugins  = require('gulp-load-plugins')(),
	sequence = require('run-sequence'),
	del      = require('del'),
	config   = {},
	package, config, patterns = [];

module.exports = gulp;

/**************************************************
 * helper
 **************************************************/
	function handleError (error) {
		util.log(error);
	}

	function loadPackageFile() {
		delete require.cache[require.resolve('./package.json')];

		package = require('./package.json');
	}

	function loadConfigFile() {
		delete require.cache[require.resolve('./gulp/config.json')];

		config = replacePatterns(require('./gulp/config.json'));
	}

	function preparePatterns(node, prefix) {
		var key, id, item;

		node = node || package;

		for(key in node) {
			id   = (prefix) ? prefix + '.' + key : 'package.' + key;
			item = node[key];

			if(typeof item === 'string') {
				patterns.push({ pattern: new RegExp('{{gulp:' + id + '}}', 'g'), replacement: item });
			} else if(Object.prototype.toString.call(item) === '[object Object]') {
				preparePatterns(item, id);
			}
		}
	}

	function replacePatterns(value) {
		var i = 0, entry;

		value = JSON.stringify(value);

		for(; (entry = patterns[i]) !== undefined; i++) {
			value = value.replace(entry.pattern, entry.replacement);
		}

		return JSON.parse(value);
	}

	function getDatePatterns() {
		var date  = new Date(),
			month = ''.concat('0', (date.getMonth() + 1).toString()).slice(-2),
			day   = ''.concat('0', date.getDate().toString()).slice(-2),
			time  = ''.concat('0', date.getHours().toString()).slice(-2) + ':' + ''.concat('0', date.getMinutes().toString()).slice(-2) + ':' + ''.concat('0', date.getSeconds().toString()).slice(-2);

		return [
			{ pattern: new RegExp('{{gulp:date.year}}', 'g'), replacement: date.getFullYear() },
			{ pattern: new RegExp('{{gulp:date.month}}', 'g'), replacement: month },
			{ pattern: new RegExp('{{gulp:date.day}}', 'g'), replacement: day },
			{ pattern: new RegExp('{{gulp:date.time}}', 'g'), replacement: time }
		];
	}

/**************************************************
 * initialization
 **************************************************/
	loadPackageFile();
	preparePatterns();
	loadConfigFile();

/**************************************************
 * tasks (private)
 **************************************************/
	gulp.task('bump', function(callback) {
		var tasks = [ 'site', 'dist' ];

		loadPackageFile();
		preparePatterns();
		loadConfigFile();

		tasks.push(callback);

		return sequence.apply(null, tasks);
	});

	gulp.task('site:lint', function() {
		return gulp.src(config.tasks.site.js.watch)
			.pipe(plugins.eslint())
			.pipe(plugins.eslint.format());
	});

	gulp.task('site:clean', function(callback) {
		return del(config.tasks.site.clean, callback);
	});

	gulp.task('site:build:js', function() {
		return gulp.src(config.tasks.site.js.watch)
			.pipe(plugins.sourcemaps.init())
			.pipe(plugins.plumber({ errorHandler: handleError}))
			.pipe(plugins.uglify({ preserveComments: 'none' }))
			//.pipe(plugins.concat('default.js'))
			.pipe(plugins.rename(function (path) {
				path.basename = path.basename.replace(/.src$/, '');
			}))
			.pipe(chmod(644))
			.pipe(plugins.size({ showFiles: true, gzip: true }))
			.pipe(plugins.sourcemaps.write('./'))
			.pipe(gulp.dest(config.tasks.site.js.destination));
	});

	gulp.task('site:build:less', function() {
		return gulp.src(config.tasks.site.less.watch)
			.pipe(plugins.plumber({ errorHandler: handleError}))
			.pipe(plugins.less({ compress: false }))
			.pipe(plugins.autoprefixer(config.settings.autoprefixer))
			.pipe(plugins.minifyCss({ keepSpecialComments: 0 }))
			.pipe(chmod(644))
			.pipe(plugins.size({ showFiles: true, gzip: true }))
			.pipe(gulp.dest(config.tasks.site.less.destination));
	});

	gulp.task('site', function(callback) {
		return sequence('site:lint', 'site:clean', 'site:build:js', 'site:build:less', callback);
	});

	gulp.task('dist:lint', function() {
		return gulp.src(config.tasks.dist.lint || config.tasks.dist.watch)
			.pipe(plugins.eslint())
			.pipe(plugins.eslint.format());
	});

	gulp.task('dist:clean', function(callback) {
		return del(config.tasks.dist.clean || [ config.tasks.dist.destination + '**/*' ], callback);
	});

	gulp.task('dist:build', function() {
		return gulp.src(config.tasks.dist.build || config.tasks.dist.watch)
			.pipe(plugins.sourcemaps.init())
			.pipe(plugins.plumber({ errorHandler: handleError}))
			.pipe(plugins.uglify({ preserveComments: 'none' }))
			.pipe(plugins.header(config.strings.banner.min.join('\n')))
			.pipe(plugins.frep(patterns))
			.pipe(plugins.frep(getDatePatterns()))
			.pipe(chmod(644))
			.pipe(plugins.size({ showFiles: true, gzip: true }))
			.pipe(plugins.sourcemaps.write('./'))
			.pipe(gulp.dest(config.tasks.dist.destination));
	});

	gulp.task('dist', function(callback) {
		return sequence('dist:lint', 'dist:clean', 'dist:build', callback);
	});

/**************************************************
 * tasks (public)
 **************************************************/
	gulp.task('bump:patch', function() {
		return gulp.src(config.tasks.bump.watch)
			.pipe(plugins.bump({ type: 'patch' }))
			.pipe(chmod(644))
			.pipe(gulp.dest(config.tasks.bump.destination));
	});

	gulp.task('bump:minor', function() {
		return gulp.src(config.tasks.bump.watch)
			.pipe(plugins.bump({ type: 'minor' }))
			.pipe(chmod(644))
			.pipe(gulp.dest(config.tasks.bump.destination));
	});

	gulp.task('bump:major', function() {
		return gulp.src(config.tasks.bump.watch)
			.pipe(plugins.bump({ type: 'major' }))
			.pipe(chmod(644))
			.pipe(gulp.dest(config.tasks.bump.destination));
	});

	gulp.task('all', [ 'bump' ]);

	gulp.task('watch', function() {
		plugins.livereload.listen();

		gulp
			.watch(config.tasks.bump.watch, [ 'bump' ])
			.on('change', plugins.livereload.changed);

		gulp
			.watch(config.tasks.site.watch, [ 'site' ])
			.on('change', plugins.livereload.changed);

		gulp
			.watch(config.tasks.dist.watch, [ 'dist' ])
			.on('change', plugins.livereload.changed);
	});

	gulp.task('default', [ 'watch' ]);
