/**
 * @use /demand/pledge
 */

(function(document) {
	'use strict';

	function definition(Pledge) {
		var deferred = Pledge.defer(),
			sample   = document.createElement('img');

		sample.onload = function() {
			if(sample.width === 1 && sample.height === 1) {
				deferred.resolve();
			} else {
				deferred.reject();
			}

			delete sample.onload;
		};

		sample.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

		return deferred.pledge;
	}

	provide([ '/demand/pledge' ], definition);
}(document));