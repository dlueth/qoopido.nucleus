/**
 * @use /demand/function/iterate
 *
 * @require ../function/string/ucfirst
 */

(function(document) {
	'use strict';

	function definition(iterate, functionStringUcfirst) {
		var styles           = document.createElement('div').style,
			regexMatchPrefix = /^(Moz|WebKit|Khtml|ms|O|Icab)(?=[A-Z])/,
			prefix           = null;

		return function supportPrefix() {
			if(prefix === null) {
				prefix = false;

				iterate(styles, function(property) {
					if(regexMatchPrefix.test(property)) {
						prefix = property.match(regexMatchPrefix)[0];

						return false;
					}
				});

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

	provide([ '/demand/function/iterate', '../function/string/ucfirst' ], definition);
}(document));