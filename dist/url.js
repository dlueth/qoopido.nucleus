!function(t,e){"use strict";function n(t,n,i){function u(){var t=e.createElement("a");return t.href="/",t.href.slice(0,-1)}function c(t,e){var n;if(n=d[t])return n.link[e]}function o(t,e,n){var i;(i=d[t])&&(i.link[e]=n)}function r(t){var e=this;a(e,{uuid:new n(t)}),r.update(e)}function s(i){var u=t.call(this),c=e.createElement("a");return c.href=i,d[u.uuid]={link:c,parameter:{}},a(u,{toString:new n(function(){return c.toString()}),valueOf:new n(function(){return c.valueOf()}),parameter:new n(new r(u.uuid))}),u}var a=Object.defineProperties,d={},h=/^\//,f=/[?&]?([^=]+)=([^&]*)/g,b=/%20/g,j=/%5B/g,p=/%5D/g,l=new RegExp("^"+u(),"i"),O={"http:":/:80$/,"https:":/:443$/,"ftp:":/:21$/};return r.prototype={get:function(t){return d[this.uuid].parameter[t]},set:function(t,e){d[this.uuid].parameter[t]=e,r.serialize(this)},remove:function(t){delete d[this.uuid].parameter[t],r.serialize(this)}},r.update=function(t){var e,n=d[t.uuid],u=n.parameter,c=n.link.search.split("+").join(" ");for(i(u,function(t){delete u[t]});e=f.exec(c);)u[decodeURIComponent(e[1])]=decodeURIComponent(e[2])},r.serialize=function(t){var e=d[t.uuid],n=e.parameter,u="";i(n,function(t,e){u+=(u?"&":"?")+encodeURIComponent(t)+"="+encodeURIComponent(e)}),e.link.search=u.replace(b,"+").replace(j,"[").replace(p,"]")},s.prototype={get local(){var t;if(t=c(this.uuid,"href"))return l.test(t)},get href(){return c(this.uuid,"href")},set href(t){o(this.uuid,"href",t)},get origin(){var t=this;return c(t.uuid,"origin")||t.protocol+"//"+t.host},get protocol(){return c(this.uuid,"protocol")},set protocol(t){o(this.uuid,"protocol",t)},get username(){return c(this.uuid,"username")},set username(t){o(this.uuid,"username",t)},get password(){return c(this.uuid,"password")},set password(t){o(this.uuid,"password",t)},get host(){var t,e;if(t=c(this.uuid,"host"))return e=c(this.uuid,"protocol"),O[e]?t.replace(O[e],""):t},set host(t){o(this.uuid,"host",t)},get hostname(){return c(this.uuid,"hostname")},set hostname(t){o(this.uuid,"hostname",t)},get port(){return c(this.uuid,"port")},set port(t){o(this.uuid,"port",t)},get pathname(){var t;if(t=c(this.uuid,"pathname"))return h.test(t)?t:"/"+t},set pathname(t){o(this.uuid,"pathname",t)},get search(){return c(this.uuid,"search")},set search(t){o(this.uuid,"search",t),r.update.call(this)},get hash(){return c(this.uuid,"hash")},set hash(t){o(this.uuid,"hash",t)}},s.extends(t)}provide(["/demand/abstract/uuid","/demand/descriptor","/demand/function/iterate"],n)}(this,document);
//# sourceMappingURL=url.js.map
