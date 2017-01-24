/**
 * @use /demand/pledge
 */

(function(document) {
	'use strict';

	function definition(Pledge) {
		var deferred = Pledge.defer(),
			sample   = document.createElement('canvas');

		if('getContext' in sample && sample.getContext('2d')) {
			deferred.resolve();
		} else {
			deferred.reject();
		}

		return deferred.pledge;
	}

	provide([ '/demand/pledge' ], definition);
}(document));