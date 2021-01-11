/**
 * @use /demand/function/iterate
 */

(function(global, document) {
	'use strict';

	function definition(iterate) {
		var storage = {
				general: {
					properties: 'bubbles cancelable isTrusted timeStamp type view altKey ctrlKey shiftKey button buttons clientX clientY fromElement offsetX offsetY screenX screenY toElement dataTransfer deltaX deltaY deltaZ deltaMode targetTouches char charCode key keyCode passive'.split(' ')
				},
				relatedTarget: {
					match:      /^(?:blur|focus|focusin|focusout|mouseenter|mouseleave|mouseout|mouseover|dragenter|dragexit)/,
					process:    function(event, originalEvent) {
						Object.defineProperty(event, 'relatedTarget', { value: (function() {
								return originalEvent.relatedTarget || (originalEvent.fromElement === event.target) ? originalEvent.toElement : originalEvent.fromElement;
							}()), enumerable: true });
					}
				},
				metaKey: {
					match:      /^(?:key|mousedown|mouseup|click|dblclick)/,
					process:    function(event, originalEvent) {
						Object.defineProperty(event, 'metaKey', {
							value:      originalEvent.metaKey && originalEvent.metaKey !== false,
							enumerable: true
						});
					}
				},
				whichKeyboard: {
					match:      /^(?:key)/,
					process:    function(event, originalEvent) {
						Object.defineProperty(event, 'which', {
							value:      ((originalEvent.which || originalEvent.which !== 0) && originalEvent.which) || ((originalEvent.charCode !== null) ? originalEvent.charCode : originalEvent.keyCode),
							enumerable: true
						});
					}
				},
				whichMouse: {
					match:      /^(?:mousedown|mouseup|click|dblclick)/,
					process:    function(event, originalEvent) {
						Object.defineProperty(event, 'which', {
							value:      ((originalEvent.which || originalEvent.which !== 0) && originalEvent.which) || (originalEvent.which & 1 ? 1 : (originalEvent.which & 2 ? 3 : (originalEvent.which & 4 ? 2 : 0))),
							enumerable: true
						});
					}
				},
				pageX: {
					match:      /^(?:mouse|pointer|contextmenu|touch|click|dblclick|drag|drop|wheel)/,
					process:    function(event, originalEvent) {
						Object.defineProperty(event, 'pageX', {
							value:      (function() {
								if(typeof originalEvent.pageX !== 'undefined') {
									return originalEvent.pageX;
								}

								return (function() {
									var pointer = event.target.ownerDocument || document;

									pointer = pointer.documentElement || pointer.body;

									return originalEvent.clientX + (pointer.scrollLeft || 0) - (pointer.clientLeft || 0);
								}());
							}()),
							enumerable: true
						});
					}
				},
				pageY: {
					match:      /^(?:mouse|pointer|contextmenu|touch|click|dblclick|drag|drop|wheel)/,
					process:    function(event, originalEvent) {
						Object.defineProperty(event, 'pageY', {
							value: (function() {
								if(typeof originalEvent.pageY !== 'undefined') {
									return originalEvent.pageY;
								}

								return (function() {
									var pointer = event.target.ownerDocument || document;

									pointer = pointer.documentElement || pointer.body;

									return originalEvent.clientY + (pointer.scrollTop  || 0) - (pointer.clientTop  || 0);
								}());
							}()),
							enumerable: true
						});
					}
				}
			};

		function transferProperties(event, originalEvent, properties) {
			var definitions = {}, i = 0, property;

			for(; (property = properties[i]) && typeof originalEvent[property] !== 'undefined'; i++) {
				definitions[property] = {
					value:      originalEvent[property],
					enumerable: true
				}
			}

			Object.defineProperties(event, definitions);
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
