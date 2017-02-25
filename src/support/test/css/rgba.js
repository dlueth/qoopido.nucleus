/**
 * @use /demand/pledge
 */

(function(document) {
	'use strict';

	function definition(Pledge) {
		var deferred = Pledge.defer(),
			styles   = document.createElement('div').style,
			property = 'backgroundColor';

		try {
			styles[property] = 'rgba(0,0,0,.5)';
		} catch(exception) {} // eslint-disable-line no-empty

		if((/rgba/).test(styles[property])) {
			deferred.resolve();
		} else {
			deferred.reject();
		}

		return deferred.pledge;
	}

	provide([ '/demand/pledge' ], definition);
}(document));