/**
 * @use /demand/validator/isObject
 *
 * @require ../function/property/unify
 * @require ../function/string/ucfirst
 * @require ./prefix
 */

(function(global) {
	'use strict';

	function definition(isObject, functionPropertyUnify, functionStringUcfirst, supportPrefix) {
		var prefixes = supportPrefix(),
			storage  = {};

		return function supportProperty(property) {
			var element  = isObject(arguments[1]) ? arguments[1] : null,
				getValue = !!arguments[element ? 2 : 1],
				stored   = null,
				pointer, type, candidates, candidate, uProperty, i = 0;

			element  = element || global;
			property = functionPropertyUnify(property);
			type     = element === global ? '#window' : element.nodeName;

			if(type) {
				pointer = storage[type]     = storage[type]           || {};
				stored  = pointer[property] = storage[type][property] || null;
			}

			if(stored === null) {
				stored  = false;
				uProperty = functionStringUcfirst(property);

				if(prefixes) {
					candidates = (property  + ' ' + uProperty + ' ' + prefixes.join(uProperty + ' ') + uProperty).split(' ');
				} else {
					candidates = [ property ];
				}

				for(; candidate = candidates[i]; i++) {
					if(candidate in element) {
						stored = candidate;

						break;
					}
				}

				if(pointer) {
					pointer[property] = stored;
				}
			}

			return stored && getValue ? element[stored] : stored;
		};
	}

	provide([ '/demand/validator/isObject', '../function/property/unify', '../function/string/ucfirst', './prefix' ], definition);
}(this));