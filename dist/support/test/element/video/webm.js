/*! /support/test/element/video/webm 2.0.3 | http://nucleus.qoopido.com | (c) 2017 Dirk Lueth */
!function(e){"use strict";function n(n,r){var t=n.defer();return r.then(function(){var n=e.createElement("video");n.canPlayType('video/webm; codecs="vp8, vorbis"')?t.resolve():t.reject()},t.reject),t.pledge}provide(["/demand/pledge","../video"],n)}(document);
//# sourceMappingURL=webm.js.map
