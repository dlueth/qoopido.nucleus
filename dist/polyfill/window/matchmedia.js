/*! /polyfill/window/matchmedia 1.0.8 | http://nucleus.qoopido.com | (c) 2016 Dirk Lueth */
!function(e,t,n){"use strict";function i(){function i(){var e,t,n,i,r,a;for(e in o)if(t=o[e],n=t.mql,n.matches!==t.check())for(i={currentTarget:n,matches:n.matches,media:n.media,srcElement:n,target:n,timestamp:+new Date,type:"change"},r=0;a=t.listener[r];r++)a.call(n,i)}function r(){var n=t.getElementsByTagName("script")[0];c=t.createElement("style"),c.type="text/css",c.setAttribute("nucleus-source",s),c.setAttribute("style","display: none; position: absolute; width: 0; height: 0; overflow: hidden;"),n.parentNode.insertBefore(c,n),e.addEventListener("resize",i),e.addEventListener("orientationchange",i)}function a(e){var t=this,n=u+1,i=[];t.index=String(n),t.source="@media "+e+' { [nucleus-source="'+s+'"] { z-index: '+n+"; } }",t.listener=i,t.mql={matches:!1,media:e,addListener:function(e){e&&i.push(e)},removeListener:function(e){for(var t,n=0;t=i[n];n++)if(t===e){i.splice(n,1);break}}},u++,t.check()}var c,s="polyfill/window/matchmedia",o={},u=0;return a.prototype={check:function(){var e,t=this;return c.textContent=t.source,e=String(n(c).zIndex)===t.index,c.textContent="",t.mql.matches=e}},"matchMedia"in e||(r(),e.matchMedia=function(e){return(o[e]||(o[e]=new a(e))).mql}),e.matchMedia}provide(i)}(this,document,getComputedStyle);
//# sourceMappingURL=matchmedia.js.map
