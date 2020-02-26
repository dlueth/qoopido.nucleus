(function() {
	'use strict';

	function definition(WeakMap, DomElement) {
		var weakmap               = new WeakMap(),
			supportsPointerEvents = document.documentMode < 11 && 'pointerEvents' in document.createElement('iframe').style;

		function Resize(node) {
			var self     = DomElement.call(this, node),
				position = self.getStyle('position'),
				sensor   = new DomElement('<iframe />', { draggable: 'false' }, {
					pointerEvents: 'none',
					userSelect:    'none',
					userDrag:      'none',
					zIndex:        '-1',
					display:       'block',
					opacity:       0,
					overflow:      'auto',
					position:      'absolute',
					left:          0,
					top:           '-100%',
					width:         '100%',
					height:        '100%',
					margin:        0,
					padding:       0,
					border:        0
				});

			if(!supportsPointerEvents) {
				sensor.setStyle('visibility', 'hidden');
			}

			if(position === 'static' || position === '') {
				self.setStyle('position', 'relative');
			}

			sensor
				.one('load', function() {
					new DomElement(sensor.node.contentWindow)
						.on('resize', function() {
							self.emit('resize');
						});
				})
				.appendTo(self);
		}

		Resize.extends(DomElement);

		function Factory(node) {
			return weakmap.get(node) || weakmap.set(node, new Resize(node)).get(node);
		}

		return Factory;
	}

	provide([ '/demand/weakmap', '../element' ], definition);
}());
