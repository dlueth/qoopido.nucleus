(function() {
	'use strict';

	function definition() {
		return function functionDescriptorgenerate(value, writable, configurable, enumerable) {
			return {
				__proto__:    null,
				value:        value,
				enumerable:   !!enumerable,
				configurable: !!configurable,
				writable:     !!writable
			};
		};
	}

	provide(definition);
}());