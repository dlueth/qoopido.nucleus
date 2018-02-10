(function(strPrototype) {
	'use strict';

	var object                         = Object,
		objectCreate                   = object.create,
		objectGetOwnPropertyNames      = object.getOwnPropertyNames,
		objectGetOwnPropertyDescriptor = object.getOwnPropertyDescriptor,
		objectDefineProperty           = object.defineProperty;

	function ClassDescriptor(value, writable, configurable, enumerable) {
		return {
			__proto__:    null,
			value:        value,
			enumerable:   !!enumerable,
			configurable: !!configurable,
			writable:     !!writable
		};
	}

	function objectDefine(name, value, writable, configurable, enumerable) {
		objectDefineProperty(this, name, new ClassDescriptor(value, writable, configurable, enumerable));
	}

	function functionExtends(source) {
		var self       = this,
			prototype  = self[strPrototype],
			names      = objectGetOwnPropertyNames(prototype),
			properties = { constructor:  new ClassDescriptor(self, true, true)},
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

	objectDefine.call(Object.prototype, 'define', objectDefine);
	Function.prototype.define('extends', functionExtends);
}('prototype'));
