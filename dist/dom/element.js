!function(e,t){"use strict";function n(n,r,i,o,u,s,a,d,f){function l(n,r,i){var o,u=this;o=t.createEvent("CustomEvent"),o.initCustomEvent(n,"load"!==n,!0,r),i&&(o.uuid=i,o.isDelegate=!0),u.node.dispatchEvent(o),u.node===e||o.defaultPrevented||"function"!=typeof u.node[n]||u.node[n]()}function c(e){if("string"==typeof e)try{e=x.test(e)?t.createElement(e.replace(x,"$1").toLowerCase()):t.querySelector(e)}catch(t){e=E}if(!e)throw new Error("Element could not be resolved");return e}function h(e){return b.apply([],S(e)).join(" ").split(H)}function p(e,t){for(var n,r=0;n=e.path[r];r++){if(n[L](t))return e.currentTarget=n,!0;if(n===e.currentTarget)break}return!1}function g(e,t,n,r,i){var o=!(r&&1===r),u=!!o&&[];for(i=!o&&i;e=t.call(e);)if(1===e.nodeType){if(!n||e[L](n)){if(!o)return e;u.push(e)}if(i)break}return u}function v(e,t,n,r){var i=!(n&&1===n),o=!!i&&[];for(r=!i&&r;e=e.parentNode;)if(1===e.nodeType){if(!t||e[L](t)){if(!i)return e;o.push(e)}if(r)break}return o}function m(t,r,i){var u,a=this;return t=c(t),u=t.uuid,u||(u=o(),I[u]={},C(t,"uuid",new s(u))),A(a,{uuid:new s(u),type:new s(t===e?"#window":t.nodeName),node:new s(t)}),n(r)&&a.setAttributes(r),n(i)&&a.setStyles(i),a}var y=t.body||t.getElementsByTagName("body")[0],b=Array.prototype.concat,S=Array.prototype.slice,C=Object.defineProperty,A=Object.defineProperties,T=t.getElementsByTagName("head")[0],E=null,N="undefined",w="string",B="textContent"in t.createElement("a")?"textContent":"innerText",L=f("matches",y)||f("matchesSelector",y),x=/^<(\w+)\s*\/>$/,H=/ +/g,P=/^\s*^/,j=i(T.previousElementSibling,N)?function(){for(var e=this;e=e.previousSibling;)if(1===e.nodeType)return e}:function(){return this.previousElementSibling},O=i(T.nextElementSibling,N)?function(){for(var e=this;e=e.nextSibling;)if(1===e.nodeType)return e}:function(){return this.nextElementSibling},I={};return m.prototype={clone:function(){return new m(this.node.cloneNode(!0))},getPosition:function(){var e=this.node.getBoundingClientRect();return{left:e.left+y.scrollLeft,top:e.top+y.scrollTop}},getOffset:function(e){var t=this.node,n=e?t.getBoundingClientRect():null;return{left:e?n.left:t.offsetLeft,top:e?n.top:t.offsetTop}},getWidth:function(e){var t,n=this.node,r=n.offsetWidth;return e&&(t=getComputedStyle(n),r+=parseInt(t.marginLeft)+parseInt(t.marginRight)),r},getHeight:function(e){var t,n=this.node,r=n.offsetHeight;return e&&(t=getComputedStyle(n),r+=parseInt(t.marginTop)+parseInt(t.marginBottom)),r},getContent:function(e){var t=this.node;return e?t.innerHTML:t[B]},getAttribute:function(e){var t=this;if(i(e,w))return t.node.getAttribute(e)},getAttributes:function(){for(var e,t=this,n={},r=h(arguments),i=0;e=r[i];i++)n[e]=t.node.getAttribute(e);return n},getStyle:function(e){var t=this;if(i(e,w))return d.process("get",t.node,e)},getStyles:function(){for(var e,t=this,n={},r=h(arguments),i=0;e=r[i];i++)n[e]=d.process("get",t.node,e);return n},getSiblingBefore:function(e,t){return g(this.node,j,e,1,t)},getSiblingAfter:function(e,t){return g(this.node,O,e,1,t)},getSiblings:function(e){return this.getSiblingsBefore(e).concat(this.getSiblingsAfter(e))},getSiblingsBefore:function(e){return g(this.node,j,e)},getSiblingsAfter:function(e){return g(this.node,O,e)},getChildren:function(e){var t,n,r,i,o=this.node;if(e)P.test(e)?(t=o.uuid,o.setAttribute("nucleus-uuid",t),e='[nucleus-uuid="'+t+'"] '+e,n=S.call(o.parentNode.querySelectorAll(e)),o.removeAttribute("nucleus-uuid")):n=S.call(o.querySelectorAll(e));else for(n=[],r=0;i=o.childNodes[r];r++)1===i.nodeType&&n.push(i);return n},getParent:function(e,t){return v(this.node,e,1,t)},getParents:function(e){return v(this.node,e)},hasChild:function(e){var t=this.node;return t!==e&&t.contains(e.node||e)},hasClass:function(e){return!!e&&new RegExp("(?:^|\\s)"+e+"(?:\\s|$)").test(this.node.className)},isVisible:function(){var e=this,t=e.node;return!(t.offsetWidth<=0&&t.offsetHeight<=0||"hidden"===e.getStyle("visibility")||e.getStyle("opacity")<=0)},setContent:function(e,t){var n=this,r=n.node;return t?r.innerHTML=e:r[B]=e,n},setAttribute:function(e,t){var n=this;return i(e,w)&&n.node.setAttribute(e,t),n},setAttributes:function(e){var t=this;return u(e,function(e,n){t.setAttribute(e,n)}),t},removeAttribute:function(e){var t=this;return i(e,w)&&t.node.removeAttribute(e),t},removeAttributes:function(){for(var e,t=this,n=h(arguments),r=0;e=n[r];r++)t.removeAttribute(e);return t},setStyle:function(e,t){var n=this;return i(e,w)&&d.process("set",n.node,e,t),n},setStyles:function(e){var t=this;return u(e,function(e,n){d.process("set",t.node,e,n)}),t},removeStyle:function(e){var t=this;return i(e,w)&&t.setStyle(e,""),t},removeStyles:function(){for(var e,t=this,n=h(arguments),r=0;e=n[r];r++)t.setStyle(e,"");return t},addClass:function(e){var t=this;return e&&!t.hasClass(e)&&(t.node.className+=t.node.className?" "+e:e),t},removeClass:function(e){var t=this;return e&&t.hasClass(e)&&(t.node.className=t.node.className.replace(new RegExp("(?:^|\\s)"+e+"(?!\\S)"),"").trim()),t},toggleClass:function(e){var t=this;return e&&(t.hasClass(e)?t.removeClass(e):t.addClass(e)),t},prepend:function(e){var t=this,n=t.node;if(e)try{e=r(e,m)?e.node:c(e),n.firstChild?n.insertBefore(e,n.firstChild):t.append(e)}catch(t){n.insertAdjacentHTML("afterBegin",e)}return t},append:function(e){var t=this,n=t.node;if(e)try{n.appendChild(r(e,m)?e.node:c(e))}catch(t){n.insertAdjacentHTML("beforeEnd",e)}return t},prependTo:function(e){var t=this,n=t.node;return e&&((e=e.node||c(e)).firstChild?e.insertBefore(n,e.firstChild):t.appendTo(e)),t},appendTo:function(e){var t=this;return e&&(e.node||c(e)).appendChild(t.node),t},insertBefore:function(e){var t=this,n=t.node;return e&&(e=e.node||c(e)).parentNode.insertBefore(n,e),t},insertAfter:function(e){var t=this,n=t.node;return e&&((e=e.node||c(e)).nextSibling?e.parentNode.insertBefore(n,e.nextSibling):t.appendTo(e.parentNode)),t},replace:function(e){var t=this,n=t.node;return e&&(e=e.node||c(e)).parentNode.replaceChild(n,e),t},replaceWith:function(e){var t=this,n=t.node;return e&&(e=r(e,m)?e.node:c(e),n.parentNode.replaceChild(e,n)),t},detach:function(){var e=this,t=e.node;return t.parentNode.removeChild(t),e},on:function(e){var t,n=this,r=arguments.length>2?arguments[1]:E,i=r?arguments[2]:arguments[1],u=i.uuid||(i.uuid=o()),s=0;for(e=e.split(H);t=e[s];s++){var d=t+"-"+u,f=function(e){var t;e=new a(e),e.isPropagationStopped||(t=e.delegate,e.uuid=o(),r&&!p(e,r)||i.call(e.currentTarget,e,e.originalEvent.detail),t&&(delete e.delegate,l.call(n,t)))};f.type=t,I[n.uuid][d]=f,n.node.addEventListener(t,f)}return n},one:function(e){var t=this,n=arguments.length>3||"string"==typeof arguments[1]?arguments[1]:E,r=arguments.length>3||"function"==typeof arguments[2]?arguments[2]:arguments[1],i=(arguments.length>3?arguments[3]:arguments[2])!==!1,u=function(n){t.off(i===!0?n.type:e,u),r.call(this,n,n.originalEvent.detail)};return r.uuid=u.uuid=o(),n?t.on(e,n,u):t.on(e,u),t},off:function(e,t){var n,r,i,o=this,u=o.node,s=0;for(e=e.split(" ");n=e[s];s++)r=t.uuid&&n+"-"+t.uuid||E,i=r&&I[o.uuid][r]||E,i?(u.removeEventListener(n,i),delete I[o.uuid][r]):u.removeEventListener(n,t);return o},emit:function(e,t){var n=this;return l.call(n,e,t),n}},m}provide(["/demand/validator/isObject","/demand/validator/isInstanceOf","/demand/validator/isTypeOf","/demand/function/uuid","/demand/function/iterate","/demand/descriptor","./event","../hooks/css","../support/method"],n)}(this,document);
//# sourceMappingURL=element.js.map
