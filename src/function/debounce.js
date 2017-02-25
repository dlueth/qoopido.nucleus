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