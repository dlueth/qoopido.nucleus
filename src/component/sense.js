/**
 * @use /demand/weakmap
 *
 * @require ../emitter
 *
 * @polyfill ../polyfill/window/matchmedia
 */

(function(global) {
	'use strict';

	function definition(Weakmap, Emitter, matchMedia) {
		var storage = new Weakmap;

		function ComponentSense(query) {
			var self = Emitter.call(this),
				mql  = matchMedia(query);

			storage.set(self, mql);

			mql.addListener(function() {
				self.emit(mql.matches === true ? 'match' : 'unmatch');
			});

			return self;
		}

		ComponentSense.prototype = {
			get matches() {
				var mql = storage.get(this);

				if(mql) {
					return mql.matches;
				}
			}
		};

		return ComponentSense.extends(Emitter);
	}

	provide([ '/demand/weakmap', '../emitter', global.matchMedia || '../polyfill/window/matchmedia' ], definition);
}(this));
