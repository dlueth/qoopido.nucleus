/**! Qoopido.nucleus 3.2.12 | http://nucleus.qoopido.com | (c) 2021 Dirk Lueth */
!function(t,e){"use strict";provide(["../function/string/ucfirst"],(function(i){var n,o=t.getComputedStyle(e.documentElement,""),r=/^-(webkit|apple|moz|ms|o)-/,u=null,c=0;return function(){if(null===u){for(u=!1;n=o[c];c++)if(r.test(n)){u=n.match(r)[1];break}!u&&"WebkitOpacity"in o&&(u="WebKit"),!u&&"KhtmlOpacity"in o&&(u="Khtml"),u=u?[u.toLowerCase(),i(u.toLowerCase()),u]:[]}return u}}))}(this,document);
//# sourceMappingURL=prefix.js.map
