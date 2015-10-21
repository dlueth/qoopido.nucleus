/**
 * Qoopido support/test/capability/touch
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

/* global DocumentTouch */

(function(global, navigator) {
	'use strict';

	function definition(Pledge) {
		var defered = Pledge.defer();

		if(('ontouchstart' in global) || ('DocumentTouch' in global && document instanceof DocumentTouch) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) {
			defered.resolve();
		} else {
			defered.reject();
		}

		return defered.pledge;
	}

	provide([ '/demand/pledge' ], definition);
}(this, navigator));