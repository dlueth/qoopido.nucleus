!function(n){"use strict";provide(["/demand/pledge","../video"],function(e,o){var t=e.defer();return o.then(function(){n.createElement("video").canPlayType('video/ogg; codecs="theora, vorbis"')?t.resolve():t.reject()},t.reject),t.pledge})}(document);
//# sourceMappingURL=ogg.js.map
