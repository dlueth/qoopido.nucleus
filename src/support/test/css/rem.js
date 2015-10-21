/**
 * Qoopido support/test/css/rem
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
 */

(function(document) {
	'use strict';

	function definition(Pledge) {
		var defered  = Pledge.defer(),
			styles   = document.createElement('div').style,
			property = 'fontSize';

		try {
			styles[property] = '3rem';
		} catch(exception) {} // eslint-disable-line no-empty

		if((/rem/).test(styles[property])) {
			defered.resolve();
		} else {
			defered.reject();
		}

		return defered.pledge;
	}

	provide([ '/demand/pledge' ], definition);
}(document));