/**
 * Qoopido support/test/element/canvas/todataurl
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
 * @require ../canvas
 */

(function(document) {
	'use strict';

	function definition(Pledge, testCanvas) {
		var defered = Pledge.defer();

		testCanvas.then(
			function() {
				var sample = document.createElement('canvas');

				if('toDataURL' in sample) {
					defered.resolve();
				} else {
					defered.reject();
				}
			},
			defered.reject
		);

		return defered.pledge;
	}

	provide([ '/demand/pledge', '../canvas' ], definition);
}(document));