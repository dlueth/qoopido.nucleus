/**
 * Qoopido support/test/css/transform/2d
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
 * @require ../transform
 */

(function(document) {
	'use strict';

	function definition(Pledge, testTransform) {
		var defered = Pledge.defer();

		testTransform.then(
			function(property) {
				var styles = document.createElement('div').style;

				try {
					styles[property] = 'rotate(30deg)';
				} catch(exception) {} // eslint-disable-line no-empty

				if((/rotate/).test(styles[property])) {
					defered.resolve();
				} else {
					defered.reject();
				}
			},
			defered.reject
		);

		return defered.pledge;
	}

	provide([ '/demand/pledge', '../transform' ], definition);
}(document));