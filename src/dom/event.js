/**
 * @require ../hooks/event
 */

(function() {
	'use strict';

	function definition(hooksEvent) {
		function DomEvent(event) {
			hooksEvent.process(this, event);
		}

		DomEvent.prototype = {
			originalEvent:                 null,
			isDelegate:                    false,
			isDefaultPrevented:            false,
			isPropagationStopped:          false,
			isImmediatePropagationStopped: false,
			preventDefault: function() {
				var self  = this,
					event = self.originalEvent;

				if(event.cancelable !== false) {
					self.isDefaultPrevented = true;

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

				self.isPropagationStopped = true;

				if(event.stopPropagation) {
					event.stopPropagation();
				}

				event.cancelBubble= true;
			},
			stopImmediatePropagation: function() {
				var self  = this,
					event = self.originalEvent;

				self.isImmediatePropagationStopped = true;

				if(event.stopImmediatePropagation) {
					event.stopImmediatePropagation();
				}

				self.stopPropagation();
			}

		};

		return DomEvent;
	}

	provide([ '../hooks/event' ], definition);
}());