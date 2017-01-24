(function() {
	'use strict';

	function definition() {
		return function functionStringUcfirst(value) {
			return value.charAt(0).toUpperCase() + value.slice(1);
		};
	}

	provide(definition);
}());