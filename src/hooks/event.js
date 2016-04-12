/**
 * Qoopido hooks/event
 *
 * Provides event hooks
 *
 * Copyright (c) 2015 Dirk Lueth
 *
 * Dual licensed under the MIT and GPL licenses.
 *  - http://www.opensource.org/licenses/mit-license.php
 *  - http://www.gnu.org/copyleft/gpl.html
 *
 * @author Dirk Lueth <info@qoopido.com>
 */

(function(global, document, undefined) {
	'use strict';

	function definition() {
		var NULL    = null,
			storage = {
				general: {
					properties: 'type altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which path'.split(' '),
					process:    function(event, originalEvent) {
						var pointer;

						event.originalEvent        = originalEvent;
						event.isDefaultPrevented   = !!(originalEvent.defaultPrevented);
						event.isPropagationStopped = !!(originalEvent.cancelBubble);
						event.metaKey              = (originalEvent.metaKey && originalEvent.metaKey !== false) ? true : false;

						if(!event.target) {
							event.target = originalEvent.srcElement || document;
						}

						if(event.target.nodeType === 3) {
							event.target = event.target.parentNode;
						}

						if(!event.path) {
							event.path = [];
							pointer    = event.target;

							do {
								event.path.push(pointer);
							} while(pointer = pointer.parentNode);

							event.path.push(global);
						}
					}
				},
				mouse: {
					match:      /^(?:mouse|pointer|contextmenu|touch|click|dblclick|drag|drop|wheel)/,
					properties: 'button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement dataTransfer deltaX deltaY deltaZ deltaMode targetTouches'.split(' '),
					process:    function(event, originalEvent) {
						var pointer, fromElement, which;

						fromElement = originalEvent.fromElement;
						which       = originalEvent.button;

						if(event.pageX === NULL && originalEvent.clientX !== NULL) {
							pointer = event.target.ownerDocument || document;
							pointer = pointer.documentElement || pointer.body;

							event.pageX = originalEvent.clientX + (pointer.scrollLeft || 0) - (pointer.clientLeft || 0);
							event.pageY = originalEvent.clientY + (pointer.scrollTop  || 0) - (pointer.clientTop  || 0);
						}

						if(!event.relatedTarget && fromElement) {
							event.relatedTarget = (fromElement === event.target) ? originalEvent.toElement : fromElement;
						}

						if(!event.which && which !== undefined) {
							event.which = (which & 1 ? 1 : (which & 2 ? 3 : (which & 4 ? 2 : 0)));
						}
					}
				},
				key: {
					match:      /^(?:key)/,
					properties: 'char charCode key keyCode'.split(' '),
					process:    function(event, originalEvent) {
						if(event.which === NULL) {
							event.which = (originalEvent.charCode !== NULL) ? originalEvent.charCode : originalEvent.keyCode;
						}
					}
				}
			};

		function transferProperties(event, originalEvent, properties) {
			var i = 0,
				property;

			for(; property = properties[i]; i++) {
				event[property] = originalEvent[property];
			}
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
			var id, hook, isMatch;

			for(id in storage) {
				hook    = storage[id];
				isMatch = !hook.match || hook.match.test(originalEvent.type);

				if(isMatch) {
					if(hook.properties) {
						transferProperties(event, originalEvent, hook.properties);
					}

					if(hook.process) {
						hook.process(event, originalEvent);
					}

					if(hook.delegate) {
						event.delegate = hook.delegate;
					}
				}
			}
		}

		return { add: add, get: get, process: process };
	}

	provide(definition);
}(this, document));