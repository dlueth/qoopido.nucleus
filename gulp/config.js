module.exports = {
	tasks: {
		bump: {
			watch: [
				"package.json",
				"bower.json"
			]
		},
		"site": {
			watch: [
				"site/**/*",
				"!site/app/css/src/**/*.less",
				"!site/app/css/dist/**/*.css",
				"!site/app/js/src/**/*.js",
				"!site/app/js/dist/**/*.js",
				"!site/app/assets/images/src/**/*",
				"!site/app/assets/images/dist/**/*"
			]
		},
		"site:less": {
			watch: "site/app/css/src/**/*.less",
			clean: "site/app/css/dist/**/*",
			dest:  "site/app/css/dist"
		},
		"site:javascript": {
			watch: "site/app/js/src/**/*.js",
			clean: "site/app/js/dist/**/*",
			dest:  "site/app/js/dist"
		},
		"site:images": {
			watch: "site/app/assets/images/src/**/*",
			clean: "site/app/assets/images/dist/**/*",
			dest:  "site/app/assets/images/dist"
		},
		"dist": {
			watch: "src/**/*.js",
			clean: "dist/**/*",
			dest:  "dist"
		}
	},
	settings: {
		pleeease: {
			less: true,
			mqpacker: true,
			autoprefixer: {
				browsers: [
					"ie > 8",
					"> 2%"
				],
				cascade: true
			},
			minifier: {
				removeAllComments: true
			}
		}
	},
	strings: {
		banner: {
			min: [
				"/*! {{gulp:module}} {{gulp:package.version}} | {{gulp:package.homepage}} | (c) {{gulp:date.year}} {{gulp:package.author.name}} */",
				""
			].join('\n'),
			max: [
				"/*!",
				"* {{gulp:module}}",
				"* {{gulp:package.title}}",
				"*",
				"* version: {{gulp:package.version}}",
				"* date:    {{gulp:date.year}}-{{gulp:date.month}}-{{gulp:date.day}}",
				"* author:  {{gulp:package.author.name}} <{{gulp:package.author.email}}>",
				"* website: {{gulp:package.homepage}}",
				"*",
				"* Copyright (c) {{gulp:date.year}} {{gulp:package.author.name}}",
				"*/",
				""
			].join('\n')
		}
	}
};