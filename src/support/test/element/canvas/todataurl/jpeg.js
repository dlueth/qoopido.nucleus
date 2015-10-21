/**
 * Qoopido support/test/element/canvas/todataurl/jpeg
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
 * @require ../todataurl
 */

(function(document) {
	'use strict';

	function definition(Pledge, testTodataurl) {
		var defered = Pledge.defer();

		testTodataurl.then(
			function() {
				var sample = document.createElement('canvas');

				if(sample.toDataURL('image/jpeg').indexOf('data:image/jpeg') === 0) {
					defered.resolve();
				} else {
					defered.reject();
				}
			},
			defered.reject
		);

		return defered.pledge;
	}

	provide([ '/demand/pledge', '../todataurl' ], definition);
}(document));