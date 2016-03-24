/**
 * Qoopido emitter
 *
 * Provides mechanism to emit events and register listeners
 *
 * Copyright (c) 2015 Dirk Lueth
 *
 * Dual licensed under the MIT and GPL licenses.
 *  - http://www.opensource.org/licenses/mit-license.php
 *  - http://www.gnu.org/copyleft/gpl.html
 *
 * @author Dirk Lueth <info@qoopido.com>
 *
 * @require ./base
 * @require ./function/unique/uuid
 */

(function(undefined) {
	'use strict';

	function definition(base, functionDescriptorGenerate, functionUniqueUuid) {
		var regexMatchExcludedMethods      = /^(_|((get|has|is)([A-Z]|$))|(on|one|off|emit)$)/,
			objectDefineProperty           = Object.defineProperty,
			objectGetOwnPropertyNames      = Object.getOwnPropertyNames,
			objectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor,
			objectGetPrototypeOf           = Object.getPrototypeOf,
			objectPrototype                = Object.prototype,
			storage                        = {};

		function getPropertyNames(object) {
			var prototype = object,
				keys      = [],
				names, i, name;

			while(prototype !== objectPrototype) {
				for(names = objectGetOwnPropertyNames(prototype), i = 0; name = names[i]; i++) {
					keys.indexOf(name) === -1 && keys.push(name);
				}

				prototype = prototype.__proto__;
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

		function conceal() {
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
			var self = this,
				uuid = self.uuid;

			!uuid && (uuid = functionUniqueUuid()) && objectDefineProperty(self, 'uuid', functionDescriptorGenerate(uuid));

			storage[uuid] = {};

			if(objectGetPrototypeOf(self) !== Emitter.prototype) {
				conceal.call(self);
			}

			return self;
		}

		Emitter.prototype = {
			/* only for reference
			uuid: null,
			*/
			on: function(events, fn) {
				var self    = this,
					pointer = storage[self.uuid],
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
					pointer = storage[self.uuid],
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
					for(event in self.listener) {
						pointer[event].length = 0;
					}
				}

				return self;
			},
			emit: function(event) {
				var self = this,
					pointer, temp, i = 0, listener;

				if(event) {
					pointer = storage[self.uuid];

					pointer[event] = pointer[event] || [];
					temp           = pointer[event].slice();

					for(; (listener = temp[i]) !== undefined; i++) {
						listener.apply(self, arguments);
					}
				}

				return self;
			}
		};

		return base.extend(Emitter);
	}

	provide([ './base', './function/descriptor/generate', './function/unique/uuid' ], definition);
}());