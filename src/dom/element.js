/**
 * @use /demand/validator/isObject
 * @use /demand/validator/isInstanceOf
 * @use /demand/validator/isTypeOf
 * @use /demand/function/uuid
 * @use /demand/function/iterate
 * @use /demand/descriptor
 *
 * @require ./event
 * @require ../hooks/css
 * @require ../support/method
 */

(function(global, document) {
	'use strict';

	function definition(isObject, isInstanceOf, isTypeOf, generateUuid, iterate, Descriptor, Event, hooksCss, supportMethod) {
		var //shortcuts
			documentBody             = document.body || document.getElementsByTagName('body')[0],
			arrayPrototypeConcat     = Array.prototype.concat,
			arrayPrototypeSlice      = Array.prototype.slice,
			objectDefineProperty     = Object.defineProperty,
			objectDefineProperties   = Object.defineProperties,
			head                     = document.getElementsByTagName('head')[0],
			// constants
			NULL                     = null,
			STRING_UNDEFINED         = 'undefined',
			STRING_STRING            = 'string',
			STRING_CONTENTATTRIBUTE  = ('textContent' in document.createElement('a')) ? 'textContent' : 'innerText',
			STRING_MATCHES           = supportMethod('matches', documentBody) || supportMethod('matchesSelector', documentBody),
			// regular expressions
			regexMatchTag            = /^<(\w+)\s*\/>$/,
			regexMatchSpaces         = / +/g,
			regexMatchChildSeclector = /^\s*^/,
			// methods
			previousSibling          = (!isTypeOf(head.previousElementSibling, STRING_UNDEFINED)) ? function previousSibling() { return this.previousElementSibling; } : function previousSibling() { var element = this; while(element = element.previousSibling) { if(element.nodeType === 1 ) { return element; } } },
			nextSibling              = (!isTypeOf(head.nextElementSibling, STRING_UNDEFINED)) ? function nextSibling() { return this.nextElementSibling; } : function nextSibling() { var element = this; while(element = element.nextSibling) { if(element.nodeType === 1 ) { return element; } } },
			// flags
			// general storage & objects
			listener                 = {},
			supportsPassiveListener  = false;

		(function() {
			var noop  = function() {},
				event = '' + (+new Date()),
				options;

			try {
				options = Object.defineProperty({}, 'passive', {
					get: function() {
						supportsPassiveListener = true;
					}
				});

				global.addEventListener(event, noop, options);
				global.removeEventListener(event, noop, options);
			} catch(error) {} /* eslint-disable-line no-empty */
		}());

		function processOptions(options) {
			if(supportsPassiveListener || typeof options === 'boolean') {
				return options;
			}

			return options.capture;
		}

		function emitEvent(type, detail, uuid) {
			var self = this,
				event;

			event = document.createEvent('CustomEvent');
			event.initCustomEvent(type, type !== 'load', true, detail);

			if(uuid) {
				event.uuid       = uuid;
				event.isDelegate = true;
			}

			self.node.dispatchEvent(event);

			if(self.node !== global && !event.defaultPrevented && typeof self.node[type] === 'function') {
				self.node[type]();
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
			return arrayPrototypeConcat.apply([], arrayPrototypeSlice.call(parameters)).join(' ').split(regexMatchSpaces);
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

		function getSiblings(pointer, method, selector, limit, strict) {
			var multiple = !(limit && limit === 1),
				siblings = multiple ? [] : false;

			strict = multiple ? false : strict;

			while(pointer = method.call(pointer)) {
				if(pointer.nodeType === 1) {
					if(!selector || pointer[STRING_MATCHES](selector)) {
						if(multiple) {
							siblings.push(pointer);
						} else {
							return pointer;
						}
					}

					if(strict) {
						break;
					}
				}
			}

			return siblings;
		}

		function getParents(pointer, selector, limit, strict) {
			var multiple = !(limit && limit === 1),
				parents = multiple ? [] : false;

			strict   = multiple ? false : strict;

			while(pointer = pointer.parentNode) {
				if(pointer.nodeType === 1) {
					if(!selector || pointer[STRING_MATCHES](selector)) {
						if(multiple) {
							parents.push(pointer);
						} else {
							return pointer;
						}
					}

					if(strict) {
						break;
					}
				}
			}

			return parents
		}

		function DomElement(element, attributes, styles) {
			var self = this,
				uuid;

			element = resolveElement(element);
			uuid    = element.uuid;

			if(!uuid) {
				uuid           = generateUuid();
				listener[uuid] = {};

				objectDefineProperty(element, 'uuid', new Descriptor(uuid));
			}

			objectDefineProperties(self, {
				uuid: new Descriptor(uuid),
				type: new Descriptor(element === global ? '#window' : element.nodeName),
				node: new Descriptor(element)
			});

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
			 uuid: NULL,
			 type: NULL,
			 node: NULL
			 */
			clone: function() {
				return new DomElement(this.node.cloneNode(true));
			},
			focus: function() {
				this.node.focus();

				return this;
			},
			blur: function() {
				this.node.blur();

				return this;
			},
			getPosition: function() {
				var bbox = this.node.getBoundingClientRect();

				return {
					left: bbox.left + documentBody.scrollLeft,
					top:  bbox.top + documentBody.scrollTop
				};
			},
			getOffset: function(viewport) {
				var node = this.node,
					bbox = viewport ? node.getBoundingClientRect() : null;

				return {
					left: viewport ? bbox.left : node.offsetLeft,
					top:  viewport ? bbox.top : node.offsetTop
				};
			},
			getWidth: function(includeMargin) {
				var node  = this.node,
					width = node.offsetWidth,
					style;

				if(includeMargin) {
					style = getComputedStyle(node);

					width += parseInt(style.marginLeft) + parseInt(style.marginRight);
				}

				return width;
			},
			getHeight: function(includeMargin) {
				var node   = this.node,
					height = node.offsetHeight,
					style;

				if(includeMargin) {
					style = getComputedStyle(node);

					height += parseInt(style.marginTop) + parseInt(style.marginBottom);
				}

				return height;
			},
			getContent: function(getHtml) {
				var node = this.node;

				return getHtml ? node.innerHTML : node[STRING_CONTENTATTRIBUTE];
			},
			getAttribute: function(attribute) {
				var self = this;

				if(isTypeOf(attribute, STRING_STRING)) {
					return self.node.getAttribute(attribute);
				}
			},
			getAttributes: function() {
				var self       = this,
					result     = {},
					attributes = resolveArguments(arguments),
					i = 0, attribute;

				for(; attribute = attributes[i]; i++) {
					result[attribute] = self.node.getAttribute(attribute);
				}

				return result;
			},
			getStyle: function(property) {
				var self = this;

				if(isTypeOf(property, STRING_STRING)) {
					return hooksCss.process('get', self.node, property);
				}
			},
			getStyles: function() {
				var self       = this,
					result     = {},
					properties = resolveArguments(arguments),
					i = 0, property;

				for(; property = properties[i]; i++) {
					result[property] = hooksCss.process('get', self.node, property);
				}

				return result;
			},
			getSiblingBefore: function(selector, strict) {
				return getSiblings(this.node, previousSibling, selector, 1, strict);
			},
			getSiblingAfter: function(selector, strict) {
				return getSiblings(this.node, nextSibling, selector, 1, strict);
			},
			getSiblings: function(selector) {
				return this.getSiblingsBefore(selector).concat(this.getSiblingsAfter(selector));
			},
			getSiblingsBefore: function(selector) {
				return getSiblings(this.node, previousSibling, selector);
			},
			getSiblingsAfter: function(selector) {
				return getSiblings(this.node, nextSibling, selector);
			},
			getChildren: function(selector) {
				var self = this.node,
					uuid, matches, i, match;

				if(!selector) {
					matches = [];

					for(i = 0; match = self.childNodes[i]; i++) {
						if(match.nodeType === 1) {
							matches.push(match);
						}
					}
				} else if(regexMatchChildSeclector.test(selector)) {
					uuid = self.uuid;

					self.setAttribute('nucleus-uuid', uuid);

					selector = '[nucleus-uuid="' + uuid + '"] ' + selector;
					matches  = arrayPrototypeSlice.call(self.parentNode.querySelectorAll(selector));

					self.removeAttribute('nucleus-uuid');
				} else {
					matches = arrayPrototypeSlice.call(self.querySelectorAll(selector));
				}

				return matches;
			},
			getParent: function(selector, strict) {
				return getParents(this.node, selector, 1, strict);
			},
			getParents: function(selector) {
				return getParents(this.node, selector);
			},
			hasChild: function(child) {
				var node = this.node;

				return node !== child && node.contains(child.node || child);
			},
			hasClass: function(name) {
				return (name) ? (new RegExp('(?:^|\\s)' + name + '(?:\\s|$)')).test(this.node.className) : false;
			},
			isVisible: function() {
				var self = this,
					node = self.node;

				return !((node.offsetWidth <= 0 && node.offsetHeight <= 0) || self.getStyle('visibility') === 'hidden' || self.getStyle('opacity') <= 0);
			},
			setContent: function(source, isHtml) {
				var self = this,
					node = self.node;

				if(isHtml) {
					node.innerHTML = source;
				} else {
					node[STRING_CONTENTATTRIBUTE] = source;
				}

				return self;
			},
			setAttribute: function(attribute, value) {
				var self = this;

				if(isTypeOf(attribute, STRING_STRING)) {
					self.node.setAttribute(attribute, value);
				}

				return self;
			},
			setAttributes: function(attributes) {
				var self = this;

				iterate(attributes, function(attribute, value) {
					self.setAttribute(attribute, value);
				});

				return self;
			},
			removeAttribute: function(attribute) {
				var self = this;

				if(isTypeOf(attribute, STRING_STRING)) {
					self.node.removeAttribute(attribute);
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
					hooksCss.process('set', self.node, property, value);
				}

				return self;
			},
			setStyles: function(properties) {
				var self = this;

				iterate(properties, function(property, value) {
					hooksCss.process('set', self.node, property, value);
				});

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
					self.node.className += (self.node.className) ? ' ' + name : name;
				}

				return self;
			},
			removeClass: function(name) {
				var self = this;

				if(name && self.hasClass(name)) {
					self.node.className = self.node.className.replace(new RegExp('(?:^|\\s)' + name + '(?!\\S)'), '').trim();
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
					target = self.node;

				if(element) {
					try {
						element = (isInstanceOf(element, DomElement)) ? element.node : resolveElement(element);

						target.firstChild ? target.insertBefore(element, target.firstChild) : self.append(element);
					} catch(exception) {
						target.insertAdjacentHTML('afterBegin', element);
					}
				}

				return self;
			},
			append: function(element) {
				var self   = this,
					target = self.node;

				if(element) {
					try {
						target.appendChild((isInstanceOf(element, DomElement)) ? element.node : resolveElement(element));
					} catch(exception) {
						target.insertAdjacentHTML('beforeEnd', element);
					}
				}

				return self;
			},
			prependTo: function(target) {
				var self = this,
					node = self.node;

				if(target) {
					(target  = target.node || resolveElement(target)).firstChild ? target.insertBefore(node, target.firstChild) : self.appendTo(target);
				}

				return self;
			},
			appendTo: function(target) {
				var self = this;

				if(target) {
					(target.node || resolveElement(target)).appendChild(self.node);
				}

				return self;
			},
			insertBefore: function(target) {
				var self = this,
					node = self.node;

				if(target) {
					(target  = target.node || resolveElement(target)).parentNode.insertBefore(node, target);
				}

				return self;
			},
			insertAfter: function(target) {
				var self = this,
					node = self.node;

				if(target) {
					(target = target.node || resolveElement(target)).nextSibling ? target.parentNode.insertBefore(node, target.nextSibling) : self.appendTo(target.parentNode);
				}

				return self;
			},
			replace: function(target) {
				var self = this,
					node = self.node;

				if(target) {
					(target  = target.node || resolveElement(target)).parentNode.replaceChild(node, target);
				}

				return self;
			},
			replaceWith: function(element) {
				var self    = this,
					target = self.node;

				if(element) {
					element = (isInstanceOf(element, DomElement)) ? element.node : resolveElement(element);

					target.parentNode.replaceChild(element, target);
				}

				return self;
			},
			detach: function() {
				var self = this,
					node = self.node;

				node.parentNode.removeChild(node);

				return self;
			},
			on: function(events) {
				var self     = this,
					delegate = (arguments.length === 4 || typeof arguments[1] === 'string') ? arguments[1] : NULL,
					fn       = (arguments.length === 4 || typeof arguments[2] === 'function') ? arguments[2] : arguments[1],
					options  = processOptions((arguments.length > 3) ? arguments[3] : arguments[2]),
					uuid     = fn.uuid || (fn.uuid = generateUuid()),
					i = 0, event;

				events = events.split(regexMatchSpaces);

				for(; event = events[i]; i++) {
					var id      = event + '-' + uuid,
						handler = function(event) {
							var delegateTo;

							event = new Event(event);

							if(!event.isPropagationStopped) {
								delegateTo  = event.delegate;
								event.uuid = generateUuid();

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

					self.node.addEventListener(event, handler, options);
				}

				return self;
			},
			one: function(events) {
				var self     = this,
					delegate = (arguments.length === 5 || typeof arguments[1] === 'string') ? arguments[1] : NULL,
					fn       = (arguments.length === 5 || typeof arguments[2] === 'function') ? arguments[2] : arguments[1],
					options  = processOptions((arguments.length > 3) ? arguments[3] : arguments[2]),
					each     = ((arguments.length > 4) ? arguments[4] : arguments[3]) !== false,
					handler  = function(event) {
						self.off(((each === true) ? event.type : events), handler, options);

						fn.call(this, event, event.originalEvent.detail);
					};

				fn.uuid = handler.uuid = generateUuid();

				if(delegate) {
					self.on(events, delegate, handler, options);
				} else {
					self.on(events, handler, options);
				}

				return self;
			},
			off: function(events, fn, options) {
				var self = this,
					node = self.node,
					i = 0, event, id, handler;

				options = processOptions(options);
				events  = events.split(' ');

				for(; event = events[i]; i++) {
					id      = fn.uuid && event + '-' + fn.uuid || NULL;
					handler = id && listener[self.uuid][id] || NULL;

					if(handler) {
						node.removeEventListener(event, handler, options);

						delete listener[self.uuid][id];
					} else {
						node.removeEventListener(event, fn, options);
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

		return DomElement;
	}

	provide([ '/demand/validator/isObject', '/demand/validator/isInstanceOf', '/demand/validator/isTypeOf', '/demand/function/uuid', '/demand/function/iterate', '/demand/descriptor', './event', '../hooks/css', '../support/method' ], definition);
}(this, document));
