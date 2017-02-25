/**
 * @require ../string/lcfirst
 * @require ../string/ucfirst
 */

(function() {
	'use strict';

	function definition(lcfirst, ucfirst) {
		var regexMatchPrefix    = /^-?(?:webkit|khtml|icab|moz|ms|o)([A-Z]|-[a-z])/,
			regexMatchHyphens   = /-([a-z])/gi;

		function callback(full, first) {
			return ucfirst(first);
		}

		return function functionPropertyUnify(value) {
			return lcfirst(
				lcfirst(value)
				.replace(regexMatchPrefix, '$1')
				.replace(regexMatchHyphens, callback)
			);
		};
	}

	provide([ '../string/lcfirst', '../string/ucfirst' ], definition);
}());