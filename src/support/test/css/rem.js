/**
 * @use /demand/pledge
 */

(function(document) {
	'use strict';

	function definition(Pledge) {
		var deferred = Pledge.defer(),
			styles   = document.createElement('div').style,
			property = 'fontSize';

		try {
			styles[property] = '3rem';
		} catch(exception) {} // eslint-disable-line no-empty

		if((/rem/).test(styles[property])) {
			deferred.resolve();
		} else {
			deferred.reject();
		}

		return deferred.pledge;
	}

	provide([ '/demand/pledge' ], definition);
}(document));