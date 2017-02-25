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
					styles[property] = 'translate3d(0,0,0)';
				} catch(exception) {} // eslint-disable-line no-empty

				if((/translate3d/).test(styles[property])) {
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