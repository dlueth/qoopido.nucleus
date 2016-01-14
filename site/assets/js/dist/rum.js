!function(e){"use strict";function n(n){function t(){o=i.getEntriesByName(r)[0]&&i.getEntriesByName(r)[0].responseEnd,"number"==typeof o&&o>0?demand("/probe").then(function(e){e(o)}):setTimeout(t,100)}var r,o,i=e.performance;return function(e){e&&!r&&(r=n(e),t())}}provide(["/demand/function/resolveUrl"],n)}(this);
//# sourceMappingURL=rum.js.map
