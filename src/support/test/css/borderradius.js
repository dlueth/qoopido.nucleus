/**
 * @use /demand/pledge
 *
 * @require ../../css/property
 */

(function() {
	'use strict';

	function definition(Pledge, getCssProperty) {
		var deferred = Pledge.defer(),
			property = getCssProperty('border-radius');

		if(property) {
			deferred.resolve(property);
		} else {
			deferred.reject();
		}

		return deferred.pledge;
	}

	provide([ '/demand/pledge', '../../css/property' ], definition);
}());