(function() {
	'use strict';

	function definition(demand, DomElement, Velocity, Prism) {
		var storage = {},
			current;

		new DomElement('body')
			.on('click', function() {
				current && hide(current);
			});

		function hide(element) {
			Velocity(element, { opacity: 0, bottom: '7.8rem' }, { duration: 100, easing: 'easeInQuad', display: 'none' });

			current = null;
		}

		function show(element) {
			if(element !== current) {
				current && hide(current);

				Velocity(element, { opacity: 1, bottom: '6.8rem' }, { duration: 100, easing: 'easeOutQuad', display: 'block' });

				current = element;
			}

		}

		function Snippet(section) {
			var id      = section.id,
				pointer = storage[id],
				container;

			if(!pointer) {
				container = new DomElement('<aside />', { class: 'snippet', itemscope: true, itemtype: 'http://schema.org/WebPageElement/Snippet' }, { display: 'none', opacity: 0 });

				demand('text!../../assets/snippets/' + id + '.txt')
					.then(function(source) {
						container.setContent('<pre><code class="language-javascript">' + source + '</code></pre>', true);
						Prism.highlightElement(container.element.firstChild.firstChild);

						container.appendTo(section);
						show(container.element);

						storage[id] = container;
					});
			} else {
				show(pointer.element);
			}
		}

		return Snippet;
	}

	provide([ 'demand', '/nucleus/dom/element', 'legacy!/velocity', 'legacy!/prism/js', 'css!/prism/css', 'css!../css/snippet.css' ], definition);
}());