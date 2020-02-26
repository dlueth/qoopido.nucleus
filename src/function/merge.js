/**
 * @use /demand/validator/isObject
 * @use /demand/function/iterate
 */

(function() {
	'use strict';

	function definition(isObject, iterate) {
		return function functionMerge() {
			var target = arguments[0],
				i = 1, properties, targetProperty, targetPropertyIsObject;

			for(; (properties = arguments[i]) !== undefined; i++) {
				iterate(properties, function(property, sourceProperty) {
					targetProperty = target[property];

					if(sourceProperty !== undefined) {
						if(isObject(sourceProperty)) {
							targetPropertyIsObject = isObject(targetProperty);

							if(sourceProperty.length !== undefined) {
								targetProperty = (targetPropertyIsObject && targetProperty.length !== undefined) ? targetProperty : [];
							} else {
								targetProperty = (targetPropertyIsObject && targetProperty.length === undefined) ? targetProperty : {};
							}

							target[property] = functionMerge(targetProperty, sourceProperty);
						} else {
							target[property] = sourceProperty;
						}
					}
				});
			}

			return target;
		};
	}

	provide([ '/demand/validator/isObject', '/demand/function/iterate' ], definition);
}());
