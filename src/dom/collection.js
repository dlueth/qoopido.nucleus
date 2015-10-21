/**
 * Qoopido dom/collection
 *
 * Provides additional methods for DOM element collections
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
 * @use /demand/validator/isInstanceOf
 *
 * @require ../base
 * @require ../element
 * @require ../function/descriptor/generate
 */

(function(document) {
	'use strict';

	function definition(isObject, isTypeOf, isInstanceOf, base, DomElement, functionDescriptorGenerate) {
		var arrayPrototypeSlice  = Array.prototype.slice,
			objectDefineProperty = Object.defineProperty;

		function map(method) {
			var self      = this,
				elements  = self.elements,
				parameter = arrayPrototypeSlice.call(arguments, 1),
				i = 0, element;

			for(; element = elements[i]; i++) {
				element[method].apply(element, parameter);
			}

			return self;
		}

		function mapFragment(target, method) {
			var self = this;

			target = isInstanceOf(target, DomElement) ? target : new DomElement(target);

			if(target) {
				target[method].call(target, buildFragment(self.elements));
			}

			return self;
		}

		function buildFragment(elements) {
			var fragment = document.createDocumentFragment(),
				i = 0, element;

			for(; element = elements[i]; i++) {
				fragment.appendChild(element.element);
			}

			return fragment;
		}

		function DomCollection(elements, attributes, styles) {
			var self = this,
				selectors, selector, i, element;

			if(isTypeOf(elements, 'string')) {
				selectors = elements.split(',');
				elements  = [];

				for(i = 0; selector = selectors[i]; i++) {
					try {
						elements = elements.concat(arrayPrototypeSlice.call(document.querySelectorAll(selector)));
					} catch(exception) {} // eslint-disable-line no-empty
				}
			}

			if(!Array.isArray(elements)) {
				elements = arrayPrototypeSlice.call(elements);
			}

			for(i = 0; element = elements[i]; i++) {
				elements[i] = new DomElement(element);
			}

			objectDefineProperty(self, 'elements', functionDescriptorGenerate(elements));

			isObject(attributes) && self.setAttributes(attributes);
			isObject(styles) && self.setStyles(styles);
		}

		DomCollection.prototype = {
			/* only for reference
			elements: null,
			*/
			get length() {
				return this.elements.length;
			},
			get: function(index) {
				return this.elements[index];
			},
			each: function(callback) {
				var self     = this,
					elements = self.elements,
					i = 0, element;

				for(; element = elements[i]; i++) {
					callback.call(element, i);
				}

				return self;
			},
			setAttribute: function(attribute, value) {
				return map.call(this, 'setAttribute', attribute, value);
			},
			setAttributes: function(attributes) {
				return map.call(this, 'setAttributes', attributes);
			},
			removeAttribute: function(attribute) {
				return map.call(this, 'removeAttribute', attribute);
			},
			removeAttributes: function(attributes) {
				return map.call(this, 'removeAttributes', attributes);
			},
			setStyle: function(property, value) {
				return map.call(this, 'setStyle', property, value);
			},
			setStyles: function(properties) {
				return map.call(this, 'setStyles', properties);
			},
			removeStyle: function(property) {
				return map.call(this, 'removeStyle', property);
			},
			removeStyles: function(properties) {
				return map.call(this, 'removeStyles', properties);
			},
			addClass: function(name) {
				return map.call(this, 'addClass', name);
			},
			removeClass: function(name) {
				return map.call(this, 'removeClass', name);
			},
			toggleClass: function(name) {
				return map.call(this, 'toggleClass', name);
			},
			prependTo: function(target) {
				return mapFragment.call(this, target, 'prepend');
			},
			appendTo: function(target) {
				return mapFragment.call(this, target, 'append');
			},
			insertBefore: function(target) {
				var self = this;

				target = isInstanceOf(target, DomElement) ? target : new DomElement(target);

				if(target && (target = target.element)) {
					target.parentNode.insertBefore(buildFragment(self.elements), target);
				}

				return self;
			},
			insertAfter: function(target) {
				var self = this,
					sibling, fragment;

				target = isInstanceOf(target, DomElement) ? target : new DomElement(target);

				if(target && (target = target.element)) {
					fragment = buildFragment(self.elements);

					(sibling = target.nextSibling) ? target.parentNode.insertBefore(fragment, sibling) : target.parentNode.appendChild(fragment);
				}

				return self;
			},
			replace: function(target) {
				var self     = this,
					elements = self.elements,
					i = 0, element;

				for(; element = elements[i]; i++) {
					if(i === 0) {
						element.replace(target);
					} else {
						element.insertAfter(elements[i - 1]);
					}
				}

				return self;
			},
			remove: function(index) {
				var self     = this,
					elements = self.elements,
					i, element;

				if((index || index === 0) && (element = self.elements[index])) {
					element.remove();
					elements.splice(index, 1);
				} else {
					i = elements.length - 1;

					for(; element = elements[i]; i--) {
						element.remove();
						elements.pop();
					}
				}

				return self;
			},
			on: function() {
				return map.apply(this, [ 'on' ].concat(arrayPrototypeSlice.call(arguments)));
			},
			one: function() {
				return map.apply(this, [ 'one' ].concat(arrayPrototypeSlice.call(arguments)));
			},
			off: function() {
				return map.apply(this, [ 'off' ].concat(arrayPrototypeSlice.call(arguments)));
			},
			emit: function() {
				return map.apply(this, [ 'emit' ].concat(arrayPrototypeSlice.call(arguments)));
			}
		};

		return base.extend(DomCollection);
	}

	provide([ '/demand/validator/isObject', '/demand/validator/isTypeOf', '/demand/validator/isInstanceOf', '../base', './element', '../function/descriptor/generate' ], definition);
}(document));