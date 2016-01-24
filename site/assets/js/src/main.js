(function(global, document, demand, provide, setTimeout, clearTimeout) {
	'use strict';

	function definition(demand) {
		// configure demand
			demand
				.configure({
					pattern: {
						'/nucleus':   '//cdn.jsdelivr.net/qoopido.nucleus/1.0.7',
						'/probe':     'https://probe.qoopido.com/1.0.0/beacon.js',
						'/prism/js':  '//cdn.jsdelivr.net/prism/1.3.0/prism.js',
						'/prism/css': '//cdn.jsdelivr.net/prism/1.3.0/themes/prism-okaidia.css'
					},
					modules: {
						'/demand/handler/legacy': {
							'/prism/js': {
								probe: function() {
									return global.Prism;
								}
							}
						}
					}
				});

		var arrayPrototypeSlice = Array.prototype.slice,
			documentElement     = document.documentElement,
			regexMatchBasename  = /(.+)\.(jp(e?)g|gif|png|webp)$/i,
			hash                = (document.location.hash || '#intro').substr(1),
			viewport            = {},
			hero;

		(function() {
			var current = document.querySelector('#section-' + hash),
				width   = Math.ceil((global.innerWidth || documentElement.clientWidth) / 100) * 100,
				height  = Math.ceil((global.innerHeight || documentElement.clientHeight) / 100) * 100,
				dpr     = Math.min(2, global.devicePixelRatio || 1).toFixed(2) * 100;

			hero = current.querySelector('[itemprop="image"]').getAttribute('content').replace(regexMatchBasename, '$1.' + width + 'x' + height + '@' + dpr + '.$2');

			current.style.backgroundImage = 'url(' + hero + ')';

			document.addEventListener('touchstart', function(event) { if(event.target.nodeName.toLowerCase() !== 'a') { event.preventDefault(); } }, false);
			document.addEventListener('touchmove', function(event) { event.preventDefault(); }, false);
			document.addEventListener('touchend', function(event) { event.preventDefault(); }, false);
		}());

		demand('/nucleus/dom/element', '/nucleus/support/css/property').then(
			function(DomElement, supportCssProperty) {
				var window     = new DomElement(global),
					head       = new DomElement(document.head || document.querySelector('head')),
					body       = new DomElement('body'),
					navigation = new DomElement('<nav />', { itemscope: true, itemtype: 'http://schema.org/SiteNavigationElement', role: 'navigation' }),
					style      = document.createElement('style'),
					sections   = arrayPrototypeSlice.call(document.querySelectorAll('main [itemtype="http://schema.org/WebPageElement"]')),
					touchState = { started: null, moved: null, oy: null, ly: null },
					markers    = [],
					iterator, i, section, title, marker;

				style.type = 'text/css';

				function onResize() {
					var source = '';

					viewport.width  = Math.ceil((global.innerWidth || documentElement.clientWidth) / 100) * 100;
					viewport.height = Math.ceil((global.innerHeight || documentElement.clientHeight) / 100) * 100;
					viewport.dpr    = Math.min(2, global.devicePixelRatio || 1);

					for(i = 0; section = sections[i]; i++) {
						source += 'a[id="' + section.hash + '"]:target ~ main { ' + supportCssProperty('transform')[0] + ': translateY(-' + section.offsetTop + 'px); }';

						if(section.observe) {
							updateImage(section);
						}
					}

					if(style.styleSheet) {
						style.styleSheet.cssText = source;
					} else {
						style.textContent = source;
					}
				}

				function onWheel(event) {
					scroll(event.deltaY);
				}

				function onTouch(event) {
					var time    = event.timeStamp,
						touches = event.originalEvent.targetTouches,
						target, delta, velocity;

					switch(event.type) {
						case 'touchstart':
							if(touches.length === 1) {
								touchState.started = time;
								touchState.oy      = touches[0].clientY;
							}

							break;
						case 'touchmove':
							if(touches.length === 1) {
								touchState.moved = time;
								touchState.ly    = touches[0].clientY;
							}

							break;
						case 'touchend':
							target = new DomElement(event.target);

							if(touchState.moved) {
								delta    = touchState.ly - touchState.oy;
								velocity = delta / (touchState.moved - touchState.started) || 0;

								if(Math.abs(delta) > 10 && Math.abs(velocity) > 0.5) {
									scroll(-delta);
								} else {
									target.emit('click');
								}
							} else {
								target.emit('click');
							}

							touchState.started = null;
							touchState.moved   = null;

							break;
						case 'touchcancel':
							touchState.started = null;
							touchState.moved   = null;

							break;
					}
				}

				function scroll(delta) {
					if(iterator && delta) {
						iterator[delta > 0 ? 'next' : 'previous']();
						sections[iterator.index].marker.emit('click');
					}
				}

				function setImage() {
					var self = this;

					if(self.observe) {
						self.style.backgroundImage = 'url(' + self.image.replace(regexMatchBasename, '$1.' + viewport.width + 'x' + viewport.height + '@' + (viewport.dpr.toFixed(2) * 100) + '.$2') + ')';
					}
				}

				function updateImage(section) {
					if(section.timeout) {
						clearTimeout(section.timeout);
					}

					section.timeout = setTimeout(setImage.bind(section), 200);
				}

				function fadeInMarker() {
					this.setStyles({ opacity: 1, left: 0, bottom: 0 });
				}

				demand('/nucleus/function/debounce')
					.then(function(functionDebounce) {
						window.on('mousewheel wheel', functionDebounce(onWheel, 100));
						window.on('touchstart touchmove touchend touchcancel', onTouch);
					});

				body
					.on('appear', '[itemtype="http://schema.org/WebPageElement"]', function(event, details) {
						if(iterator && details.priority === 1) {
							iterator.seek(this.index);
						}

						updateImage(this);

						this.observe = true;
					})
					.on('disappear', '[itemtype="http://schema.org/WebPageElement"]', function(event, details) {
						if(details.priority === 1) {
							delete this.observe;
						}
					})
					.on('click', '[href="#snippet"]', function(event) {
						var self = this;

						event.preventDefault();
						event.stopPropagation();

						demand('./snippet')
							.then(function(Snippet) {
								new Snippet(self.parentNode);
							});
					});

				for(i = 0; section = sections[i]; i++) {
					hash           = section.id.slice(8);
					title          = document.querySelector('#' + section.id + ' [itemprop="headline"]').textContent;
					section.hash   = hash;
					section.index  = i;
					section.image  = document.querySelector('#' + section.id + ' [itemprop="image"]').getAttribute('content');
					section.marker = new DomElement('<a />', { href: '#' + hash, itemprop: 'url', title: title })
						.appendTo(navigation);

					section.setAttribute('data-hash', hash);

					markers.push(section.marker);
				}

				navigation.insertBefore('#github');
				head.append(style);

				for(i = 0; marker = markers[i]; i++) {
					setTimeout(fadeInMarker.bind(marker), i * 25);
				}

				demand('/nucleus/dom/element/appear')
					.then(function(DomElementAppear) {
						for(i = 0; section = sections[i]; i++) {
							new DomElementAppear(section, { auto: 2 });
						}

						demand('/nucleus/function/debounce')
							.then(function(functionDebounce) {
								window
									.on('resize orientationchange', functionDebounce(onResize))
									.emit('resize');
							});

						demand('/nucleus/component/iterator')
							.then(function(ComponentIterator) {
								iterator = new ComponentIterator(null, { loop: false })
									.on('preSeek postSeek', function(event) {
										sections[(iterator && iterator.index) || 0].marker.setAttribute('aria-selected', event === 'postSeek' ? 'true' : 'false');
									})
									.setData(sections);

								demand('./snippet', './ga');

								if('performance' in global) {
									demand('./rum')
										.then(
											function(rum) {
												rum(hero);
											}
										);
								}
							});
					});
			}
		);

		/**
		 * further examples
		 */
		/*
		demand('/nucleus/url')
			.then(
				function(Url) {
					var test = new Url('http://www.qoopido.com/index.php?test=1#top');

					test.searchParams.set('blubb', true);
					test.searchParams.remove('test');

					console.log(test.href);
				}
			);
		*/

		/*
		demand('/nucleus/component/sense')
			.then(
				function(componentSense) {
					var sense1 = new componentSense('screen and (min-width: 600px)'),
						sense2 = new componentSense('screen and (min-width: 1000px)');

					console.log(sense1, sense2);

					sense1.on('match unmatch', function(event) {
						console.log('1', event);
					});

					sense2.on('match unmatch', function(event) {
						console.log('2', event);
					});
				}
			);
		*/

		/*
		demand('/nucleus/component/iterator')
			.then(
				function(componentIterator) {
					var test = new componentIterator()
						.on('preSeek', function(event, args) {
							console.log('=>', event, this.index);
						})
						.on('postSeek', function(event, args, returnValue) {
							console.log('=>', event, this.index);
						})
						.setData(document.querySelectorAll('[itemtype="http://schema.org/WebPageElement"]'))
						.last();

					console.log(test.length);
				}
			);
		*/

		/*
		demand('/nucleus/support/method')
			.then(
				function(supportMethod) {
					demand(supportMethod('matchMedia', true) || '/nucleus/polyfill/window/matchmedia')
						.then(
							function(matchMedia) {
								console.log('here', matchMedia);
							}
						);
				}
			);
		*/

		/*
		demand('/nucleus/task')
			.then(
				function(Task) {
					new Task(function(first, second) { return +new Date() + ' ' + first + ' ' + second; }, [ '1', '2' ]).then(
						function(result) {
							console.log(result);
						}
					);
				}
			);
		*/

		/*
		demand('/nucleus/support/test/element/video/mp4')
			.then(
				function(supportTestVideoMp4) {
					supportTestVideoMp4.then(
						function() {
							console.log('supports video.mp4');
						},
						function() {
							console.log('no support for video.mp4');
						}
					);
				},
				function(error) {
					console.log(error);
				}
			);
		*/

		/*
		demand('/nucleus/dom/element')
			.then(function(DomElement) {
				var body  = new DomElement('body'),
					debug = new DomElement('<div />', { 'data-test': 'debug' })
						.setContent('debug')
						.appendTo(body);

				body
					.on('click', '[data-test]',
						function() {
							console.log('click', arguments);
						}
					);
			});
		*/

		/*
		demand('/nucleus/transport/xhr')
			.then(function(transportXhr) {
				var xhr = new transportXhr('//cdn.jsdelivr.net/qoopido.demand/2.0.8/handler/text.js');

				xhr
					.get()
					.then(
						function(response) {
							console.log(response);
						}
					);
			});
		*/

		/*
		demand('/nucleus/dom/element', '/nucleus/dom/collection')
			.then(function(DomElement, DomCollection) {
				var body  = new DomElement('body'),
					test  = new DomElement('<div />'),
					debug = new DomCollection('[itemtype="http://schema.org/WebPageElement"]');

				test
					.addClass('debug')
					.setContent('debug')
					.appendTo(body);

				body.on('click', '.debug', function() {
					console.log('debug clicked');
				});

				console.log(debug, debug.length);
			});
		*/

		return true;
	}

	provide([ 'demand' ], definition);
}(this, document, demand, provide, setTimeout, clearTimeout));