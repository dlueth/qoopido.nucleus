/**
 * Qoopido dom/element/appear
 *
 * React on elements entering, leaving or nearing the visible are of the browser window
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
 *
 * @require ../element
 */

(function(global, document, setInterval, undefined) {
	'use strict';

	if(document.compatMode !== 'CSS1Compat') {
		throw new Error('Browser needs to be in standards mode');
	}

	function definition(DomElement, functionMerge, functionDebounce) {
		var documentElement  = document.documentElement,
			window           = new DomElement(global),
			viewport         = {},
			storage          = {},
			elements         = [],
			EVENTS_RESIZE    = 'resize orientationchange',
			EVENT_APPEAR     = 'appear',
			EVENT_DISAPPEAR  = 'disappear',
			prototype;

		function updateViewport() {
			viewport.left   = 0;
			viewport.top    = 0;
			viewport.right  = global.innerWidth || documentElement.clientWidth;
			viewport.bottom = global.innerHeight || documentElement.clientHeight;
		}

		function updateBoundaries() {
			var self       = this,
				properties = storage[self.uuid],
				settings   = properties.settings,
				boundaries = properties.boundaries,
				treshold   = settings.threshold,
				x          = (treshold !== undefined) ? treshold : documentElement.clientWidth * settings.auto,
				y          = (treshold !== undefined) ? treshold : documentElement.clientHeight * settings.auto;

			boundaries.left   = viewport.left - x;
			boundaries.top    = viewport.top - y;
			boundaries.right  = viewport.right + x;
			boundaries.bottom = viewport.bottom + y;
		}

		function isWithinBoundaries(element, boundaries) {
			var rect = element.getBoundingClientRect();

			if(rect.right <= boundaries.left || rect.bottom <= boundaries.top || rect.left >= boundaries.right || rect.top >= boundaries.bottom) {
				return false;
			}

			return true;
		}

		function check() {
			var self       = this,
				element    = self.element,
				properties = storage[self.uuid];

			if(isWithinBoundaries(element, viewport)) {
				return 2;
			}

			if(isWithinBoundaries(element, properties.boundaries)) {
				return 1;
			}

			return 0;
		}

		function DomElementAppear(element, settings) {
			var self = this.super.call(this, element),
				uuid = self.uuid;

			settings = functionMerge({}, DomElementAppear.settings, settings);

			if(settings.threshold === 'auto') {
				delete settings.threshold;
			}

			storage[uuid] = {
				settings:   settings,
				boundaries: {},
				state:      0
			};

			window.on(EVENTS_RESIZE, functionDebounce(updateBoundaries.bind(self)));

			updateBoundaries.call(self);
			elements.push(self);
		}

		prototype = DomElement.extend(DomElementAppear);
		prototype.settings = {
			threshold:  'auto',
			recur:      true,
			auto:       1,
			visibility: true
		};

		window.on(EVENTS_RESIZE, functionDebounce(updateViewport))
		updateViewport();

		setInterval(function() {
			var i = 0, element, properties, settings, state;

			for(; element = elements[i]; i++) {
				properties = storage[element.uuid];
				settings   = properties.settings;

				if(!settings.visibility || element.isVisible()) {
					state = check.call(element);

					if(state !== properties.state) {
						switch(state) {
							case 0:
								element.emit(EVENT_DISAPPEAR, { priority: 1 });

								break;
							case 1:
								element.emit(properties.state === 0 ? EVENT_APPEAR : EVENT_DISAPPEAR, { priority: 2 });

								break;
							case 2:
								element.emit(EVENT_APPEAR, { priority: 1 });

								break;
						}

						properties.state = state;
					}

					if(!settings.recur && state === 2) {
						elements.splice(i, 1);
						i--;
					}
				}
			}
		}, 1000 / 30);

		return prototype;
	}

	provide([ '../element', '../../function/merge', '../../function/debounce' ], definition);
}(this, document, setInterval));