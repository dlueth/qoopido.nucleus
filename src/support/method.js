/**
 * @use /demand/validator/isObject
 * @use /demand/validator/isTypeOf
 *
 * @require ./property
 */

(function(global) {
	'use strict';

	function definition(isObject, isTypeOf, getProperty) {
		var storage = {};

		return function supportMethod(method) {
			var element  = isObject(arguments[1]) ? arguments[1] : null,
				getValue = !!arguments[element ? 2 : 1],
				stored   = null,
				type, pointer, name, value;

			element = element || global;
			type    = element === global ? '#window' : element.nodeName;

			if(type) {
				pointer = storage[type]   = storage[type] || {};
				stored  = pointer[method] = storage[type][method] || null;
			}

			if(stored === null) {
				stored = false;

				if((name = getProperty(method, element)) && (value = element[name]) && (isTypeOf(value, 'function') || isObject(value))) {
					stored = name;
				}

				if(pointer) {
					pointer[method] = stored;
				}
			}

			return stored && getValue ? element[stored] : stored;
		};
	}

	provide([ '/demand/validator/isObject', '/demand/validator/isTypeOf', './property' ], definition);
}(this));