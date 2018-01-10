!function(t,e){"use strict";provide(["/demand/validator/isObject","/demand/validator/isInstanceOf","/demand/validator/isTypeOf","/demand/function/uuid","/demand/function/iterate","/demand/descriptor","./event","../hooks/css","../support/method"],function(n,i,r,o,s,u,d,a,f){var h=e.body||e.getElementsByTagName("body")[0],l=Array.prototype.concat,c=Array.prototype.slice,p=Object.defineProperty,g=Object.defineProperties,v=e.getElementsByTagName("head")[0],m=null,y="string",b="textContent"in e.createElement("a")?"textContent":"innerText",S=f("matches",h)||f("matchesSelector",h),C=/^<(\w+)\s*\/>$/,A=/ +/g,T=/^\s*^/,E=r(v.previousElementSibling,"undefined")?function(){for(var t=this;t=t.previousSibling;)if(1===t.nodeType)return t}:function(){return this.previousElementSibling},N=r(v.nextElementSibling,"undefined")?function(){for(var t=this;t=t.nextSibling;)if(1===t.nodeType)return t}:function(){return this.nextElementSibling},w={};function B(n,i,r){var o;(o=e.createEvent("CustomEvent")).initCustomEvent(n,"load"!==n,!0,i),r&&(o.uuid=r,o.isDelegate=!0),this.node.dispatchEvent(o),this.node===t||o.defaultPrevented||"function"!=typeof this.node[n]||this.node[n]()}function L(t){if("string"==typeof t)try{t=C.test(t)?e.createElement(t.replace(C,"$1").toLowerCase()):e.querySelector(t)}catch(e){t=m}if(!t)throw new Error("Element could not be resolved");return t}function x(t){return l.apply([],c(t)).join(" ").split(A)}function H(t,e){for(var n,i=0;n=t.path[i];i++){if(n[S](e))return t.currentTarget=n,!0;if(n===t.currentTarget)break}return!1}function P(t,e,n,i,r){var o=!(i&&1===i),s=!!o&&[];for(r=!o&&r;t=e.call(t);)if(1===t.nodeType){if(!n||t[S](n)){if(!o)return t;s.push(t)}if(r)break}return s}function j(t,e,n,i){var r=!(n&&1===n),o=!!r&&[];for(i=!r&&i;t=t.parentNode;)if(1===t.nodeType){if(!e||t[S](e)){if(!r)return t;o.push(t)}if(i)break}return o}function O(e,i,r){var s;return(s=(e=L(e)).uuid)||(s=o(),w[s]={},p(e,"uuid",new u(s))),g(this,{uuid:new u(s),type:new u(e===t?"#window":e.nodeName),node:new u(e)}),n(i)&&this.setAttributes(i),n(r)&&this.setStyles(r),this}return O.prototype={clone:function(){return new O(this.node.cloneNode(!0))},getPosition:function(){var t=this.node.getBoundingClientRect();return{left:t.left+h.scrollLeft,top:t.top+h.scrollTop}},getOffset:function(t){var e=this.node,n=t?e.getBoundingClientRect():null;return{left:t?n.left:e.offsetLeft,top:t?n.top:e.offsetTop}},getWidth:function(t){var e,n=this.node,i=n.offsetWidth;return t&&(e=getComputedStyle(n),i+=parseInt(e.marginLeft)+parseInt(e.marginRight)),i},getHeight:function(t){var e,n=this.node,i=n.offsetHeight;return t&&(e=getComputedStyle(n),i+=parseInt(e.marginTop)+parseInt(e.marginBottom)),i},getContent:function(t){var e=this.node;return t?e.innerHTML:e[b]},getAttribute:function(t){if(r(t,y))return this.node.getAttribute(t)},getAttributes:function(){for(var t,e={},n=x(arguments),i=0;t=n[i];i++)e[t]=this.node.getAttribute(t);return e},getStyle:function(t){if(r(t,y))return a.process("get",this.node,t)},getStyles:function(){for(var t,e={},n=x(arguments),i=0;t=n[i];i++)e[t]=a.process("get",this.node,t);return e},getSiblingBefore:function(t,e){return P(this.node,E,t,1,e)},getSiblingAfter:function(t,e){return P(this.node,N,t,1,e)},getSiblings:function(t){return this.getSiblingsBefore(t).concat(this.getSiblingsAfter(t))},getSiblingsBefore:function(t){return P(this.node,E,t)},getSiblingsAfter:function(t){return P(this.node,N,t)},getChildren:function(t){var e,n,i,r,o=this.node;if(t)T.test(t)?(e=o.uuid,o.setAttribute("nucleus-uuid",e),t='[nucleus-uuid="'+e+'"] '+t,n=c.call(o.parentNode.querySelectorAll(t)),o.removeAttribute("nucleus-uuid")):n=c.call(o.querySelectorAll(t));else for(n=[],i=0;r=o.childNodes[i];i++)1===r.nodeType&&n.push(r);return n},getParent:function(t,e){return j(this.node,t,1,e)},getParents:function(t){return j(this.node,t)},hasChild:function(t){var e=this.node;return e!==t&&e.contains(t.node||t)},hasClass:function(t){return!!t&&new RegExp("(?:^|\\s)"+t+"(?:\\s|$)").test(this.node.className)},isVisible:function(){var t=this.node;return!(t.offsetWidth<=0&&t.offsetHeight<=0||"hidden"===this.getStyle("visibility")||this.getStyle("opacity")<=0)},setContent:function(t,e){var n=this.node;return e?n.innerHTML=t:n[b]=t,this},setAttribute:function(t,e){return r(t,y)&&this.node.setAttribute(t,e),this},setAttributes:function(t){var e=this;return s(t,function(t,n){e.setAttribute(t,n)}),e},removeAttribute:function(t){return r(t,y)&&this.node.removeAttribute(t),this},removeAttributes:function(){for(var t,e=x(arguments),n=0;t=e[n];n++)this.removeAttribute(t);return this},setStyle:function(t,e){return r(t,y)&&a.process("set",this.node,t,e),this},setStyles:function(t){var e=this;return s(t,function(t,n){a.process("set",e.node,t,n)}),e},removeStyle:function(t){return r(t,y)&&this.setStyle(t,""),this},removeStyles:function(){for(var t,e=x(arguments),n=0;t=e[n];n++)this.setStyle(t,"");return this},addClass:function(t){return t&&!this.hasClass(t)&&(this.node.className+=this.node.className?" "+t:t),this},removeClass:function(t){return t&&this.hasClass(t)&&(this.node.className=this.node.className.replace(new RegExp("(?:^|\\s)"+t+"(?!\\S)"),"").trim()),this},toggleClass:function(t){return t&&(this.hasClass(t)?this.removeClass(t):this.addClass(t)),this},prepend:function(t){var e=this.node;if(t)try{t=i(t,O)?t.node:L(t),e.firstChild?e.insertBefore(t,e.firstChild):this.append(t)}catch(n){e.insertAdjacentHTML("afterBegin",t)}return this},append:function(t){var e=this.node;if(t)try{e.appendChild(i(t,O)?t.node:L(t))}catch(n){e.insertAdjacentHTML("beforeEnd",t)}return this},prependTo:function(t){var e=this.node;return t&&((t=t.node||L(t)).firstChild?t.insertBefore(e,t.firstChild):this.appendTo(t)),this},appendTo:function(t){return t&&(t.node||L(t)).appendChild(this.node),this},insertBefore:function(t){var e=this.node;return t&&(t=t.node||L(t)).parentNode.insertBefore(e,t),this},insertAfter:function(t){var e=this.node;return t&&((t=t.node||L(t)).nextSibling?t.parentNode.insertBefore(e,t.nextSibling):this.appendTo(t.parentNode)),this},replace:function(t){var e=this.node;return t&&(t=t.node||L(t)).parentNode.replaceChild(e,t),this},replaceWith:function(t){var e=this.node;return t&&(t=i(t,O)?t.node:L(t),e.parentNode.replaceChild(t,e)),this},detach:function(){var t=this.node;return t.parentNode.removeChild(t),this},on:function(t){var e,n=this,i=arguments.length>2?arguments[1]:m,r=i?arguments[2]:arguments[1],s=r.uuid||(r.uuid=o()),u=0;for(t=t.split(A);e=t[u];u++){var a=e+"-"+s,f=function(t){var e;(t=new d(t)).isPropagationStopped||(e=t.delegate,t.uuid=o(),i&&!H(t,i)||r.call(t.currentTarget,t,t.originalEvent.detail),e&&(delete t.delegate,B.call(n,e)))};f.type=e,w[n.uuid][a]=f,n.node.addEventListener(e,f)}return n},one:function(t){var e=this,n=arguments.length>3||"string"==typeof arguments[1]?arguments[1]:m,i=arguments.length>3||"function"==typeof arguments[2]?arguments[2]:arguments[1],r=!1!==(arguments.length>3?arguments[3]:arguments[2]),s=function(n){e.off(!0===r?n.type:t,s),i.call(this,n,n.originalEvent.detail)};return i.uuid=s.uuid=o(),n?e.on(t,n,s):e.on(t,s),e},off:function(t,e){var n,i,r,o=this.node,s=0;for(t=t.split(" ");n=t[s];s++)(r=(i=e.uuid&&n+"-"+e.uuid||m)&&w[this.uuid][i]||m)?(o.removeEventListener(n,r),delete w[this.uuid][i]):o.removeEventListener(n,e);return this},emit:function(t,e){return B.call(this,t,e),this}},O})}(this,document);
//# sourceMappingURL=element.js.map
