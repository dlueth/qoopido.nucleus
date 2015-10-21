/**
 * Qoopido dom/event
 *
 * Provides DOM event normalization
 *
 * Copyright (c) 2015 Dirk Lueth
 *
 * Dual licensed under the MIT and GPL licenses.
 *  - http://www.opensource.org/licenses/mit-license.php
 *  - http://www.gnu.org/copyleft/gpl.html
 *
 * @author Dirk Lueth <info@qoopido.com>
 */

(function() {
	'use strict';

	function definition(base, hooksEvent) {
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

		return base.extend(DomEvent);
	}

	provide([ '../base', '../hooks/event' ], definition);
}());