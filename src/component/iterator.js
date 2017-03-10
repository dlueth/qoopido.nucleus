/**
 * @require ../emitter
 * @require ../function/merge
 */

(function() {
	'use strict';

	function definition(Emitter, functionMerge) {
		var storage = {};

		function getStorageProperty(uuid, property) {
			var properties;

			if(properties = storage[uuid]) {
				return properties[property];
			}
		}

		function getDataProperty(uuid, property) {
			var properties;

			if((properties = storage[uuid]) && properties.data) {
				return properties.data[property];
			}
		}

		function ComponentIterator(data, settings) {
			var self = Emitter.call(this);

			storage[self.uuid] = {
				settings: functionMerge({}, ComponentIterator.settings, settings),
				index:    null,
				data:     null
			};

			data && self.setData(data);

			return self;
		}

		ComponentIterator.prototype = {
			// properties
				// length
					get length() {
						return getDataProperty(this.uuid, 'length') || 0;
					},
				// index
					get index() {
						return getStorageProperty(this.uuid, 'index');
					},
				// item
					get item() {
						return getDataProperty(this.uuid, this.index);
					},
			// methods
				setData: function(data) {
					var self = this,
						uuid, properties, settings;

					if(typeof data === 'object' && data.length) {
						uuid       = self.uuid;
						properties = storage[uuid];
						settings   = properties.settings;

						properties.data = data;

						if(settings.initial !== null) {
							self.seek(settings.initial);
						}
					}

					return self;
				},
				seek: function(index) {
					var self       = this,
						properties = storage[self.uuid];

					index = parseInt(index, 10);

					if(index !== properties.index && typeof properties.data[index] !== 'undefined') {
						properties.index = index;
					}

					return self;
				},
				first: function() {
					return this.seek(0);
				},
				last: function() {
					var self = this;

					return self.seek(self.length - 1);
				},
				previous: function() {
					var self       = this,
						uuid       = self.uuid,
						settings   = storage[uuid].settings,
						index;

					index = (settings.loop === true) ? (self.index - 1) % self.length : self.index - 1;
					index = (settings.loop === true && index < 0) ? self.length + index : index;

					return self.seek(index);
				},
				next: function() {
					var self       = this,
						uuid       = self.uuid,
						settings   = storage[uuid].settings,
						index;

					index = (settings.loop === true) ? (self.index + 1) % self.length : self.index + 1;

					return self.seek(index);
				}
		};

		ComponentIterator.settings = { loop: true, initial: 0 };

		return ComponentIterator.extends(Emitter);
	}

	provide([ '../emitter', '../function/merge' ], definition);
}());