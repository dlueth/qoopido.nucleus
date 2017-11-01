[![License](https://img.shields.io/npm/l/qoopido.nucleus.svg?style=flat-square)](https://github.com/dlueth/qoopido.nucleus)
[![Code Climate](https://img.shields.io/codeclimate/github/dlueth/qoopido.nucleus.svg?style=flat-square)](https://codeclimate.com/github/dlueth/qoopido.nucleus)
[![NPM downloads](https://img.shields.io/npm/dt/qoopido.nucleus.svg?style=flat-square&label=npm%20downloads)](https://www.npmjs.org/package/qoopido.nucleus)
[![jsDelivr Hits](https://data.jsdelivr.com/v1/package/npm/qoopido.nucleus/badge)](https://www.jsdelivr.com/package/npm/qoopido.nucleus)

# Qoopido.nucleus
Nucleus is a lightweight, atomic and modular JavaScript utility library that strongly encourages the creation and usage of small yet flexible, reusable and easily maintainable modules.

Beside containing basic components that make out for the term *library* Nucleus also is a concept that offers developers means to use its very flexible extension/inheritance pattern throughout their own modules.

Nucleus utilizes [Qoopido.demand](https://github.com/dlueth/qoopido.demand) as its (caching) loader which removes the explicit need for having to bundle things up for production.

The upcoming availability of HTTP/2 will also be greatly beneficial for Nucleus and its tendency towards **many** small and atomic modules.

Due to its architecture Nucleus enables web sites to leave the monolithic "include all your modules once" path and instead cleverly load them one by one, on demand and only when **really** needed.

To see Nucleus in action feel free to visit its [official site](http://nucleus.qoopido.com). The site's source code (beside some necessary minor changes) is also part of this repo and can be found in the ```site``` directory.


## Compatibility
Qoopido.nucleus is officially developed for Chrome, Firefox, Safari, Opera and IE9+.

I do test on OSX Yosemite and nucleus is fully working on Chrome, Firefox, Safari and Opera there. To test IE9, 10, 11 as well as Edge the official Microsoft VMs in combination with VirtualBox are being used.


## External dependencies
To load Nucleus [Qoopido.demand](https://github.com/dlueth/qoopido.demand) is required.


## Availability
Qoopido.nucleus is available on GitHub as well as jsdelivr, npm and bower at the moment. CDNJS will follow in the near future.


## Loading Nucleus
To be able to use Nucleus you will need to load [Qoopido.demand](https://github.com/dlueth/qoopido.demand) which comes with extensive documentation within its own repo.


## Usage
Afterwards you simply have to define a ```path``` for ```/nucleus``` pointing towards the location from which you want to load Nucleus. This configuration will most likely be part of the ```main``` module of Qoopido.demand which might look like the following snippet:

```javascript
(function(global) {
	'use strict';

	function definition(demand, provide) {
		demand
			.configure({
				pattern: {
					'/nucleus': '//cdn.jsdelivr.net/npm/qoopido.nucleus@3.0.5/dist/base.js'
				},
				modules: {
				}
			});
			
		// any Nucleus module can now be loaded via demand, e.g.
		demand('/nucleus/dom/element', '/nucleus/function/debounce')
			.then(
				function(DomElement, functionDebounce) {
					new DomElement(global)
						.on('resize orientationchange', function onResize() { ... })
						.on('scroll', functionDebounce(function onScroll() { ... }));
				}
			);
			
		return true;
	}
	
	provide([ 'demand', 'provide' ], definition);
}(this));
```
