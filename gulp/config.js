var package = require('../package.json');

module.exports = {
	tasks: {
		bump: {
			watch: [
				"package.json"
			]
		},
		dist: {
			watch: "src/**/*.js",
			clean: "dist/**/*",
			dest:  "dist/"
		}
	},
	permissions: {
		owner: {
			read: true,
			write: true,
			execute: false
		},
		group: {
			read: true,
			write: false,
			execute: false
		},
		others: {
			read: true,
			write: false,
			execute: false
		}
	},
	settings: {
		size: {
			showFiles: true,
			gzip: true,
			pretty: true
		},
		include: {
			extensions: "js",
			hardFail: true,
			includePaths: [ __dirname + "/../src", __dirname + "/.." ]
		}
	},
	banner: [
		"/**! " + package.title + " " + package.version + " | " + package.homepage + " | (c) " + (new Date()).getFullYear() + " " + package.author.name + " */",
		""
	].join('\n')
};
