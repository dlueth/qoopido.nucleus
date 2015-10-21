/**
 * Qoopido url
 *
 * Provides methods handle URLs
 *
 * Copyright (c) 2015 Dirk Lueth
 *
 * Dual licensed under the MIT and GPL licenses.
 *  - http://www.opensource.org/licenses/mit-license.php
 *  - http://www.gnu.org/copyleft/gpl.html
 *
 * @author Dirk Lueth <info@qoopido.com>
 *
 * @require ./base
 * @require ./function/descriptor/generate
 * @require ./function/unique/uuid
 */

(function(global, document) {
	'use strict';

	function definition(base, functionDescriptorGenerate, functionUniqueUuid) {
		var objectDefineProperties    = Object.defineProperties,
			storage                   = {},
			regexMatchLeadingSlash    = /^\//,
			regexMatchParameter       = /[?&]?([^=]+)=([^&]*)/g,
			regexMatchSpaces          = /%20/g,
			regexMatchOpeningBrackets = /%5B/g,
			regexMatchClosingBrackets = /%5D/g,
			regexMatchLocal           = new RegExp('^' + resolveCurrent(), 'i'),
			regexMatchDefaults        = {
				'http:':  /:80$/,
				'https:': /:443$/,
				'ftp:':   /:21$/
			};

		function resolveCurrent() {
			var resolver = document.createElement('a');

			resolver.href = '/';

			return resolver.href.slice(0, -1);
		}

		function getLinkProperty(uuid, property) {
			var properties;

			if(properties = storage[uuid]) {
				return properties.link[property];
			}
		}

		function setLinkProperty(uuid, property, value) {
			var properties;

			if(properties = storage[uuid]) {
				properties.link[property] = value;
			}
		}

		function SearchParams(uuid) {
			var self = this;

			objectDefineProperties(self, { uuid: functionDescriptorGenerate(uuid) });

			SearchParams.update.call(self);
		}

		SearchParams.prototype = {
			/* only for reference
			uuid: null
			*/
			get: function(name) {
				return storage[this.uuid].parameter[name];
			},
			set: function(name, value) {
				storage[this.uuid].parameter[name] = value;

				SearchParams.serialize.call(this);
			},
			remove: function(name) {
				delete storage[this.uuid].parameter[name];

				SearchParams.serialize.call(this);
			}
		};

		SearchParams.update = function() {
			var properties = storage[this.uuid],
				parameter  = properties.parameter,
				search     = properties.link.search.split('+').join(' '),
				key, tokens;

			for(key in parameter) {
				delete parameter[key];
			}

			while(tokens = regexMatchParameter.exec(search)) {
				parameter[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
			}
		};

		SearchParams.serialize = function() {
			var properties = storage[this.uuid],
				parameter  = properties.parameter,
				result = '',
				key;

			for(key in parameter) {
				result += (!result ? '?' : '&') + encodeURIComponent(key) + '=' + encodeURIComponent(parameter[key]);
			}

			properties.link.search = result
				.replace(regexMatchSpaces, '+')
				.replace(regexMatchOpeningBrackets, '[')
				.replace(regexMatchClosingBrackets, ']');
		};

		function Url(url) {
			var self      = this,
				uuid      = functionUniqueUuid(),
				link      = document.createElement('a');

			objectDefineProperties(self, {
				uuid:     functionDescriptorGenerate(uuid),
				toString: {
					value: function() { return link.toString(); },
					enumerable: false
				},
				valueOf: {
					value: function() { return link.valueOf(); },
					enumerable: false
				}
			});

			storage[uuid] = {
				link:      link,
				parameter: {}
			};

			link.href         = url;
			self.searchParams = new SearchParams(uuid);
		}

		Url.prototype = {
			/* only for reference
			uuid:         null,
			searchParams: null,
			*/
			get local() {
				var value;

				if(value = getLinkProperty(this.uuid, 'href')) {
					return regexMatchLocal.test(value);
				}
			},
			get href() {
				return getLinkProperty(this.uuid, 'href');
			},
			set href(value) {
				setLinkProperty(this.uuid, 'href', value);
			},
			get origin() {
				var self = this;

				return getLinkProperty(self.uuid, 'origin') || self.protocol + '//' + self.host;
			},
			get protocol() {
				return getLinkProperty(this.uuid, 'protocol');
			},
			set protocol(value) {
				setLinkProperty(this.uuid, 'protocol', value);
			},
			get username() {
				return getLinkProperty(this.uuid, 'username');
			},
			set username(value) {
				setLinkProperty(this.uuid, 'username', value);
			},
			get password() {
				return getLinkProperty(this.uuid, 'password');
			},
			set password(value) {
				setLinkProperty(this.uuid, 'password', value);
			},
			get host() {
				var value, protocol;

				if(value = getLinkProperty(this.uuid, 'host')) {
					protocol = getLinkProperty(this.uuid, 'protocol');

					return regexMatchDefaults[protocol] ? value.replace(regexMatchDefaults[protocol], '') : value;
				}
			},
			set host(value) {
				setLinkProperty(this.uuid, 'host', value);
			},
			get hostname() {
				return getLinkProperty(this.uuid, 'hostname');
			},
			set hostname(value) {
				setLinkProperty(this.uuid, 'hostname', value);
			},
			get port() {
				return getLinkProperty(this.uuid, 'port');
			},
			set port(value) {
				setLinkProperty(this.uuid, 'port', value);
			},
			get pathname() {
				var value;

				if(value = getLinkProperty(this.uuid, 'pathname')) {
					return regexMatchLeadingSlash.test(value) ? value : '/' + value;
				}
			},
			set pathname(value) {
				setLinkProperty(this.uuid, 'pathname', value);
			},
			get search() {
				return getLinkProperty(this.uuid, 'search');
			},
			set search(value) {
				setLinkProperty(this.uuid, 'search', value);

				SearchParams.update.call(this);
			},
			get hash() {
				return getLinkProperty(this.uuid, 'hash');
			},
			set hash(value) {
				setLinkProperty(this.uuid, 'hash', value);
			}
		};

		return base.extend(Url);
	}

	provide([ './base', './function/descriptor/generate', './function/unique/uuid' ], definition);
}(this, document));