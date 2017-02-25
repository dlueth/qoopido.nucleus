/**
 * @require ../../function/property/unify
 * @require ../../function/string/ucfirst
 * @require ../prefix
 */

(function(document, undefined) {
	'use strict';

	function definition(unify, ucfirst, prefix) {
		var prefixes            = prefix(),
			styles              = document.createElement('div').style,
			regexMatchUppercase = /([A-Z])/g,
			storage             = {};

		return function supportCssProperty(property) {
			property = unify(property);

			var stored = storage[property] || null;

			if(stored === null) {
				stored = false;

				var candidate,
					i          = 0,
					uProperty  = ucfirst(property),
					candidates = (property + ' ' + uProperty + ' ' + prefixes.join(uProperty + ' ') + uProperty).split(' '),
					prefix     = '';

				for(i; (candidate = candidates[i]) !== undefined; i++) {
					if(styles[candidate] !== undefined) {
						stored = candidate;

						if(i > 0) {
							prefix = '-';
						}

						break;
					}
				}

				storage[property] = stored = stored ? [prefix + stored.replace(regexMatchUppercase, '-$1').toLowerCase(), stored] : false;
			}

			return stored;
		};
	}

	provide([ '../../function/property/unify', '../../function/string/ucfirst', '../prefix' ], definition);
}(document));