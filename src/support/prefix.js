/**
 * Qoopido support/prefix
 *
 * Copyright (c) 2015 Dirk Lueth
 *
 * Dual licensed under the MIT and GPL licenses.
 *  - http://www.opensource.org/licenses/mit-license.php
 *  - http://www.gnu.org/copyleft/gpl.html
 *
 * @author Dirk Lueth <info@qoopido.com>
 *
 * @require ../function/string/ucfirst
 */

(function(document) {
	'use strict';

	function definition(functionStringUcfirst) {
		var styles           = document.createElement('div').style,
			regexMatchPrefix = /^(Moz|WebKit|Khtml|ms|O|Icab)(?=[A-Z])/,
			prefix           = null,
			property;

		return function supportPrefix() {
			if(prefix === null) {
				prefix = false;

				for(property in styles) {
					if(regexMatchPrefix.test(property)) {
						prefix = property.match(regexMatchPrefix)[0];

						break;
					}
				}

				if(!prefix && 'WebkitOpacity' in styles) {
					prefix = 'WebKit';
				}

				if(!prefix && 'KhtmlOpacity' in styles) {
					prefix = 'Khtml';
				}

				if(prefix) {
					prefix = [prefix.toLowerCase(), functionStringUcfirst(prefix.toLowerCase()), prefix];
				}
			}

			return prefix;
		};
	}

	provide([ '../function/string/ucfirst' ], definition);
}(document));