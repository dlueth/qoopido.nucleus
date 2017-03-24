(function() {
	'use strict';

	function definition() {
		var object                         = Object,
			objectCreate                   = object.create,
			objectGetOwnPropertyNames      = object.getOwnPropertyNames,
			objectGetOwnPropertyDescriptor = object.getOwnPropertyDescriptor;

		function ClassDescriptor(value, writable, configurable, enumerable) {
			return {
				__proto__:    null,
				value:        value,
				enumerable:   !!enumerable,
				configurable: !!configurable,
				writable:     !!writable
			};
		}

		object.defineProperty(Function.prototype, 'extends', new ClassDescriptor(function(parent) {
			var self       = this,
				prototype  = self.prototype,
				properties = {},
				names      = objectGetOwnPropertyNames(prototype),
				i = 0, property;

			for(; (property = names[i]); i++) {
				properties[property] = objectGetOwnPropertyDescriptor(prototype, property);
			}
			
			properties.constructor = new ClassDescriptor(self);
			self.prototype         = objectCreate(parent.prototype || parent, properties);

			return self;
		}));

		return true;
	}

	provide(definition);
}());