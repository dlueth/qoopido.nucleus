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
				"!site/assets/css/src/**/*.less",
				"!site/assets/css/dist/**/*.css",
				"!site/assets/js/src/**/*.js",
				"!site/assets/js/dist/**/*.js",
				"!site/assets/images/src/**/*",
				"!site/assets/images/dist/**/*"
			]
		},
		"site:less": {
			watch: "site/assets/css/src/**/*.less",
			clean: "site/assets/css/dist/**/*",
			dest:  "site/assets/css/dist"
		},
		"site:javascript": {
			watch: "site/assets/js/src/**/*.js",
			clean: "site/assets/js/dist/**/*",
			dest:  "site/assets/js/dist"
		},
		"site:images": {
			watch: "site/assets/images/src/**/*",
			clean: "site/assets/images/dist/**/*",
			dest:  "site/assets/images/dist"
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