(function(global, demand, provide) {
	'use strict';

	function definition(demand) {
		// configure demand
			demand
				.configure({
					pattern: {
						'/nucleus':   '/dist',
						'/velocity':  '//cdn.jsdelivr.net/velocity/1.2.3/velocity.min',
						'/prism/js':  '//cdn.jsdelivr.net/prism/1.2.0/prism.js',
						'/prism/css': '//cdn.jsdelivr.net/prism/1.2.0/themes/prism-okaidia.css'
					},
					modules: {
						'/demand/handler/legacy': {
							'/velocity': {
								probe: function() {
									return global.Velocity;
								}
							},
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
			regexMatchBasename  = /(.+)\.(jp(e?)g|hig|png|webp)$/i,
			viewport            = {};

		demand('/nucleus/dom/element', '/nucleus/dom/element/appear', '/nucleus/component/iterator', '/nucleus/function/debounce').then(
			function(DomElement, DomElementAppear, ComponentIterator, functionDebounce) {
				var window     = new DomElement(global),
					body       = new DomElement('body'),
					navigation = new DomElement('<nav />', { itemscope: true, itemtype: 'http://schema.org/SiteNavigationElement', role: 'navigation' }),
					sections   = arrayPrototypeSlice.call(document.querySelectorAll('main [itemtype="http://schema.org/WebPageElement"]')),
					markers     = [],
					iterator, i, section, title, marker;

				function onResize() {
					viewport.width  = global.innerWidth || documentElement.clientWidth;
					viewport.height = global.innerHeight || documentElement.clientHeigh;
					viewport.dpr    = global.devicePixelRatio || 1;

					for(i = 0; section = sections[i]; i++) {
						if(section.observe) {
							updateImage(section);
						}
					}
				}

				function updateImage(section) {
					section.style.backgroundImage = 'url(' + section.image.replace(regexMatchBasename, '$1.' + viewport.width + 'x' + viewport.height + '@' + (viewport.dpr.toFixed(2) * 100) + '.$2') + ')';
				}

				iterator = new ComponentIterator()
					.on('preSeek postSeek', function(event) {
						sections[iterator.index || 0].marker.setAttribute('aria-selected', event === 'postSeek' ? 'true' : 'false');
					});

				body
					.on('appear', '[itemtype="http://schema.org/WebPageElement"]', function(event, details) {
						if(details.priority === 1) {
							iterator.seek(this.index);
						}

						updateImage(this);

						this.observe = true;
					})
					.on('disappear', '[itemtype="http://schema.org/WebPageElement"]', function() {
						delete this.observe;
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
					title          = document.querySelector('#' + section.id + ' [itemprop="headline"]').textContent;
					section.index  = i;
					section.image  = document.querySelector('#' + section.id + ' [itemprop="image"]').getAttribute('content'),
					section.marker = new DomElement('<a />', { href: '#' + section.id, itemprop: 'url', title: title }, { left: '48px', opacity: 0 })
						.setContent(title)
						.appendTo(navigation);

					new DomElementAppear(section, { auto: 2 });

					markers.push(section.marker);
				}

				window.on('resize orientationchange', functionDebounce(onResize));
				onResize();

				iterator.setData(sections);
				navigation.insertBefore('#github');

				demand('legacy!/velocity')
					.then(function(Velocity) {
						for(i = 0; marker = markers[i]; i++) {
							Velocity(marker.element, { left: 0, opacity: 1 }, { duration: 100, easing: 'easeOutQuad', delay: (i + 10) * 50 });
						}

						body
							.on('click', '[itemtype="http://schema.org/SiteNavigationElement"] a', function() {
								Velocity(document.getElementById(this.getAttribute('href').slice(1)), 'scroll', { duration: 600, easing: 'easeInOutCubic' });
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
					new Task(function() { return +new Date(); }).then(
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
}(this, demand, provide));