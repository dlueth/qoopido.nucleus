/**
 * Qoopido base
 *
 * Provides the basic object inheritance and extension mechanism
 *
 * Copyright (c) 2015 Dirk Lueth
 *
 * Dual licensed under the MIT and GPL licenses.
 *  - http://www.opensource.org/licenses/mit-license.php
 *  - http://www.gnu.org/copyleft/gpl.html
 *
 * @author Dirk Lueth <info@qoopido.com>
 *
 * @require ./function/descriptor/generate
 */

(function() {
	'use strict';

	function definition(functionDescriptorGenerate) {
		var objectCreate                   = Object.create,
			objectDefineProperty           = Object.defineProperty,
			objectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor,
			objectGetOwnPropertyNames      = Object.getOwnPropertyNames;
		
		function base() {}

		base.extend = function(fn) {
			var parent     = this,
				source     = fn.prototype,
				properties = {};

			objectGetOwnPropertyNames(source).forEach(function(property) {
				properties[property] = objectGetOwnPropertyDescriptor(source, property);
			});

			properties['constructor'] = functionDescriptorGenerate(fn);

			fn.prototype = objectCreate(parent.prototype || parent, properties);

			!fn.final && (objectDefineProperty(fn, 'extend', functionDescriptorGenerate(parent.extend, true)));

			return fn;
		};

		return base;
	}

	provide([ './function/descriptor/generate' ], definition);
}());