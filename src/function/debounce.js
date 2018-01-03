(function(setTimeout) {
	'use strict';

	function definition() {
		return function functionDebounce(fn, delay, immediate) {
			var timeout;

			function debounced() {
				var context   = this,
						parameter = arguments,
						call      = immediate && !timeout;

				function execute() {
					debounced.cancel();

					!immediate && fn.apply(context, parameter);
				}

				debounced.cancel();

				timeout = setTimeout(execute, parseInt(delay, 10) || 200);

				call && fn.apply(context, parameter);
			}

			debounced.cancel = function() {
				timeout = clearTimeout(timeout);
			};

			return debounced;
		};
	}

	provide(definition);
}(setTimeout));