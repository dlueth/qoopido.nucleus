/*! /support/test/element/video/ogg 1.0.9 | http://nucleus.qoopido.com | (c) 2016 Dirk Lueth */
!function(e){"use strict";function o(o,r){var t=o.defer();return r.then(function(){var o=e.createElement("video");o.canPlayType('video/ogg; codecs="theora, vorbis"')?t.resolve():t.reject()},t.reject),t.pledge}provide(["/demand/pledge","../video"],o)}(document);
//# sourceMappingURL=ogg.js.map
