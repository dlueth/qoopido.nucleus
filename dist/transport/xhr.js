/**! Qoopido.nucleus 3.2.2 | http://nucleus.qoopido.com | (c) 2020 Dirk Lueth */
!function(e,t){"use strict";provide(["/demand/weakmap","/demand/pledge","/demand/validator/isObject","/demand/function/iterate","../url","../function/merge"],(function(n,r,a,s,i,o){var u="XDomainRequest"in e&&e.XDomainRequest||t,c=new n;function d(){this.readyState<4&&this.abort()}function l(e){var n,o=c.get(this),l=o.settings,f=o.url,p=function e(t,n,r){var i,o=0;if(n=n||"",r=r||{},Array.isArray(t))for(o=0;"undefined"!=typeof(i=t[o]);o++)e(i,n+"["+o+"]",r);else a(t)?s(t,(function(t,a){e(a,n?n+"["+t+"]":t,r)})):n&&"undefined"!=typeof t&&(r[n]=t);return r}(o.data),h=f.local?new t:new u,m=r.defer(),T=d.bind(h),g=l.timeout;return p&&"GET"===e&&(s(p,f.parameter.set,f),p=null),l.cache||f.parameter.set("nucleus",+new Date),p&&(p=function(e){var t=new i("/");return s(e,t.parameter.set,t),t.search.substr(1)}(p)),a(l.xhrOptions)&&s(l.xhrOptions,(function(e,t){h[e]=t})),h.ontimeout=h.onerror=h.onabort=function(){m.reject(h)},h.onprogress=h.onreadystatechange=function(){clearTimeout(n),n=setTimeout(T,g)},h.onload=function(){n=clearTimeout(n),"status"in h&&200!==h.status?m.reject(h):m.resolve(h.responseText,h)},h.open(e,f.href,!0),h.setRequestHeader&&(h.setRequestHeader("Accept",l.accept),p&&"GET"!==e&&h.setRequestHeader("Content-Type",l.contentType),a(l.header)&&s(l.header,(function(e,t){h.setRequestHeader(e,t)}))),h.send(p),n=setTimeout(T,g),m.pledge}function f(e,t,n){return c.set(this,{settings:o({},f.settings,n),url:new i(e),data:t}),this}return f.prototype={get:function(){return l.call(this,"GET")},post:function(){return l.call(this,"POST")},put:function(){return l.call(this,"PUT")},patch:function(){return l.call(this,"PATCH")},delete:function(){return l.call(this,"DELETE")},head:function(){return l.call(this,"HEAD")}},f.settings={accept:"*/*",timeout:8e3,async:!0,cache:!1,username:null,password:null,contentType:"application/x-www-form-urlencoded; charset=UTF-8",header:{},xhrOptions:{}},f}))}(this,XMLHttpRequest);
//# sourceMappingURL=xhr.js.map
