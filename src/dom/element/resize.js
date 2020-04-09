(function() {
	'use strict';

	function definition(WeakMap, DomElement) {
		var weakmap               = new WeakMap(),
			supportsPointerEvents = document.documentMode < 11 ? false : 'pointerEvents' in document.createElement('iframe').style,
			styles                = {
				pointerEvents: 'none',
				userSelect:    'none',
				userDrag:      'none',
				zIndex:        '-1',
				display:       'block',
				opacity:       0,
				position:      'absolute',
				left:          0,
				top:           '-100%',
				width:         '100%',
				height:        '100%',
				margin:        '1px 0 0',
				padding:       0,
				border:        'none'
			};

		if(!supportsPointerEvents) {
			styles.visibility = 'hidden';
		}

		function Resize(node) {
			var self     = DomElement.call(this, node),
				instance = weakmap.get(self.node),
				position, sensor;

			if(instance) {
				return instance;
			}

			position = self.getStyle('position');
			sensor   = new DomElement('<iframe />', { draggable: 'false' }, styles);

			if(position === 'static' || position === '') {
				self.setStyle('position', 'relative');
			}

			sensor
				.one('load', function() {
					sensor.node.contentWindow.onresize = function() {
						self.emit('resize');
					};
				})
				.appendTo(self);

			weakmap.set(self.node, self);
		}

		return Resize.extends(DomElement);
	}

	provide([ '/demand/weakmap', '../element' ], definition);
}());
