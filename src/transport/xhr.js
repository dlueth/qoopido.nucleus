/**
 * Qoopido transport/xhr
 *
 * Provides basic XHR (AJAX) functionality
 *
 * Copyright (c) 2015 Dirk Lueth
 *
 * Dual licensed under the MIT and GPL licenses.
 *  - http://www.opensource.org/licenses/mit-license.php
 *  - http://www.gnu.org/copyleft/gpl.html
 *
 * @author Dirk Lueth <info@qoopido.com>
 *
 * @use /demand/pledge
 * @use /demand/validator/isObject
 *
 * @require ../base
 * @require ../url
 * @require ../function/merge
 * @require ../function/descriptor/generate
 */

(function(global, XMLHttpRequest) {
	'use strict';

	function definition(Pledge, isObject, base, Url, functionMerge, functionDescriptorGenerate, functionUniqueUuid) {
		var objectDefineProperty      = Object.defineProperty,
			XHR                       = XMLHttpRequest,
			XDR                       = 'XDomainRequest' in global &&  global.XDomainRequest || XHR,
			regexMatchSpaces          = /%20/g,
			regexMatchOpeningBrackets = /%5B/g,
			regexMatchClosingBrackets = /%5D/g,
			storage                   = {},
			prototype;

		function serialize(parameter) {
			var result = '',
				key;

			for(key in parameter) {
				result += (!result ? '' : '&') + encodeURIComponent(key) + '=' + encodeURIComponent(parameter[key]);
			}

			return result
				.replace(regexMatchSpaces, '+')
				.replace(regexMatchOpeningBrackets, '[')
				.replace(regexMatchClosingBrackets, ']');
		}

		function request(method) {
			var self       = this,
				properties = storage[self.uuid],
				settings   = properties.settings,
				url        = properties.url,
				data       = properties.data,
				xhr        = url.local ? new XHR() : new XDR(),
				deferred   = Pledge.defer(),
				key, timeout;

			if(data && method === 'GET') {
				for(key in data) {
					url.searchParams.set(key, data[key]);
				}

				data = null;
			}

			if(!settings.cache) {
				url.searchParams.set('nucleus[time]', +new Date());
			}

			if(data) {
				data = serialize(data);
			}

			if(isObject(settings.xhrOptions)) {
				for(key in settings.xhrOptions) {
					xhr[key] = settings.xhrOptions[key];
				}
			}

			xhr.onprogress = function() {};
			xhr.ontimeout  = xhr.onerror = xhr.onabort = function() { deferred.reject(xhr); };
			xhr.onload     = function() {
				timeout = clearTimeout(timeout);

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
					for(key in settings.header) {
						xhr.setRequestHeader(key, settings.header[key]);
					}
				}
			}

			xhr.send(data);

			timeout = setTimeout(function() {
				if(xhr.readyState < 4) {
					xhr.abort();
				}
			}, settings.timeout);

			return deferred.pledge;
		}

		function TransportXhr(url, data, settings) {
			var self = this,
				uuid = functionUniqueUuid();

			objectDefineProperty(self, 'uuid', functionDescriptorGenerate(uuid));

			storage[uuid] = {
				settings: functionMerge({}, prototype.settings, settings),
				url:      new Url(url),
				data:     data
			};
		}

		TransportXhr.prototype = {
			/* only for reference
			uuid: null,
			*/
			get:      function() {
				return request.call(this, 'GET');
			},
			post:     function() {
				return request.call(this, 'POST');
			},
			put:      function() {
				return request.call(this, 'PUT');
			},
			'delete': function() {
				return request.call(this, 'DELETE');
			},
			head:     function() {
				return request.call(this, 'HEAD');
			}
		};

		prototype          = base.extend(TransportXhr);
		prototype.settings = {
			accept:      '*/*',
			timeout:     8000,
			async:       true,
			cache:       false,
			username:    null,
			password:    null,
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			header:      {},
			xhrOptions:  {}
		};

		return prototype;
	}

	provide([ '/demand/pledge', '/demand/validator/isObject', '../base', '../url', '../function/merge', '../function/descriptor/generate', '../function/unique/uuid' ], definition);
}(this, XMLHttpRequest));