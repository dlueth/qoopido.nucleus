/**
 * @use /demand/function/iterate
 *
 * @browsers Chrome < 9, Firefox < 6, Internet Explorer < 10, Opera < 12.1, Safari < 5.1
 */

(function(global, document, getComputedStyle) {
	'use strict';

	function definition(iterate) {
		var id      = 'polyfill/window/matchmedia',
			storage = {},
			count = 0, style;

		function onResize() {
			var mql, event, i, fn;

			iterate(storage, function(key, query) {
				mql   = query.mql;

				if(mql.matches !== query.check()) {
					event = {
						currentTarget: mql,
						matches:       mql.matches,
						media:         mql.media,
						srcElement:    mql,
						target:        mql,
						timestamp:     +new Date(),
						type:          'change'
					};

					for(i = 0; fn = query.listener[i]; i++) {
						fn.call(mql, event);
					}
				}
			});
		}

		function initialize() {
			var target = document.getElementsByTagName('script')[0];

			style       = document.createElement('style');
			style.type  = 'text/css';

			style.setAttribute('nucleus-source', id);
			style.setAttribute('style', 'display: none; position: absolute; width: 0; height: 0; overflow: hidden;');

			target.parentNode.insertBefore(style, target);

			global.addEventListener('resize', onResize);
			global.addEventListener('orientationchange', onResize);
		}

		function Query(query) {
			var self     = this,
				index    = count + 1,
				listener = [];

			self.index    = String(index);
			self.source   = '@media ' + query + ' { [nucleus-source="' + id + '"] { z-index: ' + index + '; } }';
			self.listener = listener;
			self.mql      = {
				matches:        false,
				media:          query,
				addListener:    function addListener(fn) { fn && listener.push(fn); },
				removeListener: function removeListener(fn) {
					var i = 0,
						pointer;

					for(; pointer = listener[i]; i++) {
						if(pointer === fn) {
							listener.splice(i, 1);

							break;
						}
					}
				}
			};

			count++;

			self.check();
		}

		Query.prototype = {
			/* only for reference
			index:    null,
			source:   null,
			listener: null,
			mql:      null,
			*/
			check: function() {
				var self = this,
					matches;

				style.textContent = self.source;
				matches           = String(getComputedStyle(style).zIndex) === self.index;
				style.textContent = '';

				return (self.mql.matches = matches);
			}
		};

		if(!('matchMedia' in global)) {
			initialize();

			global.matchMedia = function polyfillWindowMatchmedia(query) {
				return (storage[query] || (storage[query] = new Query(query))).mql;
			};
		}

		return global.matchMedia;
	}

	provide([ '/demand/function/iterate' ], definition);
}(this, document, getComputedStyle));