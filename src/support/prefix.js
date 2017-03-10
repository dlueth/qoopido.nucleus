/**
 * @require ../function/string/ucfirst
 */

(function(global, document) {
	'use strict';

	function definition(functionStringUcfirst) {
		var styles           = global.getComputedStyle(document.documentElement, ''),
			regexMatchPrefix = /^-(webkit|apple|moz|ms|o)-/,
			prefix           = null,
			i = 0, property;
		
		return function supportPrefix() {
			if(prefix === null) {
				prefix = false;
				
				for(; (property = styles[i]); i++) {
					if(regexMatchPrefix.test(property)) {
						prefix = property.match(regexMatchPrefix)[1];
						
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
			
			return prefix || [];
		};
	}

	provide([ '../function/string/ucfirst' ], definition);
}(this, document));