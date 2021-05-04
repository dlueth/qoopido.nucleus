/**
 * @use /demand/abstract/uuid
 * @use /demand/function/iterate
 */

(function(global, document) {
	'use strict';

	function definition(abstractUuid, iterate) {
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

		function Parameter(uuid) {
			var self = this;

			objectDefineProperties(self, { uuid: { value: uuid } });

			Parameter.update(self);
		}

		Parameter.prototype = {
			/* only for reference
			uuid: null
			*/
			get: function(name) {
				return storage[this.uuid].parameter[name];
			},
			set: function(name, value) {
				storage[this.uuid].parameter[name] = value;

				Parameter.serialize(this);
			},
			remove: function(name) {
				delete storage[this.uuid].parameter[name];

				Parameter.serialize(this);
			}
		};

		Parameter.update = function(context) {
			var properties = storage[context.uuid],
				parameter  = properties.parameter,
				search     = properties.link.search.split('+').join(' '),
				tokens;

			iterate(parameter, function(property) {
				delete parameter[property];
			});

			while(tokens = regexMatchParameter.exec(search)) {
				parameter[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
			}
		};

		Parameter.serialize = function(context) {
			var properties = storage[context.uuid],
				parameter  = properties.parameter,
				result     = '';

			iterate(parameter, function(property, value) {
				result += (!result ? '?' : '&') + encodeURIComponent(property) + '=' + encodeURIComponent(value);
			});

			properties.link.search = result
				.replace(regexMatchSpaces, '+')
				.replace(regexMatchOpeningBrackets, '[')
				.replace(regexMatchClosingBrackets, ']');
		};

		function Url(url) {
			var self = abstractUuid.call(this),
				link = document.createElement('a');

			link.href = url;

			storage[self.uuid] = {
				link:      link,
				parameter: {}
			};

			objectDefineProperties(self, {
				toString:  { value: function() { return link.toString() } },
				valueOf:   { value: function() { return link.valueOf(); } },
				parameter: { value: new Parameter(self.uuid) }
			});

			return self;
		}

		Url.prototype = {
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

				Parameter.update.call(this);
			},
			get hash() {
				return getLinkProperty(this.uuid, 'hash');
			},
			set hash(value) {
				setLinkProperty(this.uuid, 'hash', value);
			}
		};

		return Url.extends(abstractUuid);
	}

	provide([ '/demand/abstract/uuid', '/demand/function/iterate' ], definition);
}(this, document));
