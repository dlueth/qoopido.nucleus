/**
 * @use /demand/function/iterate
 */

(function(global, document) {
	'use strict';

	function definition(iterate) {
		var objectDefineProperty   = Object.defineProperty,
			objectDefineProperties = Object.defineProperties,
			storage = {
				general: {
					properties: 'bubbles cancelable isTrusted timeStamp type view altKey ctrlKey shiftKey button buttons clientX clientY fromElement offsetX offsetY screenX screenY toElement dataTransfer deltaX deltaY deltaZ deltaMode targetTouches char charCode key keyCode passive'.split(' ')
				},
				relatedTarget: {
					match:      /^(?:blur|focus|focusin|focusout|mouseenter|mouseleave|mouseout|mouseover|dragenter|dragexit)/,
					process:    function(event, originalEvent) {
						objectDefineProperty(event, 'relatedTarget', { value: (function() {
								return originalEvent.relatedTarget || (originalEvent.fromElement === event.target) ? originalEvent.toElement : originalEvent.fromElement;
							}()), enumerable: true });
					}
				},
				metaKey: {
					match:      /^(?:key|mousedown|mouseup|click|dblclick)/,
					process:    function(event, originalEvent) {
						objectDefineProperty(event, 'metaKey', {
							value:      originalEvent.metaKey && originalEvent.metaKey !== false,
							enumerable: true
						});
					}
				},
				whichKeyboard: {
					match:      /^(?:key)/,
					process:    function(event, originalEvent) {
						objectDefineProperty(event, 'which', {
							value:      ((originalEvent.which || originalEvent.which !== 0) && originalEvent.which) || ((originalEvent.charCode !== null) ? originalEvent.charCode : originalEvent.keyCode),
							enumerable: true
						});
					}
				},
				whichMouse: {
					match:      /^(?:mousedown|mouseup|click|dblclick)/,
					process:    function(event, originalEvent) {
						objectDefineProperty(event, 'which', {
							value:      ((originalEvent.which || originalEvent.which !== 0) && originalEvent.which) || (originalEvent.which & 1 ? 1 : (originalEvent.which & 2 ? 3 : (originalEvent.which & 4 ? 2 : 0))),
							enumerable: true
						});
					}
				},
				pageX: {
					match:      /^(?:mouse|pointer|contextmenu|click|dblclick|drag|drop|wheel)/,
					process:    function(event, originalEvent) {
						objectDefineProperty(event, 'pageX', {
							value:      (function() {
								var documentElement;

								if(typeof originalEvent.pageX !== 'undefined') {
									return originalEvent.pageX;
								}

								documentElement = (event.target.ownerDocument || document).documentElement;

								return originalEvent.clientX + (documentElement.scrollLeft || 0) - (documentElement.clientLeft || 0);
							}()),
							enumerable: true
						});
					}
				},
				pageY: {
					match:      /^(?:mouse|pointer|contextmenu|touch|click|dblclick|drag|drop|wheel)/,
					process:    function(event, originalEvent) {
						objectDefineProperty(event, 'pageY', {
							value: (function() {
								var documentElement;

								if(typeof originalEvent.pageY !== 'undefined') {
									return originalEvent.pageY;
								}

								documentElement = (event.target.ownerDocument || document).documentElement;

								return originalEvent.clientY + (documentElement.scrollTop  || 0) - (documentElement.clientTop  || 0);
							}()),
							enumerable: true
						});
					}
				}
			};

		function transferProperties(event, originalEvent, properties) {
			var definitions = {}, i = 0, property;

			for(; (property = properties[i]); i++) {
				if(typeof originalEvent[property] !== 'undefined') {
					definitions[property] = {
						value:      originalEvent[property],
						enumerable: true
					}
				}
			}

			objectDefineProperties(event, definitions);
		}

		function add(property, aHook) {
			if(property && aHook && storage[property]) {
				storage[property] = aHook;
			}
		}

		function get(property) {
			if(property && storage[property]) {
				return storage[property];
			}
		}

		function process(event, originalEvent) {
			var isMatch;

			iterate(storage, function(id, hook) {
				isMatch = !hook.match || hook.match.test(originalEvent.type);

				if(isMatch) {
					if(hook.properties) {
						transferProperties(event, originalEvent, hook.properties);
					}

					if(hook.process) {
						hook.process(event, originalEvent);
					}
				}
			});

			return event;
		}

		return { add: add, get: get, process: process };
	}

	provide([ '/demand/function/iterate' ], definition);
}(this, document));
