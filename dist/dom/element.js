/*! /dom/element 1.0.5 | http://nucleus.qoopido.com | (c) 2016 Dirk Lueth */
!function(e,t){"use strict";function n(n,r,i,s,u,o,a,l){function f(n,r,i){var s,u=this;s=t.createEvent("CustomEvent"),s.initCustomEvent(n,"load"===n?!1:!0,!0,r),i&&(s._quid=i,s.isDelegate=!0),u.element.dispatchEvent(s),u.element===e||s.defaultPrevented||"function"!=typeof u.element[n]||u.element[n]()}function c(e){if("string"==typeof e)try{e=B.test(e)?t.createElement(e.replace(B,"$1").toLowerCase()):t.querySelector(e)}catch(n){e=E}if(!e)throw new Error("Element could not be resolved");return e}function m(e){return b.apply([],y(e)).join(" ").split(_)}function d(e,t){for(var n,r=0;n=e.path[r];r++){if(n[x](t))return e.currentTarget=n,!0;if(n===e.currentTarget)break}return!1}function h(t,r,i){var s,u=this;return t=c(t),s=t._quid,s?u=P[s]:(s=l(),C(u,{uuid:a(s),type:a(t===e?"#window":t.nodeName),element:a(t)}),S(t,"_quid",a(s)),P[s]=u,H[s]={}),n(r)&&u.setAttributes(r),n(i)&&u.setStyles(i),u}function g(e,t,n,r,i){var s=!(r&&1===r),u=s?[]:!1;for(i=s?!1:i;e=t.call(e);)if(1===e.nodeType){if(!n||e[x](n)){if(!s)return e;u.push(e)}if(i)break}return u}function p(e,t,n,r){var i=!(n&&1===n),s=i?[]:!1;for(r=i?!1:r;e=e.parentNode;)if(1===e.nodeType){if(!t||e[x](t)){if(!i)return e;s.push(e)}if(r)break}return s}var v=t.body||t.getElementsByTagName("body")[0],b=Array.prototype.concat,y=Array.prototype.slice,S=Object.defineProperty,C=Object.defineProperties,A=t.getElementsByTagName("head")[0],E=null,T="undefined",N="string",q="textContent"in t.createElement("a")?"textContent":"innerText",x=o("matches",v)||o("matchesSelector",v),B=/^<(\w+)\s*\/>$/,_=/ +/g,w=/^\s*^/,L=r(A.previousElementSibling,T)?function(){for(var e=this;e=e.previousSibling;)if(1===e.nodeType)return e}:function(){return this.previousElementSibling},j=r(A.nextElementSibling,T)?function(){for(var e=this;e=e.nextSibling;)if(1===e.nodeType)return e}:function(){return this.nextElementSibling},P={},H={};return h.prototype={getContent:function(e){var t=this.element;return e?t.innerHTML:t[q]},getAttribute:function(e){var t=this;return r(e,N)?t.element.getAttribute(e):void 0},getAttributes:function(){for(var e,t=this,n={},r=m(arguments),i=0;e=r[i];i++)n[e]=t.element.getAttribute(e);return n},getStyle:function(e){var t=this;return r(e,N)?u.process("get",t.element,e):void 0},getStyles:function(){for(var e,t=this,n={},r=m(arguments),i=0;e=r[i];i++)n[e]=u.process("get",t.element,e);return n},getSiblingBefore:function(e,t){return g(this.element,L,e,1,t)},getSiblingAfter:function(e,t){return g(this.element,j,e,1,t)},getSiblings:function(e){return this.getSiblingsBefore(e).concat(this.getSiblingsAfter(e))},getSiblingsBefore:function(e){return g(this.element,L,e)},getSiblingsAfter:function(e){return g(this.element,j,e)},getChildren:function(e){var t,n,r=this.element;return e?w.test(e)?(t=r._quid,r.setAttribute("nucleus-uuid",t),e='[nucleus-uuid="'+t+'"] '+e,n=r.parentNode.querySelectorAll(e),r.removeAttribute("nucleus-uuid")):n=r.querySelectorAll(e):n=r.childNodes,n&&y.call(n)},getParent:function(e,t){return p(this.element,e,1,t)},getParents:function(e){return p(this.element,e)},hasClass:function(e){return e?new RegExp("(?:^|\\s)"+e+"(?:\\s|$)").test(this.element.className):!1},isVisible:function(){var e=this,t=e.element;return!(t.offsetWidth<=0&&t.offsetHeight<=0||"hidden"===e.getStyle("visibility")||e.getStyle("opacity")<=0)},setContent:function(e,t){var n=this,r=n.element;return t?r.innerHTML=e:r[q]=e,n},setAttribute:function(e,t){var n=this;return r(e,N)&&n.element.setAttribute(e,t),n},setAttributes:function(e){var t,r=this;if(n(e)&&!e.length)for(t in e)r.setAttribute(t,e[t]);return r},removeAttribute:function(e){var t=this;return r(e,N)&&t.element.removeAttribute(e),t},removeAttributes:function(){for(var e,t=this,n=m(arguments),r=0;e=n[r];r++)t.removeAttribute(e);return t},setStyle:function(e,t){var n=this;return r(e,N)&&u.process("set",n.element,e,t),n},setStyles:function(e){var t,r=this;if(n(e)&&!e.length)for(t in e)u.process("set",r.element,t,e[t]);return r},removeStyle:function(e){var t=this;return r(e,N)&&t.setStyle(e,""),t},removeStyles:function(){for(var e,t=this,n=m(arguments),r=0;e=n[r];r++)t.setStyle(e,"");return t},addClass:function(e){var t=this;return e&&!t.hasClass(e)&&(t.element.className+=t.element.className?" "+e:e),t},removeClass:function(e){var t=this;return e&&t.hasClass(e)&&(t.element.className=t.element.className.replace(new RegExp("(?:^|\\s)"+e+"(?!\\S)"),"").trim()),t},toggleClass:function(e){var t=this;return e&&(t.hasClass(e)?t.removeClass(e):t.addClass(e)),t},prepend:function(e){var t=this,n=t.element;if(e)try{e=e.element||c(e),n.firstChild?n.insertBefore(e,n.firstChild):t.append(e)}catch(r){n.insertAdjacentHTML("afterBegin",e)}return t},append:function(e){var t=this,n=t.element;if(e)try{n.appendChild(e.element||c(e))}catch(r){n.insertAdjacentHTML("beforeEnd",e)}return t},prependTo:function(e){var t=this,n=t.element;return e&&((e=e.element||c(e)).firstChild?e.insertBefore(n,e.firstChild):t.appendTo(e)),t},appendTo:function(e){var t=this;return e&&(e.element||c(e)).appendChild(t.element),t},insertBefore:function(e){var t=this,n=t.element;return e&&(e=e.element||c(e)).parentNode.insertBefore(n,e),t},insertAfter:function(e){var t=this,n=t.element;return e&&((e=e.element||c(e)).nextSibling?e.parentNode.insertBefore(n,e.nextSibling):t.appendTo(e.parentNode)),t},replace:function(e){var t=this,n=t.element;return e&&(e=e.element||c(e)).parentNode.replaceChild(n,e),t},replaceWith:function(e){var t=this,n=t.element;return e&&(e=e.element||c(e),n.parentNode.replaceChild(e,n)),t},remove:function(){var e=this,t=e.element;return t.parentNode.removeChild(t),e},on:function(e){var t,n=this,r=n.element,i=arguments.length>2?arguments[1]:E,u=i?arguments[2]:arguments[1],o=u._quid||(u._quid=l()),a=0;for(e=e.split(_);t=e[a];a++){var c=t+"-"+o,m=function(e){var t;e=new s(e),e.isPropagationStopped||(t=e.delegate,e._quid=l(),(!i||d(e,i))&&u.call(e.currentTarget,e,e.originalEvent.detail),t&&(delete e.delegate,f.call(n,t)))};m.type=t,H[n.uuid][c]=m,r.addEventListener(t,m)}return n},one:function(e){var t=this,n=arguments.length>3||"string"==typeof arguments[1]?arguments[1]:E,r=arguments.length>3||"function"==typeof arguments[2]?arguments[2]:arguments[1],i=(arguments.length>3?arguments[3]:arguments[2])!==!1,s=function(n){t.off(i===!0?n.type:e,s),r.call(this,n,n.originalEvent.detail)};return r._quid=s._quid=l(),n?t.on(e,n,s):t.on(e,s),t},off:function(e,t){var n,r,i,s=this,u=s.element,o=0;for(e=e.split(" ");n=e[o];o++)r=t._quid&&n+"-"+t._quid||E,i=r&&H[s.uuid][r]||E,i?(u.removeEventListener(n,i),delete H[s.uuid][r]):u.removeEventListener(n,t);return s},emit:function(e,t){var n=this;return f.call(n,e,t),n}},i.extend(h)}provide(["/demand/validator/isObject","/demand/validator/isTypeOf","../base","./event","../hooks/css","../support/method","../function/descriptor/generate","../function/unique/uuid"],n)}(this,document);
//# sourceMappingURL=element.js.map
