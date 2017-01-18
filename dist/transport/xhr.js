/*! /transport/xhr 2.0.3 | http://nucleus.qoopido.com | (c) 2017 Dirk Lueth */
!function(e,t){"use strict";function n(n,r,o,i,s,a,u){function c(e){var t,n="";for(t in e)n+=(n?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(e[t]);return n.replace(g,"+").replace(T,"[").replace(R,"]")}function d(e){var t,o,i=this,s=q[i.uuid],a=s.settings,u=s.url,d=s.data,l=u.local?new h:new m,p=n.defer();if(d&&"GET"===e){for(t in d)u.searchParams.set(t,d[t]);d=null}if(a.cache||u.searchParams.set("nucleus[time]",+new Date),d&&(d=c(d)),r(a.xhrOptions))for(t in a.xhrOptions)l[t]=a.xhrOptions[t];if(l.onprogress=function(){},l.ontimeout=l.onerror=l.onabort=function(){p.reject()},l.onload=function(){o=clearTimeout(o),"status"in l&&200!==l.status?p.reject():p.resolve(l.responseText)},l.open(e,u.href,!0),l.setRequestHeader&&(l.setRequestHeader("Accept",a.accept),d&&"GET"!==e&&l.setRequestHeader("Content-Type",a.contentType),r(a.header)))for(t in a.header)l.setRequestHeader(t,a.header[t]);return l.send(d),o=setTimeout(function(){l.readyState<4&&l.abort()},a.timeout),p.pledge}function l(e,t,n){var r=this,o=u();f(r,"uuid",a(o)),q[o]={settings:s({},p.settings,n),url:new i(e),data:t}}var p,f=Object.defineProperty,h=t,m="XDomainRequest"in e&&e.XDomainRequest||h,g=/%20/g,T=/%5B/g,R=/%5D/g,q={};return l.prototype={get:function(){return d.call(this,"GET")},post:function(){return d.call(this,"POST")},put:function(){return d.call(this,"PUT")},delete:function(){return d.call(this,"DELETE")},head:function(){return d.call(this,"HEAD")}},p=o.extend(l),p.settings={accept:"*/*",timeout:8e3,async:!0,cache:!1,username:null,password:null,contentType:"application/x-www-form-urlencoded; charset=UTF-8",header:{},xhrOptions:{}},p}provide(["/demand/pledge","/demand/validator/isObject","../base","../url","../function/merge","../function/descriptor/generate","../function/unique/uuid"],n)}(this,XMLHttpRequest);
//# sourceMappingURL=xhr.js.map
