/**
 * used as variabel "source" in task.js in minified form
 */
(function() {
	var self                = this,
		regexMatchParameter = /function\s.*?\(([^)]*)\)/,
		regexMatchComments  = /\/\*.*\*\//;

	function mapParameter(parameter) {
		return parameter
			.replace(regexMatchComments, '')
			.trim();
	}

	function filterParameter(parameter) {
		return parameter;
	}

	self.addEventListener('message', function(event) {
		self.postMessage({
			type:   'result',
			result: self
				.process(event.data.load)
				.apply(null, event.data.parameter)
		});
	}, false);

	self.process = function(load) {
		var parameter = load
			.match(regexMatchParameter)[1]
			.split(',')
			.map(mapParameter)
			.filter(filterParameter);

		parameter.push(load.substring(load.indexOf("{") + 1, load.lastIndexOf("}")));

		return Function.apply(null, parameter);
	};
}());