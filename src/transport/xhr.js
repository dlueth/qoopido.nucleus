/**
 * @use /demand/weakmap
 * @use /demand/pledge
 * @use /demand/validator/isObject
 * @use /demand/function/iterate
 *
 * @require ../url
 * @require ../function/merge
 */

(function(global, XHR) {
	'use strict';

	function definition(Weakmap, Pledge, isObject, iterate, Url, functionMerge) {
		var XDR     = 'XDomainRequest' in global &&  global.XDomainRequest || XHR,
			storage = new Weakmap();

		function flatten(object, prefix, items) {
			var i = 0, value;

			prefix = prefix || '';
			items  = items || {};

			if(Array.isArray(object)) {
				for(i = 0; typeof (value = object[i]) !== 'undefined'; i++) {
					flatten(value, prefix + '[' + i + ']', items);
				}
			} else if(isObject(object)) {
				iterate(object, function(key, value) {
					flatten(value, prefix ? prefix + '[' + key + ']' : key, items);
				});
			} else if(prefix && typeof object !== 'undefined') {
				items[prefix] = object;
			}

			return items;
		}

		function serialize(data) {
			var url = new Url('/');

			iterate(data, url.parameter.set, url);

			return url.search.substr(1);
		}

		function checkState() {
			if(this.readyState < 4) {
				this.abort();
			}
		}

		function request(method) {
			var properties      = storage.get(this),
				isString        = typeof properties.data === 'string',
				settings        = properties.settings,
				url             = properties.url,
				data            = isString ? properties.data : flatten(properties.data),
				xhr             = url.local ? new XHR() : new XDR(),
				deferred        = Pledge.defer(),
				boundCheckState = checkState.bind(xhr),
				timeout         = settings.timeout,
				pointer;

			if(data && method === 'GET') {
				if(isString) {
					url.parameter = data;
				} else {
					iterate(data, url.parameter.set, url);
				}

				data = null;
			}

			if(!settings.cache) {
				url.parameter.set('nucleus', +new Date());
			}

			if(data && !isString) {
				data = serialize(data);
			}

			if(isObject(settings.xhrOptions)) {
				iterate(settings.xhrOptions, function(property, value) {
					xhr[property] = value;
				});
			}

			xhr.ontimeout  = xhr.onerror = xhr.onabort = function() {
				deferred.reject(xhr);
			};
			xhr.onprogress = xhr.onreadystatechange = function() {
				clearTimeout(pointer);

				pointer = setTimeout(boundCheckState, timeout);
			};
			xhr.onload     = function() {
				pointer = clearTimeout(pointer);

				if(!('status' in xhr) || xhr.status === 200) {
					deferred.resolve(xhr.responseText, xhr);
				} else {
					deferred.reject(xhr);
				}
			};

			xhr.open(method, url.href, true);

			if(xhr.setRequestHeader) {
				xhr.setRequestHeader('Accept', settings.accept);

				if(data && method !== 'GET') {
					xhr.setRequestHeader('Content-Type', settings.contentType);
				}

				if(isObject(settings.header)) {
					iterate(settings.header, function(header, value) {
						xhr.setRequestHeader(header, value);
					});
				}
			}

			console.log(data);

			xhr.send(data);

			pointer = setTimeout(boundCheckState, timeout);

			return deferred.pledge;
		}

		function TransportXhr(url, data, settings) {
			storage.set(this, {
				settings: functionMerge({}, TransportXhr.settings, settings),
				url:      new Url(url),
				data:     data
			});

			return this;
		}

		TransportXhr.prototype = {
			get:      function() {
				return request.call(this, 'GET');
			},
			post:     function() {
				return request.call(this, 'POST');
			},
			put:      function() {
				return request.call(this, 'PUT');
			},
			patch:      function() {
				return request.call(this, 'PATCH');
			},
			'delete': function() {
				return request.call(this, 'DELETE');
			},
			head:     function() {
				return request.call(this, 'HEAD');
			}
		};

		TransportXhr.settings = {
			accept:      '*/*',
			timeout:     8000,
			async:       true,
			cache:       false,
			username:    null,
			password:    null,
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			header:      { 'x-requested-with': 'XMLHttpRequest' },
			xhrOptions:  {}
		};

		return TransportXhr;
	}

	provide([ '/demand/weakmap', '/demand/pledge', '/demand/validator/isObject', '/demand/function/iterate', '../url', '../function/merge' ], definition);
}(this, XMLHttpRequest));
