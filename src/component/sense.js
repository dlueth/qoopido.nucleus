/**
 * @require ../emitter
 *
 * @polyfill ../polyfill/window/matchmedia
 */

(function(global) {
	'use strict';

	function definition(Emitter, matchMedia) {
		var storage = {};

		function ComponentSense(query) {
			var self = Emitter.call(this),
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

		return ComponentSense.extends(Emitter);
	}

	provide([ '../emitter', global.matchMedia || '../polyfill/window/matchmedia' ], definition);
}(this));