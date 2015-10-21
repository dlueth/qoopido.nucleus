/**
 * Qoopido support/test/element/video/webm
 *
 * Copyright (c) 2015 Dirk Lueth
 *
 * Dual licensed under the MIT and GPL licenses.
 *  - http://www.opensource.org/licenses/mit-license.php
 *  - http://www.gnu.org/copyleft/gpl.html
 *
 * @author Dirk Lueth <info@qoopido.com>
 *
 * @use /demand/pledge
 *
 * @require ../video
 */

(function(document) {
	'use strict';

	function definition(Pledge, testVideo) {
		var defered = Pledge.defer();

		testVideo.then(
			function() {
				var sample = document.createElement('video');

				if(sample.canPlayType('video/webm; codecs="vp8, vorbis"')) {
					defered.resolve();
				} else {
					defered.reject();
				}
			},
			defered.reject
		);

		return defered.pledge;
	}

	provide([ '/demand/pledge', '../video' ], definition);
}(document));