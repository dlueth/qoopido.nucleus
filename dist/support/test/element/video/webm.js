!function(c){"use strict";provide(["/demand/pledge","../video"],function(e,n){var t=e.defer();return n.then(function(){c.createElement("video").canPlayType('video/webm; codecs="vp8, vorbis"')?t.resolve():t.reject()},t.reject),t.pledge})}(document);
//# sourceMappingURL=webm.js.map
