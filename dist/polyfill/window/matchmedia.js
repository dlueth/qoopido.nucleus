!function(e,t,n){"use strict";provide(["/demand/function/iterate"],function(i){var r,s,a="polyfill/window/matchmedia",c={},o=0;function d(){var e,t,n,r;i(c,function(i,s){if((e=s.mql).matches!==s.check())for(t={currentTarget:e,matches:e.matches,media:e.media,srcElement:e,target:e,timestamp:+new Date,type:"change"},n=0;r=s.listener[n];n++)r.call(e,t)})}function u(e){var t=o+1,n=[];this.index=String(t),this.source="@media "+e+' { [nucleus-source="'+a+'"] { z-index: '+t+"; } }",this.listener=n,this.mql={matches:!1,media:e,addListener:function(e){e&&n.push(e)},removeListener:function(e){for(var t,i=0;t=n[i];i++)if(t===e){n.splice(i,1);break}}},o++,this.check()}return u.prototype={check:function(){var e;return r.textContent=this.source,e=String(n(r).zIndex)===this.index,r.textContent="",this.mql.matches=e}},"matchMedia"in e||(s=t.getElementsByTagName("script")[0],(r=t.createElement("style")).type="text/css",r.setAttribute("nucleus-source",a),r.setAttribute("style","display: none; position: absolute; width: 0; height: 0; overflow: hidden;"),s.parentNode.insertBefore(r,s),e.addEventListener("resize",d),e.addEventListener("orientationchange",d),e.matchMedia=function(e){return(c[e]||(c[e]=new u(e))).mql}),e.matchMedia})}(this,document,getComputedStyle);
//# sourceMappingURL=matchmedia.js.map
