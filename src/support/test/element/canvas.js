/**
 * Qoopido support/test/element/canvas
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
		var defered = Pledge.defer(),
			sample  = document.createElement('canvas');

		if('getContext' in sample && sample.getContext('2d')) {
			defered.resolve();
		} else {
			defered.reject();
		}

		return defered.pledge;
	}

	provide([ '/demand/pledge' ], definition);
}(document));