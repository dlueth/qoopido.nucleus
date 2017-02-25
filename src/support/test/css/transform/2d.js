/**
 * @use /demand/pledge
 *
 * @require ../transform
 */

(function(document) {
	'use strict';

	function definition(Pledge, testTransform) {
		var deferred = Pledge.defer();

		testTransform.then(
			function(property) {
				var styles = document.createElement('div').style;

				try {
					styles[property] = 'rotate(30deg)';
				} catch(exception) {} // eslint-disable-line no-empty

				if((/rotate/).test(styles[property])) {
					deferred.resolve();
				} else {
					deferred.reject();
				}
			},
			deferred.reject
		);

		return deferred.pledge;
	}

	provide([ '/demand/pledge', '../transform' ], definition);
}(document));