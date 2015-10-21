/*! Qoopido.nucleus 1.0.0 | https://github.com/dlueth/qoopido.nucleus | (c) 2015 Dirk Lueth */
!function(e,t){"use strict";function n(n,r,i,s,u,o,a,l){function c(e){var t,n,r;for(t in j)n=j[t],(!n.match||n.match.test(e))&&(r=n);return r}function f(e,n,r){var i=this,s=c(e),u=t.createEvent(s.type);u[s.method](e,"load"===e?!1:!0,!0,n),r&&(u._quid=r,u.isDelegate=!0),i.element.dispatchEvent(u)}function m(e){if("string"==typeof e)try{e=x.test(e)?t.createElement(e.replace(x,"$1").toLowerCase()):t.querySelector(e)}catch(n){e=E}if(!e)throw new Error("Element could not be resolved");return e}function h(e){return g.apply([],b(e)).join(" ").split(_)}function d(e,t){for(var n,r=0;n=e.path[r];r++){if(n[q](t))return e.currentTarget=n,!0;if(n===e.currentTarget)break}return!1}function p(t,r,i){var s,u=this;return t=m(t),s=t._quid,s?u=L[s]:(s=l(),S(u,{uuid:a(s),type:a(t===e?"#window":t.nodeName),element:a(t)}),y(t,"_quid",a(s)),L[s]=u,M[s]={}),n(r)&&u.setAttributes(r),n(i)&&u.setStyles(i),u}var v=t.body||t.getElementsByTagName("body")[0],g=Array.prototype.concat,b=Array.prototype.slice,y=Object.defineProperty,S=Object.defineProperties,C=t.getElementsByTagName("head")[0],E=null,A="undefined",N="string",T="textContent"in t.createElement("a")?"textContent":"innerText",q=o("matches",v)||o("matchesSelector",v),x=/^<(\w+)\s*\/>$/,_=/ +/g,B=r(C.previousElementSibling,A)?function(){for(var e=this;e=e.previousSibling;)if(1===e.nodeType)return e}:function(){return this.previousElementSibling},w=r(C.nextElementSibling,A)?function(){for(var e=this;e=e.nextSibling;)if(1===e.nodeType)return e}:function(){return this.nextElementSibling},L={},M={},j={custom:{type:"CustomEvent",method:"initCustomEvent"},html:{match:/^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,type:"HTMLEvents",method:"initEvent"},mouse:{match:/^(?:mouse|pointer|contextmenu|touch|click|dblclick|drag|drop)/,type:"MouseEvents",method:"initMouseEvent"}};return p.prototype={getContent:function(e){var t=this.element;return e?t.innerHTML:t[T]},getAttribute:function(e){var t=this;return r(e,N)?t.element.getAttribute(e):void 0},getAttributes:function(){for(var e,t=this,n={},r=h(arguments),i=0;e=r[i];i++)n[e]=t.element.getAttribute(e);return n},getStyle:function(e){var t=this;return r(e,N)?u.process("get",t.element,e):void 0},getStyles:function(){for(var e,t=this,n={},r=h(arguments),i=0;e=r[i];i++)n[e]=u.process("get",t.element,e);return n},getSiblingBefore:function(e,t){var n=B.call(this.element);if(!e)return n;if(t)return n.matches(e)&&n;for(;n;n=B.call(n))if(n.matches(e))return n},getSiblingAfter:function(e,t){var n=w.call(this.element);if(!e)return n;if(t)return n.matches(e)&&n;for(;n;n=w.call(n))if(n.matches(e))return n},getSiblings:function(e){for(var t=this.element,n=t.parentNode.firstChild,r=[];n;n=w.call(n))n===t||e&&!n.matches(e)||r.push(n);return r},getSiblingsBefore:function(e){for(var t=B.call(this.element),n=[];t;t=B.call(t))(!e||t.matches(e))&&n.push(t);return n},getSiblingsAfter:function(e){for(var t=w.call(this.element),n=[];t;t=w.call(t))(!e||t.matches(e))&&n.push(t);return n},getChildren:function(e){var t,n,r=this.element;return e=e.trim(),""===e?n=r.childNodes:">"===e.charAt(0)?(t=r._quid,r.setAttribute("bunch-uuid",t),e='[bunch-uuid="'+t+'"] '+e,n=r.parentNode.querySelectorAll(e),r.removeAttribute("bunch-uuid")):n=r.querySelectorAll(e),n&&b.call(n)},getParent:function(e,t){var n;if(!e)return this.element.parentNode;if(n=this.element,t)return n.matches(e)&&n;for(;n;n=n.parentNode)if(n.matches(e))return n},getParents:function(e){for(var t=this.element.parentNode,n=[];t;t=t.parentNode){if(9===t.nodeType)return n;1===t.nodeType&&(!e||t.matches(e))&&n.push(t)}},hasClass:function(e){return e?new RegExp("(?:^|\\s)"+e+"(?:\\s|$)").test(this.element.className):!1},isVisible:function(){var e=this,t=e.element;return!(t.offsetWidth<=0&&t.offsetHeight<=0||"hidden"===e.getStyle("visibility")||e.getStyle("opacity")<=0)},setContent:function(e,t){var n=this,r=n.element;return t?r.innerHTML=e:r[T]=e,n},setAttribute:function(e,t){var n=this;return r(e,N)&&n.element.setAttribute(e,t),n},setAttributes:function(e){var t,r=this;if(n(e)&&!e.length)for(t in e)r.setAttribute(t,e[t]);return r},removeAttribute:function(e){var t=this;return r(e,N)&&t.element.removeAttribute(e),t},removeAttributes:function(){for(var e,t=this,n=h(arguments),r=0;e=n[r];r++)t.removeAttribute(e);return t},setStyle:function(e,t){var n=this;return r(e,N)&&u.process("set",n.element,e,t),n},setStyles:function(e){var t,r=this;if(n(e)&&!e.length)for(t in e)u.process("set",r.element,t,e[t]);return r},removeStyle:function(e){var t=this;return r(e,N)&&t.setStyle(e,""),t},removeStyles:function(){for(var e,t=this,n=h(arguments),r=0;e=n[r];r++)t.setStyle(e,"");return t},addClass:function(e){var t=this;return e&&!t.hasClass(e)&&(t.element.className+=t.element.className?" "+e:e),t},removeClass:function(e){var t=this;return e&&t.hasClass(e)&&(t.element.className=t.element.className.replace(new RegExp("(?:^|\\s)"+e+"(?!\\S)"),"")),t},toggleClass:function(e){var t=this;return e&&(t.hasClass(e)?t.removeClass(e):t.addClass(e)),t},prepend:function(e){var t=this,n=t.element;if(e)try{e=e.element||m(e),n.firstChild?n.insertBefore(e,n.firstChild):t.append(e)}catch(r){n.insertAdjacentHTML("afterBegin",e)}return t},append:function(e){var t=this,n=t.element;if(e)try{n.appendChild(e.element||m(e))}catch(r){n.insertAdjacentHTML("beforeEnd",e)}return t},prependTo:function(e){var t=this,n=t.element;return e&&((e=e.element||m(e)).firstChild?e.insertBefore(n,e.firstChild):t.appendTo(e)),t},appendTo:function(e){var t=this;return e&&(e.element||m(e)).appendChild(t.element),t},insertBefore:function(e){var t=this,n=t.element;return e&&(e=e.element||m(e)).parentNode.insertBefore(n,e),t},insertAfter:function(e){var t=this,n=t.element;return e&&((e=e.element||m(e)).nextSibling?e.parentNode.insertBefore(n,e.nextSibling):t.appendTo(e.parentNode)),t},replace:function(e){var t=this,n=t.element;return e&&(e=e.element||m(e)).parentNode.replaceChild(n,e),t},replaceWith:function(e){var t=this,n=t.element;return e&&(e=e.element||m(e),n.parentNode.replaceChild(e,n)),t},remove:function(){var e=this,t=e.element;return t.parentNode.removeChild(t),e},on:function(e){var t,n=this,r=n.element,i=arguments.length>2?arguments[1]:E,u=i?arguments[2]:arguments[1],o=u._quid||(u._quid=l()),a=0;for(e=e.split(_);t=e[a];a++){var c=t+"-"+o,m=function(e){var t;e=new s(e),e.isPropagationStopped||(t=e.delegate,e._quid=l(),(!i||d(e,i))&&u.call(e.currentTarget,e,e.originalEvent.detail),t&&(delete e.delegate,f.call(n,t)))};m.type=t,M[n.uuid][c]=m,r.addEventListener(t,m)}return n},one:function(e){var t=this,n=arguments.length>3||"string"==typeof arguments[1]?arguments[1]:E,r=arguments.length>3||"function"==typeof arguments[2]?arguments[2]:arguments[1],i=(arguments.length>3?arguments[3]:arguments[2])!==!1,s=function(n){t.off(i===!0?n.type:e,s),r.call(this,n,n.originalEvent.detail)};return r._quid=s._quid=l(),n?t.on(e,n,s):t.on(e,s),t},off:function(e,t){var n,r,i,s=this,u=s.element,o=0;for(e=e.split(" ");n=e[o];o++)r=t._quid&&n+"-"+t._quid||E,i=r&&M[s.uuid][r]||E,i?(u.removeEventListener(n,i),delete M[s.uuid][r]):u.removeEventListener(n,t);return s},emit:function(e,t){var n=this;return f.call(n,e,t),n}},i.extend(p)}provide(["/demand/validator/isObject","/demand/validator/isTypeOf","../base","./event","../hooks/css","../support/method","../function/descriptor/generate","../function/unique/uuid"],n)}(this,document);
//# sourceMappingURL=element.js.map