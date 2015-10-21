/**
 * Qoopido function/descriptor/generate
 *
 * Copyright (c) 2015 Dirk Lueth
 *
 * Dual licensed under the MIT and GPL licenses.
 *  - http://www.opensource.org/licenses/mit-license.php
 *  - http://www.gnu.org/copyleft/gpl.html
 *
 * @author Dirk Lueth <info@qoopido.com>
 */

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