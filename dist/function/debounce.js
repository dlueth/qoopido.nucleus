!function(o){"use strict";provide(function(){return function(e,i,u){var r;function a(){var n=this,t=arguments,c=u&&!r;a.cancel(),r=o(function(){a.cancel(),!u&&e.apply(n,t)},parseInt(i,10)||200),c&&e.apply(n,t)}return a.cancel=function(){r=clearTimeout(r)},a}})}(setTimeout);
//# sourceMappingURL=debounce.js.map
