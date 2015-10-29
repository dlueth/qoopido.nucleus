(function() {
	'use strict';

	function definition(demand, DomElement, Prism) {
		var body    = new DomElement('body'),
			storage = {},
			current;

		new DomElement('body')
			.on('click', function() {
				current && hide(current);
			});

		function hide(element) {
			element.remove();

			current = null;
		}

		function show(element) {
			if(element !== current) {
				current = current ? element.replace(current) : element.appendTo(body);
			}

		}

		function Snippet(section) {
			var id      = section.getAttribute('data-hash'),
				pointer = storage[id],
				container;

			if(!pointer) {
				container = new DomElement('<aside />', { class: 'snippet', itemscope: true, itemtype: 'http://schema.org/WebPageElement/Snippet' });

				demand('text!../../assets/snippets/' + id + '.txt')
					.then(function(source) {
						container.setContent('<pre><code class="language-javascript">' + source + '</code></pre>', true);
						Prism.highlightElement(container.element.firstChild.firstChild);

						show(container);

						storage[id] = container;
					});
			} else {
				show(pointer);
			}
		}


		return Snippet;
	}

	provide([ 'demand', '/nucleus/dom/element', 'legacy!/prism/js', 'css!/prism/css', 'css!../../css/dist/snippet.css', '/demand/handler/text' ], definition);
}());