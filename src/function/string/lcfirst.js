(function() {
	'use strict';
	
	function definition() {
		return function functionStringLcfirst(value) {
			return value.charAt(0).toLowerCase() + value.slice(1);
		};
	}

	provide(definition);
}());