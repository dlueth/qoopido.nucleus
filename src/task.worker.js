(function() {
	var self                = this,
		regexMatchParameter = /function\s.*?\(([^)]*)\)/,
		regexMatchComments  = /\/\*.*\*\//;
		//regexMatchSpaces    = /\\s+/g;

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

		//var parameter = load.substring(load.indexOf("(") + 1, load.indexOf(")")).replace(regexMatchSpaces, ",").split(",");

		parameter.push(load.substring(load.indexOf("{") + 1, load.lastIndexOf("}")));

		return Function.apply(null, parameter);
	};
}());

function d(a){return a.replace(c,"").trim()}function e(a){return a}var a=this,b=/function\s.*?\(([^)]*)\)/,c=/\/\*.*\*\//;a.addEventListener("message",function(b){a.postMessage({type:"result",result:a.process(b.data.load).apply(null,b.data.parameter)})},!1),a.process=function(a){var c=a.match(b)[1].split(",").map(d).filter(e);return c.push(a.substring(a.indexOf("{")+1,a.lastIndexOf("}"))),Function.apply(null,c)};