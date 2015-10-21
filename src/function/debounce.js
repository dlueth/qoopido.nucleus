/**
 * Qoopido function/debounce
 *
 * Copyright (c) 2015 Dirk Lueth
 *
 * Dual licensed under the MIT and GPL licenses.
 *  - http://www.opensource.org/licenses/mit-license.php
 *  - http://www.gnu.org/copyleft/gpl.html
 *
 * @author Dirk Lueth <info@qoopido.com>
 */

(function(setTimeout) {
	'use strict';

	function definition() {
		return function functionDebounce(fn, delay) {
			var timeout;

			delay = parseInt(delay, 10) || 200;

			return function() {
				var context   = this,
					parameter = arguments;

				clearTimeout(timeout);

				timeout = setTimeout(function() {
					fn.apply(context, parameter)
				}, delay);
			};
		};
	}

	provide(definition);
}(setTimeout));