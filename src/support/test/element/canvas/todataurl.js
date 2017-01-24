/**
 * @use /demand/pledge
 *
 * @require ../canvas
 */

(function(document) {
	'use strict';

	function definition(Pledge, testCanvas) {
		var deferred = Pledge.defer();

		testCanvas.then(
			function() {
				var sample = document.createElement('canvas');

				if('toDataURL' in sample) {
					deferred.resolve();
				} else {
					deferred.reject();
				}
			},
			deferred.reject
		);

		return deferred.pledge;
	}

	provide([ '/demand/pledge', '../canvas' ], definition);
}(document));