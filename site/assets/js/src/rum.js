(function(global) {
	'use strict';

	function definition(resolveUrl) {
		var performance = global.performance,
			url, time;

		function checkState() {
			time = performance.getEntriesByName(url)[0] && performance.getEntriesByName(url)[0].responseEnd;

			if(typeof time === 'number' && time > 0) {
				demand('/probe').then(function(probe) {
					probe(time);
				});
			} else {
				setTimeout(checkState, 100);
			}
		}

		return function rum(resource) {
			if(resource && !url) {
				url = resolveUrl(resource);

				checkState();
			}
		};
	}

	provide([ '/demand/function/resolveUrl' ], definition);
}(this));