<!DOCTYPE html>
<html itemscope itemtype="http://schema.org/WebPage" lang="en-US">
<head>
	<title>Qoopido.nucleus - modular JavaScript utility library</title>

	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes" />
	<meta name="description" lang="en-US" content="Lightweight, atomic and modular JavaScript utility library that strongly encourages the creation and usage of small yet flexible, reusable and easily maintainable modules." />
	<meta name="robots" content="index,follow" />
	<meta name="revisit-after" content="+1 week" />
	<meta name="author" content="Dirk Lüth <info@qoopido.com>" />
	<meta name="theme-color" content="#5d407f">

	<meta itemprop="url" content="http://nucleus.qoopido.com" />
	<meta itemprop="name" content="Qoopido.nucleus - modular JavaScript utility library" />
	<meta itemprop="description" content="Lightweight, atomic and modular JavaScript utility library that strongly encourages the creation and usage of small yet flexible, reusable and easily maintainable modules." />

	<meta property="og:site_name" content="Qoopido.nucleus - modular JavaScript utility library" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="http://nucleus.qoopido.com" />
	<meta property="og:title"  content="Home" />
	<meta property="og:description" content="Lightweight, atomic and modular JavaScript utility library that strongly encourages the creation and usage of small yet flexible, reusable and easily maintainable modules." />

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:site" content="@qoopido" />
	<meta name="twitter:url" content="http://nucleus.qoopido.com" />
	<meta name="twitter:title" content="Qoopido.nucleus" />
	<meta name="twitter:description" content="Lightweight & modular JS library that strongly encourages creation of small, flexible and reusable modules." />

	<link rel="author" href="https://plus.google.com/105793905947859477305" />
	<style type="text/css">
		<?php echo file_get_contents('./app/css/default.css'); ?>
	</style>
</head>
<body>

<main role="main" itemprop="mainContentOfPage">
	<section itemscope itemtype="http://schema.org/WebPageElement" id="intro">
		<meta itemprop="image" content="./assets/images/1.jpg" />
		<meta itemprop="url" content="http://nucleus.qoopido.com/#intro" />
		<h1><span itemprop="headline">What can Qoopido.<wbr />nucleus do for you?</span></h1>
		<div><p itemprop="description">Nucleus is a lightweight, atomic and modular JavaScript utility library. It strongly encourages the creation and usage of small yet flexible, reusable and easily maintainable modules. Nucleus utilizes Qoopido.demand as its caching loader.</p></div>
	</section>

	<section itemscope itemtype="http://schema.org/WebPageElement" id="base">
		<meta itemprop="image" content="./assets/images/2.jpg" />
		<meta itemprop="url" content="http://nucleus.qoopido.com/#base" />
		<h2><span itemprop="headline">simple & lightweight inheritance</span></h2>
		<div><p itemprop="description">It only takes very few lines of code to inherit from any other module! The base module providing the extension & inheritance functionality weighs only about 1kB minified and gzipped.</p></div>
		<a href="#snippet" title="show snippet">{ }</a>
	</section>

	<section itemscope itemtype="http://schema.org/WebPageElement" id="emitter">
		<meta itemprop="image" content="./assets/images/3.jpg" />
		<meta itemprop="url" content="http://nucleus.qoopido.com/#emitter" />
		<h2><span itemprop="headline">events made easy & fun</span></h2>
		<div><p itemprop="description">Extending the included emitter will enable your modules to instantly emit custom events and offer listener registration via on, one and off methods. Beside that, your modules own methods will automagically emit pre- and post-events!</p></div>
		<a href="#snippet" title="show snippet">{ }</a>
	</section>

	<section itemscope itemtype="http://schema.org/WebPageElement" id="support">
		<meta itemprop="image" content="./assets/images/4.jpg" />
		<meta itemprop="url" content="http://nucleus.qoopido.com/#support" />
		<h2><span itemprop="headline">extendible feature detection</span></h2>
		<div><p itemprop="description">The atomic principle got transfered over to an absolutely versatile feature detection as well. Feature detects are always async, so any test is possible, by design!</p></div>
		<a href="#snippet" title="show snippet">{ }</a>
	</section>

	<section itemscope itemtype="http://schema.org/WebPageElement" id="dom">
		<meta itemprop="image" content="./assets/images/5.jpg" />
		<meta itemprop="url" content="http://nucleus.qoopido.com/#dom" />
		<h2><span itemprop="headline">intuitive DOM manipulation</span></h2>
		<div><p itemprop="description">DOM manipulation, event abstraction and delegation are included for single elements and collections of elements alike. Both layers offer an intuitive chainable interface wherever applicable.</p></div>
		<a href="#snippet" title="show snippet">{ }</a>
	</section>

	<section itemscope itemtype="http://schema.org/WebPageElement" id="domElementAppear">
		<meta itemprop="image" content="./assets/images/6.jpg" />
		<meta itemprop="url" content="http://nucleus.qoopido.com/#domElementAppear" />
		<h2><span itemprop="headline">viewport-aware DOM elements</span></h2>
		<div><p itemprop="description">The included appear module makes it a breeze to react on elements entering, nearing or leaving the visible viewport or an adjustable treshold around it. It enables you to load any kind of functionality on demand, for example on scroll.</p></div>
		<a href="#snippet" title="show snippet">{ }</a>
	</section>

	<section itemscope itemtype="http://schema.org/WebPageElement" id="componentSense">
		<meta itemprop="image" content="./assets/images/7.jpg" />
		<meta itemprop="url" content="http://nucleus.qoopido.com/#componentSense" />
		<h2><span itemprop="headline">CSS media queries in JavaScript</span></h2>
		<div><p itemprop="description">The sense module makes the sometimes cumbersome use of window.matchMedia dead simple. Just create a new query and listen for any match and unmatch events it fires. Even in Internet Explorer 9!</p></div>
		<a href="#snippet" title="show snippet">{ }</a>
	</section>

	<section itemscope itemtype="http://schema.org/WebPageElement" id="transportXhr">
		<meta itemprop="image" content="./assets/images/8.jpg" />
		<meta itemprop="url" content="http://nucleus.qoopido.com/#transportXhr" />
		<h2><span itemprop="headline">Ajax for human beings</span></h2>
		<div><p itemprop="description">The built-in promise like XHR abstraction greatly simplifies your daily ajax needs by offering you a fluent and easily readable interface no matter which browser you throw at it.</p></div>
		<a href="#snippet" title="show snippet">{ }</a>
	</section>

	<section itemscope itemtype="http://schema.org/WebPageElement" id="task">
		<meta itemprop="image" content="./assets/images/9.jpg" />
		<meta itemprop="url" content="http://nucleus.qoopido.com/#task" />
		<h2><span itemprop="headline">WebWorker done right</span></h2>
		<div><p itemprop="description">Using WebWorker tends to always become a tedious task almost no developer is willing to encounter on a regular basis. Having a promise like abstraction makes them fun again, finally!</p></div>
		<a href="#snippet" title="show snippet">{ }</a>
	</section>

	<section itemscope itemtype="http://schema.org/WebPageElement" id="componentIterator">
		<meta itemprop="image" content="./assets/images/10.jpg" />
		<meta itemprop="url" content="http://nucleus.qoopido.com/#componentIterator" />
		<h2><span itemprop="headline">flexible iterators</span></h2>
		<div><p itemprop="description">Is it a slideshow, a lightbox, a slider or a pagination? No, it is a simple, abstract and UI independent iterator. Whatever you can imagine is possible as long as it is array based, no matter how it looks or behaves.</p></div>
		<a href="#snippet" title="show snippet">{ }</a>
	</section>
</main>

<a href="https://github.com/dlueth/qoopido.nucleus" target="_blank" id="github">Fork me on GitHub</a>

<script>
	!function(a,b,c){!function(d,e,f,g,h){g=e.getElementsByTagName(f)[0],h=e.createElement(f),d.demand={url:a,main:b,settings:c},h.async=1,h.src=a,g.parentNode.insertBefore(h,g)}(window,document,"script")}
	("//cdn.jsdelivr.net/qoopido.demand/2.0.9/demand.js","app/js/main",{base:"/site",version:"1.0.0",cache:true});
</script>
</body>
</html>