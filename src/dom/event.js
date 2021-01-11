/**
 * @require ../hooks/event
 */

(function(global) {
	'use strict';

	function definition(hooksEvent) {
		function getTarget(event) {
			var target = event.target || event.srcElement || document;

			return target.nodeType === 3 ? target.parentNode : target;
		}

		function getPath(event) {
			var path    = [],
				pointer = event.target;

			do {
				path.push(pointer);
			} while((pointer = pointer.parentNode));

			path.push(global);

			return path;
		}

		function DomEvent(event) {
			var self          = this,
				currentTarget = event.currentTarget;

			Object.defineProperties(self, {
				target:               { value: getTarget(event), enumerable: true },
				path:                 { value: getPath(event), enumerable: true },
				originalEvent:        { value: event, enumerable: true },
				isDefaultPrevented:   { get: function() { return !!(event.defaultPrevented); }, enumerable: true },
				isPropagationStopped: { get: function() { return !!(event.cancelBubble); }, enumerable: true },
				currentTarget:        {
					get:        function() { return currentTarget; },
					set:        function(node) { if(self.path.indexOf(node) !== -1) { currentTarget = node; } },
					enumerable: true
				}
			});

			return hooksEvent.process(self, event);
		}

		DomEvent.prototype = {
			isDelegate: false,
			preventDefault: function() {
				var self  = this,
					event = self.originalEvent;

				if(self.cancelable !== false && !self.passive) {
					if(event.preventDefault) {
						event.preventDefault();
					} else {
						event.returnValue = false;
					}
				}
			},
			stopPropagation: function() {
				var self  = this,
					event = self.originalEvent;

				if(event.stopPropagation) {
					event.stopPropagation();
				}

				event.cancelBubble= true;
			},
			stopImmediatePropagation: function() {
				var self  = this,
					event = self.originalEvent;

				if(event.stopImmediatePropagation) {
					event.stopImmediatePropagation();
				}

				self.stopPropagation();
			}

		};

		return DomEvent;
	}

	provide([ '../hooks/event' ], definition);
}(this));
