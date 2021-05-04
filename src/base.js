(function(strPrototype) {
	'use strict';

	var object                         = Object,
		objectCreate                   = object.create,
		objectGetOwnPropertyNames      = object.getOwnPropertyNames,
		objectGetOwnPropertyDescriptor = object.getOwnPropertyDescriptor,
		objectDefineProperty           = object.defineProperty;

	function functionExtends(source) {
		var self       = this,
			prototype  = self[strPrototype],
			names      = objectGetOwnPropertyNames(prototype),
			properties = { constructor: { value: self, writable: true, configurable: true }},
			i = 0, property;

		for(; (property = names[i]) && !properties[property]; i++) {
			properties[property] = objectGetOwnPropertyDescriptor(prototype, property);
		}

		try {
			self[strPrototype] = objectCreate(source[strPrototype] || source, properties);
		} catch(e) {
			// ES6 class prototypes are readonly at least in Chrome
			// (and assignment throws an error in strict mode) ...
		}

		// ... which is handled here
		if(self[strPrototype] === prototype) {
			throw new TypeError('Unable to extend, prototype is not writable');
		}

		return self;
	}

	objectDefineProperty(Function.prototype, 'extends', functionExtends);
}('prototype'));
