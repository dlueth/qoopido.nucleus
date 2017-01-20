module.exports = {
	tasks: {
		bump: {
			watch: [
				"package.json",
				"bower.json"
			]
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
					 "/**! {{gulp:package.title}} {{gulp:package.version} | {{gulp:package.homepage}} | (c) {{gulp:date.year}} {{gulp:package.author.name}} ({{gulp:package.license}}) */",
					 ""
				 ].join('\n'),
			max: [
					 "/**!",
					 " * {{gulp:package.title}}",
					 " *",
					 " * version: {{gulp:package.version}}",
					 " * module:  {{gulp:module}}",
					 " * date:    {{gulp:date.year}}-{{gulp:date.month}}-{{gulp:date.day}}",
					 " * author:  {{gulp:package.author.name}} <{{gulp:package.author.email}}>",
					 " * website: {{gulp:package.homepage}}",
					 " * license: {{gulp:package.license}}",
					 " *",
					 " * Copyright (c) {{gulp:date.year}} {{gulp:package.author.name}}",
					 " */",
					 ""
				 ].join('\n')
		}
	}
};