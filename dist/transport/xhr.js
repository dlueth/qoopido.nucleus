!function(e,t){"use strict";function n(n,r,a,o,u,s){function c(e){var t="";return o(e,function(e,n){t+=(t?"&":"")+encodeURIComponent(e)+"="+encodeURIComponent(n)}),t.replace(h,"+").replace(f,"[").replace(m,"]")}function i(){this.readyState<4&&this.abort()}function l(e){var n,u=this,s=T[u.uuid],l=s.settings,d=s.url,h=s.data,f=d.local?new t:new p,m=r.defer(),g=i.bind(f),R=l.timeout;return h&&"GET"===e&&(o(h,d.parameter.set),h=null),l.cache||d.parameter.set("nucleus",+new Date),h&&(h=c(h)),a(l.xhrOptions)&&o(l.xhrOptions,function(e,t){f[e]=t}),f.ontimeout=f.onerror=f.onabort=function(){m.reject(f)},f.onprogress=f.onreadystatechange=function(){clearTimeout(n),n=setTimeout(g,R)},f.onload=function(){n=clearTimeout(n),"status"in f&&200!==f.status?m.reject(f):m.resolve(f.responseText,f)},f.open(e,d.href,!0),f.setRequestHeader&&(f.setRequestHeader("Accept",l.accept),h&&"GET"!==e&&f.setRequestHeader("Content-Type",l.contentType),a(l.header)&&o(l.header,function(e,t){f.setRequestHeader(e,t)})),f.send(h),n=setTimeout(g,R),m.pledge}function d(e,t,n){var r=this.parent.constructor.call(this);T[r.uuid]={settings:s({},d.settings,n),url:new u(e),data:t}}var p="XDomainRequest"in e&&e.XDomainRequest||t,h=/%20/g,f=/%5B/g,m=/%5D/g,T={};return d.prototype={get:function(){return l.call(this,"GET")},post:function(){return l.call(this,"POST")},put:function(){return l.call(this,"PUT")},patch:function(){return l.call(this,"PATCH")},delete:function(){return l.call(this,"DELETE")},head:function(){return l.call(this,"HEAD")}},d.settings={accept:"*/*",timeout:8e3,async:!0,cache:!1,username:null,password:null,contentType:"application/x-www-form-urlencoded; charset=UTF-8",header:{},xhrOptions:{}},d.extends(n)}provide(["/demand/abstract/uuid","/demand/pledge","/demand/validator/isObject","/demand/function/iterate","../url","../function/merge"],n)}(this,XMLHttpRequest);
//# sourceMappingURL=xhr.js.map
