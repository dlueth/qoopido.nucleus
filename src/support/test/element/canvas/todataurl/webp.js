/**
 * @use /demand/pledge
 *
 * @require ../todataurl
 */

(function(document) {
	'use strict';

	function definition(Pledge, testTodataurl) {
		var deferred = Pledge.defer();

		testTodataurl.then(
			function() {
				var sample = document.createElement('canvas');

				if(sample.toDataURL('image/webp').indexOf('data:image/webp') === 0) {
					deferred.resolve();
				} else {
					deferred.reject();
				}
			},
			deferred.reject
		);

		return deferred.pledge;
	}

	provide([ '/demand/pledge', '../todataurl' ], definition);
}(document));