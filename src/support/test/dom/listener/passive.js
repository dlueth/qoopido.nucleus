/**
 * @use /demand/pledge
 */

(function(global) {
	'use strict';

	function definition(Pledge) {
		var deferred = Pledge.defer(),
			event    = '' + (+new Date()),
			noop     = function() {};

		try {
			var options = Object.defineProperty({}, 'passive', {
				get: function() {
					deferred.resolve();
				}
			});

			global.addEventListener(event, noop, options);
			global.removeEventListener(event, noop, options);
		} catch(error) {} /* eslint-disable-line no-empty */

		deferred.reject();

		return deferred.pledge;
	}

	provide([ '/demand/pledge' ], definition);
}(this));
