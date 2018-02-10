/**
 * @use /demand/weakmap
 *
 * @require ../emitter
 * @require ../function/merge
 */

(function() {
	'use strict';

	function definition(Weakmap, Emitter, functionMerge) {
		var storage = new Weakmap();

		function getStorageProperty(context, property) {
			var properties;

			if(properties = storage.get(context)) {
				return properties[property];
			}
		}

		function getDataProperty(context, property) {
			var properties;

			if((properties = storage.get(context)) && properties.data) {
				return properties.data[property];
			}
		}

		function ComponentIterator(data, settings) {
			var self = Emitter.call(this);

			storage.set(self, {
				settings: functionMerge({}, ComponentIterator.settings, settings),
				index:    null,
				data:     null
			});

			data && self.setData(data);

			return self;
		}

		ComponentIterator.prototype = {
			// properties
				// length
					get length() {
						return getDataProperty(this, 'length') || 0;
					},
				// index
					get index() {
						return getStorageProperty(this, 'index');
					},
				// item
					get item() {
						return getDataProperty(this, this.index);
					},
			// methods
				setData: function(data) {
					var self = this,
						properties, settings;

					if(typeof data === 'object' && data.length) {
						properties = storage.get(self);
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
						properties = storage.get(self);

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
						settings   = storage.get(self).settings,
						index;

					index = (settings.loop === true) ? (self.index - 1) % self.length : self.index - 1;
					index = (settings.loop === true && index < 0) ? self.length + index : index;

					return self.seek(index);
				},
				next: function() {
					var self       = this,
						settings   = storage.get(self).settings,
						index;

					index = (settings.loop === true) ? (self.index + 1) % self.length : self.index + 1;

					return self.seek(index);
				}
		};

		ComponentIterator.settings = { loop: true, initial: 0 };

		return ComponentIterator.extends(Emitter);
	}

	provide([ '/demand/weakmap', '../emitter', '../function/merge' ], definition);
}());
