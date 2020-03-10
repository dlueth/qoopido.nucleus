/**! Qoopido.nucleus 3.2.0 | http://nucleus.qoopido.com | (c) 2020 Dirk Lueth */
!function(t,e){"use strict";provide(["/demand/validator/isObject","/demand/validator/isInstanceOf","/demand/validator/isTypeOf","/demand/function/uuid","/demand/function/iterate","/demand/descriptor","./event","../hooks/css","../support/method"],(function(n,i,r,o,s,u,d,a,f){var l=e.body||e.getElementsByTagName("body")[0],c=Array.prototype.concat,h=Array.prototype.slice,p=Object.defineProperty,g=Object.defineProperties,v=e.getElementsByTagName("head")[0],m="textContent"in e.createElement("a")?"textContent":"innerText",y=f("matches",l)||f("matchesSelector",l),b=/^<(\w+)\s*\/>$/,S=/ +/g,C=/^\s*^/,A=r(v.previousElementSibling,"undefined")?function(){for(var t=this;t=t.previousSibling;)if(1===t.nodeType)return t}:function(){return this.previousElementSibling},E=r(v.nextElementSibling,"undefined")?function(){for(var t=this;t=t.nextSibling;)if(1===t.nodeType)return t}:function(){return this.nextElementSibling},T={},N=!1;function w(t){return N||"boolean"==typeof t?t:t&&t.capture}function B(n,i,r){var o;(o=e.createEvent("CustomEvent")).initCustomEvent(n,"load"!==n,!0,i),r&&(o.uuid=r,o.isDelegate=!0),this.node.dispatchEvent(o),this.node===t||o.defaultPrevented||"function"!=typeof this.node[n]||this.node[n]()}function L(t){if("string"==typeof t)try{t=b.test(t)?e.createElement(t.replace(b,"$1").toLowerCase()):e.querySelector(t)}catch(e){t=null}if(!t)throw new Error("Element could not be resolved");return t}function x(t){return c.apply([],h.call(t)).join(" ").split(S)}function P(t,e){for(var n,i=0;n=t.path[i];i++){if(n[y]&&n[y](e))return t.currentTarget=n,!0;if(n===t.currentTarget)break}return!1}function j(t,e,n,i,r){var o=!(i&&1===i),s=!!o&&[];for(r=!o&&r;t=e.call(t);)if(1===t.nodeType){if(!n||t[y](n)){if(!o)return t;s.push(t)}if(r)break}return s}function H(t,e,n,i){var r=!(n&&1===n),o=!!r&&[];for(i=!r&&i;t=t.parentNode;)if(1===t.nodeType){if(!e||t[y](e)){if(!r)return t;o.push(t)}if(i)break}return o}function O(e,i,r){var s;return(s=(e=L(e)).uuid)||(s=o(),T[s]={},p(e,"uuid",new u(s))),g(this,{uuid:new u(s),type:new u(e===t?"#window":e.nodeName),node:new u(e)}),n(i)&&this.setAttributes(i),n(r)&&this.setStyles(r),this}return function(){var e,n=function(){},i=""+ +new Date;try{e=Object.defineProperty({},"passive",{get:function(){N=!0}}),t.addEventListener(i,n,e),t.removeEventListener(i,n,e)}catch(t){}}(),O.prototype={clone:function(){return new O(this.node.cloneNode(!0))},focus:function(){return this.node.focus(),this},blur:function(){return this.node.blur(),this},getPosition:function(){var t=this.node.getBoundingClientRect();return{left:t.left+l.scrollLeft,top:t.top+l.scrollTop}},getOffset:function(t){var e=this.node,n=t?e.getBoundingClientRect():null;return{left:t?n.left:e.offsetLeft,top:t?n.top:e.offsetTop}},getWidth:function(t){var e,n=this.node,i=n.offsetWidth;return t&&(e=getComputedStyle(n),i+=parseInt(e.marginLeft)+parseInt(e.marginRight)),i},getHeight:function(t){var e,n=this.node,i=n.offsetHeight;return t&&(e=getComputedStyle(n),i+=parseInt(e.marginTop)+parseInt(e.marginBottom)),i},getContent:function(t){var e=this.node;return t?e.innerHTML:e[m]},getAttribute:function(t){if(r(t,"string"))return this.node.getAttribute(t)},getAttributes:function(){for(var t,e=this,n={},i=x(arguments),r=0;t=i[r];r++)n[t]=e.node.getAttribute(t);return n},getStyle:function(t){if(r(t,"string"))return a.process("get",this.node,t)},getStyles:function(){for(var t,e=this,n={},i=x(arguments),r=0;t=i[r];r++)n[t]=a.process("get",e.node,t);return n},getSiblingBefore:function(t,e){return j(this.node,A,t,1,e)},getSiblingAfter:function(t,e){return j(this.node,E,t,1,e)},getSiblings:function(t){return this.getSiblingsBefore(t).concat(this.getSiblingsAfter(t))},getSiblingsBefore:function(t){return j(this.node,A,t)},getSiblingsAfter:function(t){return j(this.node,E,t)},getChildren:function(t){var e,n,i,r,o=this.node;if(t)C.test(t)?(e=o.uuid,o.setAttribute("nucleus-uuid",e),t='[nucleus-uuid="'+e+'"] '+t,n=h.call(o.parentNode.querySelectorAll(t)),o.removeAttribute("nucleus-uuid")):n=h.call(o.querySelectorAll(t));else for(n=[],i=0;r=o.childNodes[i];i++)1===r.nodeType&&n.push(r);return n},getParent:function(t,e){return H(this.node,t,1,e)},getParents:function(t){return H(this.node,t)},hasChild:function(t){var e=this.node;return e!==t&&e.contains(t.node||t)},hasClass:function(t){return!!t&&new RegExp("(?:^|\\s)"+t+"(?:\\s|$)").test(this.node.className)},isVisible:function(){var t=this.node;return!(t.offsetWidth<=0&&t.offsetHeight<=0||"hidden"===this.getStyle("visibility")||this.getStyle("opacity")<=0)},setContent:function(t,e){var n=this.node;return e?n.innerHTML=t:n[m]=t,this},setAttribute:function(t,e){return r(t,"string")&&this.node.setAttribute(t,e),this},setAttributes:function(t){var e=this;return s(t,(function(t,n){e.setAttribute(t,n)})),e},removeAttribute:function(t){return r(t,"string")&&this.node.removeAttribute(t),this},removeAttributes:function(){for(var t,e=this,n=x(arguments),i=0;t=n[i];i++)e.removeAttribute(t);return e},setStyle:function(t,e){return r(t,"string")&&a.process("set",this.node,t,e),this},setStyles:function(t){var e=this;return s(t,(function(t,n){a.process("set",e.node,t,n)})),e},removeStyle:function(t){return r(t,"string")&&this.setStyle(t,""),this},removeStyles:function(){for(var t,e=this,n=x(arguments),i=0;t=n[i];i++)e.setStyle(t,"");return e},addClass:function(t){return t&&!this.hasClass(t)&&(this.node.className+=this.node.className?" "+t:t),this},removeClass:function(t){return t&&this.hasClass(t)&&(this.node.className=this.node.className.replace(new RegExp("(?:^|\\s)"+t+"(?!\\S)"),"").trim()),this},toggleClass:function(t){return t&&(this.hasClass(t)?this.removeClass(t):this.addClass(t)),this},prepend:function(t){var e=this.node;if(t)try{t=i(t,O)?t.node:L(t),e.firstChild?e.insertBefore(t,e.firstChild):this.append(t)}catch(n){e.insertAdjacentHTML("afterBegin",t)}return this},append:function(t){var e=this.node;if(t)try{e.appendChild(i(t,O)?t.node:L(t))}catch(n){e.insertAdjacentHTML("beforeEnd",t)}return this},prependTo:function(t){var e=this.node;return t&&((t=t.node||L(t)).firstChild?t.insertBefore(e,t.firstChild):this.appendTo(t)),this},appendTo:function(t){return t&&(t.node||L(t)).appendChild(this.node),this},insertBefore:function(t){var e=this.node;return t&&(t=t.node||L(t)).parentNode.insertBefore(e,t),this},insertAfter:function(t){var e=this.node;return t&&((t=t.node||L(t)).nextSibling?t.parentNode.insertBefore(e,t.nextSibling):this.appendTo(t.parentNode)),this},replace:function(t){var e=this.node;return t&&(t=t.node||L(t)).parentNode.replaceChild(e,t),this},replaceWith:function(t){var e=this.node;return t&&(t=i(t,O)?t.node:L(t),e.parentNode.replaceChild(t,e)),this},detach:function(){var t=this.node;return t.parentNode.removeChild(t),this},on:function(t){var e,n=this,i=4===arguments.length||"string"==typeof arguments[1]?arguments[1]:null,r=4===arguments.length||"function"==typeof arguments[2]?arguments[2]:arguments[1],s=w(arguments.length>3?arguments[3]:arguments[2]),u=r.uuid||(r.uuid=o()),a=0;for(t=t.split(S);e=t[a];a++){var f=e+"-"+u,l=function(t){var e;(t=new d(t)).isPropagationStopped||(e=t.delegate,t.uuid=o(),i&&!P(t,i)||r.call(t.currentTarget,t,t.originalEvent.detail),e&&(delete t.delegate,B.call(n,e)))};l.type=e,T[n.uuid][f]=l,n.node.addEventListener(e,l,s)}return n},one:function(t){var e=this,n=5===arguments.length||"string"==typeof arguments[1]?arguments[1]:null,i=5===arguments.length||"function"==typeof arguments[2]?arguments[2]:arguments[1],r=w(arguments.length>3?arguments[3]:arguments[2]),s=!1!==(arguments.length>4?arguments[4]:arguments[3]),u=function(n){e.off(!0===s?n.type:t,u,r),i.call(this,n,n.originalEvent.detail)};return i.uuid=u.uuid=o(),n?e.on(t,n,u,r):e.on(t,u,r),e},off:function(t,e,n){var i,r,o,s=this.node,u=0;for(n=w(n),t=t.split(" ");i=t[u];u++)(o=(r=e.uuid&&i+"-"+e.uuid||null)&&T[this.uuid][r]||null)?(s.removeEventListener(i,o,n),delete T[this.uuid][r]):s.removeEventListener(i,e,n);return this},emit:function(t,e){return B.call(this,t,e),this}},O}))}(this,document);
//# sourceMappingURL=element.js.map
