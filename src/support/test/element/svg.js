/**
 * @use /demand/pledge
 */

(function(document) {
	'use strict';

	function definition(Pledge) {
		var deferred = Pledge.defer(),
			sample   = 'createElementNS' in document && document.createElementNS('http://www.w3.org/2000/svg', 'svg');

		if(sample && 'createSVGRect' in sample) {
			deferred.resolve();
		} else {
			deferred.reject();
		}

		return deferred.pledge;
	}

	provide([ '/demand/pledge' ], definition);
}(document));