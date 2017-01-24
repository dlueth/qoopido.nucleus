/**
 * @use /demand/validator/isTypeOf
 * @use /demand/validator/isInstanceOf
 * @use /demand/class/descriptor
 *
 * @require ../element
 */

(function(document) {
	'use strict';

	function definition(isTypeOf, isInstanceOf, Descriptor, DomElement) {
		var arrayPrototypeSlice  = Array.prototype.slice,
			objectDefineProperty = Object.defineProperty;

		function resolveElements(elements) {
			var selectors, selector, i = 0;

			if(isTypeOf(elements, 'string')) {
				selectors = elements.split(',');
				elements  = [];

				for(i = 0; selector = selectors[i]; i++) {
					try {
						elements = elements.concat(arrayPrototypeSlice.call(document.querySelectorAll(selector)));
					} catch(exception) {} // eslint-disable-line no-empty
				}
			}

			if(elements.length && !Array.isArray(elements)) {
				elements = arrayPrototypeSlice.call(elements);
			}

			if(!Array.isArray(elements)) {
				elements = [ elements ];
			}

			return elements;
		}

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
				fragment.appendChild(element.node);
			}

			return fragment;
		}

		function DomCollection(elements) {
			var self = this;

			objectDefineProperty(self, 'elements', new Descriptor([]));
			objectDefineProperty(self, 'nodes', new Descriptor([]));

			if(elements) {
				self.add(elements);
			}
		}

		DomCollection.prototype = {
			/* only for reference
			elements: null,
			nodes:    null
			*/
			get length() {
				return this.elements.length;
			},
			get: function(index) {
				return this.elements[index];
			},
			add: function(elements) {
				var self = this,
					i = 0, temp;

				elements = resolveElements(elements);

				for(; temp = elements[i]; i++) {
					if(self.nodes.indexOf(temp.node || temp) === -1) {
						temp = isInstanceOf(temp, DomElement) ? temp : new DomElement(temp);

						self.elements.push(temp);
						self.nodes.push(temp.node);
					}
				}

				return self;
			},
			remove: function(elements) {
				var self = this,
					i = 0, temp, index;

				elements = resolveElements(elements);

				for(; temp = elements[i]; i++) {
					if((index = self.nodes.indexOf(temp.node || temp)) !== -1) {
						self.elements.splice(index, 1);
						self.nodes.splice(index, 1);
					}
				}

				return self;
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

				if(target && (target = target.node)) {
					target.parentNode.insertBefore(buildFragment(self.elements), target);
				}

				return self;
			},
			insertAfter: function(target) {
				var self = this,
					sibling, fragment;

				target = isInstanceOf(target, DomElement) ? target : new DomElement(target);

				if(target && (target = target.node)) {
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
			detach: function() {
				var self     = this,
					elements = self.elements,
					i = 0, element;

				for(; element = elements[i]; i++) {
					element.detach();
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

		return DomCollection;
	}

	provide([ '/demand/validator/isTypeOf', '/demand/validator/isInstanceOf', '/demand/class/descriptor', './element' ], definition);
}(document));