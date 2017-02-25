/**
 * @use /demand/pledge
 */

/* global DocumentTouch */

(function(global, navigator) {
	'use strict';

	function definition(Pledge) {
		var deferred = Pledge.defer();

		if(('ontouchstart' in global) || ('DocumentTouch' in global && document instanceof DocumentTouch) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) {
			deferred.resolve();
		} else {
			deferred.reject();
		}

		return deferred.pledge;
	}

	provide([ '/demand/pledge' ], definition);
}(this, navigator));