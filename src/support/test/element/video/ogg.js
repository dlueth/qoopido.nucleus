/**
 * @use /demand/pledge
 *
 * @require ../video
 */

(function(document) {
	'use strict';

	function definition(Pledge, testVideo) {
		var deferred = Pledge.defer();

		testVideo.then(
			function() {
				var sample = document.createElement('video');

				if(sample.canPlayType('video/ogg; codecs="theora, vorbis"')) {
					deferred.resolve();
				} else {
					deferred.reject();
				}
			},
			deferred.reject
		);

		return deferred.pledge;
	}

	provide([ '/demand/pledge', '../video' ], definition);
}(document));