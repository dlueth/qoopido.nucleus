/**
 * Qoopido dom/element
 *
 * Provides additional methods for DOM elements
 *
 * Copyright (c) 2015 Dirk Lueth
 *
 * Dual licensed under the MIT and GPL licenses.
 *  - http://www.opensource.org/licenses/mit-license.php
 *  - http://www.gnu.org/copyleft/gpl.html
 *
 * @author Dirk Lueth <info@qoopido.com>
 *
 * @use /demand/validator/isObject
 * @use /demand/validator/isTypeOf
 *
 * @require ../base
 * @require ./event
 * @require ../hook/css
 * @require ../function/descriptor/generate
 * @require ../function/unique/uuid
 * @require ../function/unique/uuid
 */

(function(global, document) {
	'use strict';

	function definition(isObject, isTypeOf, base, Event, hooksCss, supportMethod, functionDescriptorGenerate, functionUniqueUuid) {
		var //shortcuts
				documentBody            = document.body || document.getElementsByTagName('body')[0],
				arrayPrototypeConcat    = Array.prototype.concat,
				arrayPrototypeSlice     = Array.prototype.slice,
				objectDefineProperty    = Object.defineProperty,
				objectDefineProperties  = Object.defineProperties,
				head                    = document.getElementsByTagName('head')[0],
			// constants
				NULL                    = null,
				STRING_UNDEFINED        = 'undefined',
				STRING_STRING           = 'string',
				STRING_CONTENTATTRIBUTE = ('textContent' in document.createElement('a')) ? 'textContent' : 'innerText',
				STRING_MATCHES          = supportMethod('matches', documentBody) || supportMethod('matchesSelector', documentBody),
			// regular expressions
				regexMatchTag           = /^<(\w+)\s*\/>$/,
				regexMatchSpaces        = / +/g,
			// methods
				previousSibling         = (!isTypeOf(head.previousElementSibling, STRING_UNDEFINED)) ? function previousSibling() { return this.previousElementSibling; } : function previousSibling() {var element = this; while(element = element.previousSibling) { if(element.nodeType === 1 ) { return element; }}},
				nextSibling             = (!isTypeOf(head.nextElementSibling, STRING_UNDEFINED)) ? function nextSibling() { return this.nextElementSibling; } : function nextSibling() {var element = this; while(element = element.nextSibling) { if(element.nodeType === 1 ) { return element; }}},
			// flags
			// general storage & objects
				storage                 = {},
				listener                = {};

		function emitEvent(type, detail, uuid) {
			var self = this,
				event;

			event = document.createEvent('CustomEvent');
			event.initCustomEvent(type, (type === 'load') ? false : true, true, detail);

			if(uuid) {
				event._quid      = uuid;
				event.isDelegate = true;
			}

			self.element.dispatchEvent(event);

			if(self.element !== global && !event.defaultPrevented && typeof self.element[type] === 'function') {
				self.element[type]();
			}
		}

		function resolveElement(element) {
			if(typeof element === 'string') {
				try {
					if(regexMatchTag.test(element)) {
						element = document.createElement(element.replace(regexMatchTag, '$1').toLowerCase());
					} else {
						element = document.querySelector(element);
					}
				} catch(exception) {
					element = NULL;
				}
			}

			if(!element) {
				throw new Error('Element could not be resolved');
			}

			return element;
		}

		function resolveArguments(parameters) {
			return arrayPrototypeConcat.apply([], arrayPrototypeSlice(parameters)).join(' ').split(regexMatchSpaces);
		}

		function matchesDelegate(event, delegate) {
			var i = 0, pointer;

			for(; pointer = event.path[i]; i++) {
				if(pointer[STRING_MATCHES](delegate)) {
					event.currentTarget = pointer;

					return true;
				}

				if(pointer === event.currentTarget) {
					break;
				}
			}

			return false;
		}

		function DomElement(element, attributes, styles) {
			var self = this,
				uuid;

			element = resolveElement(element);
			uuid    = element._quid;

			if(!uuid) {
				uuid = functionUniqueUuid();

				objectDefineProperties(self, {
					uuid:    functionDescriptorGenerate(uuid),
					type:    functionDescriptorGenerate(element === global ? '#window' : element.nodeName),
					element: functionDescriptorGenerate(element)
				});

				objectDefineProperty(element, '_quid', functionDescriptorGenerate(uuid));

				storage[uuid]  = self;
				listener[uuid] = {};
			} else {
				self = storage[uuid];
			}

			if(isObject(attributes)) {
				self.setAttributes(attributes);
			}

			if(isObject(styles)) {
				self.setStyles(styles);
			}

			return self;
		}

		DomElement.prototype = {
			/* only for reference
			uuid:    NULL,
			type:    NULL,
			element: NULL
			*/
			getContent: function(getHtml) {
				var element = this.element;

				return getHtml ? element.innerHTML : element[STRING_CONTENTATTRIBUTE];
			},
			getAttribute: function(attribute) {
				var self = this;

				if(isTypeOf(attribute, STRING_STRING)) {
					return self.element.getAttribute(attribute);
				}
			},
			getAttributes: function() {
				var self       = this,
					result     = {},
					attributes = resolveArguments(arguments),
					i = 0, attribute;

				for(; attribute = attributes[i]; i++) {
					result[attribute] = self.element.getAttribute(attribute);
				}

				return result;
			},
			getStyle: function(property) {
				var self = this;

				if(isTypeOf(property, STRING_STRING)) {
					return hooksCss.process('get', self.element, property);
				}
			},
			getStyles: function() {
				var self       = this,
					result     = {},
					properties = resolveArguments(arguments),
					i = 0, property;

				for(; property = properties[i]; i++) {
					result[property] = hooksCss.process('get', self.element, property);
				}

				return result;
			},
			getSiblingBefore: function(selector, strict) {
				var pointer = previousSibling.call(this.element);

				if(!selector) {
					return pointer;
				} else {
					if(strict) {
						return pointer.matches(selector) && pointer;
					}

					for(; pointer; pointer = previousSibling.call(pointer)) {
						if(pointer.nodeType === 1 && pointer.matches(selector)) {
							return pointer;
						}
					}
				}
			},
			getSiblingAfter: function(selector, strict) {
				var pointer = nextSibling.call(this.element);

				if(!selector) {
					return pointer;
				} else {
					if(strict) {
						return pointer.matches(selector) && pointer;
					}

					for(; pointer; pointer = nextSibling.call(pointer)) {
						if(pointer.nodeType === 1 && pointer.matches(selector)) {
							return pointer;
						}
					}
				}
			},
			getSiblings: function(selector) {
				var element  = this.element,
					pointer  = element.parentNode.firstChild,
					siblings = [];

				for(; pointer; pointer = nextSibling.call(pointer)) {
					if(pointer !== element && pointer.nodeType === 1 && (!selector || pointer.matches(selector))) {
						siblings.push(pointer);
					}
				}

				return siblings;
			},
			getSiblingsBefore: function(selector) {
				var pointer  = previousSibling.call(this.element),
					siblings = [];

				for(; pointer; pointer = previousSibling.call(pointer)) {
					if(pointer.nodeType === 1 && (!selector || pointer.matches(selector))) {
						siblings.push(pointer);
					}
				}

				return siblings;
			},
			getSiblingsAfter: function(selector) {
				var pointer  = nextSibling.call(this.element),
					siblings = [];

				for(; pointer; pointer = nextSibling.call(pointer)) {
					if(pointer.nodeType === 1 && (!selector || pointer.matches(selector))) {
						siblings.push(pointer);
					}
				}

				return siblings;
			},
			getChildren: function(selector) {
				var self = this.element,
					uuid, matches;

				selector = selector.trim();

				if(selector === '') {
					matches = self.childNodes;
				} else if(selector.charAt(0) === '>') {
					uuid = self._quid;

					self.setAttribute('nucleus-uuid', uuid);

					selector = '[nucleus-uuid="' + uuid + '"] ' + selector;
					matches  = self.parentNode.querySelectorAll(selector);

					self.removeAttribute('nucleus-uuid');
				} else {
					matches = self.querySelectorAll(selector);
				}

				return matches && arrayPrototypeSlice.call(matches);
			},
			getParent: function(selector, strict) {
				var pointer = this.element.parentNode;

				if(!selector) {
					return pointer;
				} else {
					if(strict) {
						return pointer.matches(selector) && pointer;
					}

					for(; pointer; pointer = pointer.parentNode) {
						if(pointer.nodeType === 1 && pointer.matches(selector)) {
							return pointer;
						}
					}
				}
			},
			getParents: function(selector) {
				var pointer = this.element.parentNode,
					parents = [];

				for(; pointer; pointer = pointer.parentNode) {
					if(pointer.nodeType === 9) {
						return parents;
					} else if (pointer.nodeType === 1) {
						if(!selector || pointer.matches(selector)) {
							parents.push(pointer);
						}
					}
				}
			},
			hasClass: function(name) {
				return (name) ? (new RegExp('(?:^|\\s)' + name + '(?:\\s|$)')).test(this.element.className) : false;
			},
			isVisible: function() {
				var self    = this,
					element = self.element;

				return !((element.offsetWidth <= 0 && element.offsetHeight <= 0) || self.getStyle('visibility') === 'hidden' || self.getStyle('opacity') <= 0);
			},
			setContent: function(source, isHtml) {
				var self    = this,
					element = self.element;

				if(isHtml) {
					element.innerHTML = source;
				} else {
					element[STRING_CONTENTATTRIBUTE] = source;
				}

				return self;
			},
			setAttribute: function(attribute, value) {
				var self = this;

				if(isTypeOf(attribute, STRING_STRING)) {
					self.element.setAttribute(attribute, value);
				}

				return self;
			},
			setAttributes: function(attributes) {
				var self = this,
					attribute;

				if(isObject(attributes) && !attributes.length) {
					for(attribute in attributes) {
						self.setAttribute(attribute, attributes[attribute]);
					}
				}

				return self;
			},
			removeAttribute: function(attribute) {
				var self = this;

				if(isTypeOf(attribute, STRING_STRING)) {
					self.element.removeAttribute(attribute);
				}

				return self;
			},
			removeAttributes: function() {
				var self       = this,
					attributes = resolveArguments(arguments),
					i = 0, attribute;

				for(; attribute = attributes[i]; i++) {
					self.removeAttribute(attribute);
				}

				return self;
			},
			setStyle: function(property, value) {
				var self = this;

				if(isTypeOf(property, STRING_STRING)) {
					hooksCss.process('set', self.element, property, value);
				}

				return self;
			},
			setStyles: function(properties) {
				var self = this,
					property;

				if(isObject(properties) && !properties.length) {
					for(property in properties) {
						hooksCss.process('set', self.element, property, properties[property]);
					}
				}

				return self;
			},
			removeStyle: function(property) {
				var self = this;

				if(isTypeOf(property, STRING_STRING)) {
					self.setStyle(property, '');
				}

				return self;
			},
			removeStyles: function() {
				var self       = this,
					properties = resolveArguments(arguments),
					i = 0, property;

				for(; property = properties[i]; i++) {
					self.setStyle(property, '');
				}

				return self;
			},
			addClass: function(name) {
				var self = this;

				if(name && !self.hasClass(name)) {
					self.element.className += (self.element.className && self.element.className !== '') ? ' ' + name : name;
				}

				return self;
			},
			removeClass: function(name) {
				var self = this;

				if(name && self.hasClass(name)) {
					self.element.className = self.element.className.replace(new RegExp('(?:^|\\s)' + name + '(?!\\S)'), '');
				}

				return self;
			},
			toggleClass: function(name) {
				var self = this;

				if(name) {
					self.hasClass(name) ? self.removeClass(name) : self.addClass(name);
				}

				return self;
			},
			prepend: function(element) {
				var self    = this,
					target = self.element;

				if(element) {
					try {
						element = element.element || resolveElement(element);

						target.firstChild ? target.insertBefore(element, target.firstChild) : self.append(element);
					} catch(exception) {
						target.insertAdjacentHTML('afterBegin', element);
					}
				}

				return self;
			},
			append: function(element) {
				var self   = this,
					target = self.element;

				if(element) {
					try {
						target.appendChild(element.element || resolveElement(element));
					} catch(exception) {
						target.insertAdjacentHTML('beforeEnd', element);
					}
				}

				return self;
			},
			prependTo: function(target) {
				var self    = this,
					element = self.element;

				if(target) {
					(target  = target.element || resolveElement(target)).firstChild ? target.insertBefore(element, target.firstChild) : self.appendTo(target);
				}

				return self;
			},
			appendTo: function(target) {
				var self = this;

				if(target) {
					(target.element || resolveElement(target)).appendChild(self.element);
				}

				return self;
			},
			insertBefore: function(target) {
				var self    = this,
					element = self.element;

				if(target) {
					(target  = target.element || resolveElement(target)).parentNode.insertBefore(element, target);
				}

				return self;
			},
			insertAfter: function(target) {
				var self    = this,
					element = self.element;

				if(target) {
					(target = target.element || resolveElement(target)).nextSibling ? target.parentNode.insertBefore(element, target.nextSibling) : self.appendTo(target.parentNode);
				}

				return self;
			},
			replace: function(target) {
				var self    = this,
					element = self.element;

				if(target) {
					(target  = target.element || resolveElement(target)).parentNode.replaceChild(element, target);
				}

				return self;
			},
			replaceWith: function(element) {
				var self    = this,
					target = self.element;

				if(element) {
					element = element.element || resolveElement(element);

					target.parentNode.replaceChild(element, target);
				}

				return self;
			},
			remove: function() {
				var self    = this,
					element = self.element;

				element.parentNode.removeChild(element);

				return self;
			},
			on: function(events) {
				var self     = this,
					element  = self.element,
					delegate = arguments.length > 2 ? arguments[1] : NULL,
					fn       = delegate ? arguments[2] : arguments[1],
					uuid     = fn._quid || (fn._quid = functionUniqueUuid()),
					i = 0, event;

				events  = events.split(regexMatchSpaces);

				for(; event = events[i]; i++) {
					var id      = event + '-' + uuid,
						handler = function(event) {
							var delegateTo;

							event = new Event(event);

							if(!event.isPropagationStopped) {
								delegateTo  = event.delegate;
								event._quid = functionUniqueUuid();

								if(!delegate || matchesDelegate(event, delegate)) {
									fn.call(event.currentTarget, event, event.originalEvent.detail);
								}

								if(delegateTo) {
									delete event.delegate;

									emitEvent.call(self, delegateTo);
								}
							}
						};

					handler.type            = event;
					listener[self.uuid][id] = handler;

					element.addEventListener(event, handler);
				}

				return self;
			},
			one: function(events) {
				var self     = this,
					delegate = (arguments.length > 3 || typeof arguments[1] === 'string') ? arguments[1] : NULL,
					fn       = (arguments.length > 3 || typeof arguments[2] === 'function') ? arguments[2] : arguments[1],
					each     = ((arguments.length > 3) ? arguments[3] : arguments[2]) !== false,
					handler  = function(event) {
						self.off(((each === true) ? event.type : events), handler);

						fn.call(this, event, event.originalEvent.detail);
					};

				fn._quid = handler._quid = functionUniqueUuid();

				if(delegate) {
					self.on(events, delegate, handler);
				} else {
					self.on(events, handler);
				}

				return self;
			},
			off: function(events, fn) {
				var self    = this,
					element = self.element,
					i = 0, event, id, handler;

				events = events.split(' ');

				for(; event = events[i]; i++) {
					id      = fn._quid && event + '-' + fn._quid || NULL;
					handler = id && listener[self.uuid][id] || NULL;

					if(handler) {
						element.removeEventListener(event, handler);

						delete listener[self.uuid][id];
					} else {
						element.removeEventListener(event, fn);
					}
				}

				return self;
			},
			emit: function(event, data) {
				var self = this;

				emitEvent.call(self, event, data);

				return self;
			}
		};

		return base.extend(DomElement);
	}

	provide([ '/demand/validator/isObject', '/demand/validator/isTypeOf', '../base', './event', '../hooks/css', '../support/method', '../function/descriptor/generate', '../function/unique/uuid' ], definition);
}(this, document));