/**
 * @use /demand/abstract/uuid
 */

(function(undefined) {
	'use strict';

	function definition(ClassWeakmap, iterate) {
		var regexMatchExcludedMethods      = /^(_|((get|has|is)([A-Z]|$))|(on|one|off|emit|constructor)$)/,
			objectDefineProperty           = Object.defineProperty,
			objectGetOwnPropertyNames      = Object.getOwnPropertyNames,
			objectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor,
			objectGetPrototypeOf           = Object.getPrototypeOf,
			objectPrototype                = Object.prototype,
			storage                        = new ClassWeakmap();

		function getPropertyNames(object) {
			var prototype = object,
				keys      = [],
				names, i, name;

			try {
				while(prototype !== objectPrototype) {
					for(names = objectGetOwnPropertyNames(prototype), i = 0; (name = names[i]); i++) {
						keys.indexOf(name) === -1 && keys.push(name);
					}

					prototype = prototype.__proto__;
				}
			} catch(error) {
				// required for IE compatibility
			}

			return keys;
		}

		function getPropertyDescriptor(object, property) {
			var prototype = object,
				descriptor;

			while(prototype && !(descriptor = objectGetOwnPropertyDescriptor(prototype, property))) {
				prototype = prototype.__proto__;
			}

			return descriptor;
		}

		function wrap() {
			var self       = this,
				prototype  = self.constructor.prototype,
				properties = getPropertyNames(prototype);

			properties.forEach(function(property) {
				var descriptor = getPropertyDescriptor(prototype, property),
					event;

				if(typeof self[property] === 'function' && regexMatchExcludedMethods.test(property) === false) {
					event = property.charAt(0).toUpperCase() + property.slice(1);

					descriptor.value = function() {
						var result;

						self.emit('pre' + event, arguments);

						result = prototype[property].apply(self, arguments);

						self.emit('post' + event, arguments, result);

						return result;
					};

					objectDefineProperty(self, property, descriptor);
				}
			});
		}

		function Emitter() {
			storage.set(this, {});

			if(objectGetPrototypeOf(self) !== Emitter.prototype) {
				wrap.call(this);
			}

			return this;
		}

		Emitter.prototype = {
			on: function(events, fn) {
				var self    = this,
					pointer = storage.get(this),
					i = 0, event;

				events = events.split(' ');

				for(; (event = events[i]) !== undefined; i++) {
					(pointer[event] = pointer[event] || []).push(fn);
				}

				return self;
			},
			one: function(events, fn, each) {
				var self = this;

				each = (each !== false);

				self.on(events, function listener(event) {
					self.off(((each === true) ? event : events), listener);

					fn.apply(this, arguments);
				});

				return self;
			},
			off: function(events, fn) {
				var self    = this,
					pointer = storage.get(this),
					i = 0, event, j, listener;

				if(events) {
					events = events.split(' ');

					for(; (event = events[i]) !== undefined; i++) {
						pointer[event] = pointer[event] || [];

						if(fn) {
							for(j = 0; (listener = pointer[event][j]) !== undefined; j++) {
								if(listener === fn) {
									pointer[event].splice(j, 1);

									j--;
								}
							}
						} else {
							pointer[event].length = 0;
						}
					}
				} else {
					iterate(self.listener, function(event) {
						pointer[event].length = 0;
					});
				}

				return self;
			},
			emit: function(event) {
				var self = this,
					pointer, temp, i = 0, listener;

				if(event) {
					pointer = storage.get(this);

					pointer[event] = pointer[event] || [];
					temp           = pointer[event].slice();

					for(; (listener = temp[i]) !== undefined; i++) {
						listener.apply(self, arguments);
					}
				}

				return self;
			}
		};

		return Emitter;
	}

	provide([ '/demand/weakmap', '/demand/function/iterate' ], definition);
}());
