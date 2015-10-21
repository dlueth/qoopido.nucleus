/**
 * Qoopido function/property/unify
 *
 * Copyright (c) 2015 Dirk Lueth
 *
 * Dual licensed under the MIT and GPL licenses.
 *  - http://www.opensource.org/licenses/mit-license.php
 *  - http://www.gnu.org/copyleft/gpl.html
 *
 * @author Dirk Lueth <info@qoopido.com>
 *
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