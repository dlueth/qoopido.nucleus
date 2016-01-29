/**
 * Qoopido component/sense
 *
 * Provides facilities to register to media queries matching/unmatching
 *
 * Copyright (c) 2015 Dirk Lueth
 *
 * Dual licensed under the MIT and GPL licenses.
 *  - http://www.opensource.org/licenses/mit-license.php
 *  - http://www.gnu.org/copyleft/gpl.html
 *
 * @author Dirk Lueth <info@qoopido.com>
 *
 * @require ../emitter
 *
 * @polyfill ../polyfill/window/matchmedia
 */

(function(global) {
	'use strict';

	function definition(Emitter, matchMedia) {
		var storage = {};

		function ComponentSense(query) {
			var self = Emitter.prototype.constructor.call(this),
				mql  = matchMedia(query);

			storage[self.uuid] = mql;

			mql.addListener(function() {
				self.emit(mql.matches === true ? 'match' : 'unmatch');
			});

			return self;
		}

		ComponentSense.prototype = {
			get matches() {
				var mql = storage[this.uuid];

				if(mql) {
					return mql.matches;
				}
			}
		};

		return Emitter.extend(ComponentSense);
	}

	provide([ '../emitter', global.matchMedia || '../polyfill/window/matchmedia' ], definition);
}(this));