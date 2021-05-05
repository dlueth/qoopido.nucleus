/**! Qoopido.nucleus 3.2.14 | http://nucleus.qoopido.com | (c) 2021 Dirk Lueth */
!function(e,t){"use strict";provide(["/demand/validator/isObject","/demand/validator/isInstanceOf","/demand/validator/isTypeOf","/demand/function/uuid","/demand/function/iterate","./event","../hooks/css","../support/method"],(function(n,r,i,o,s,u,a,d){var f=t.body||t.getElementsByTagName("body")[0],c=Array.prototype.concat,l=Array.prototype.slice,h=Object.defineProperty,p=Object.defineProperties,g=t.getElementsByTagName("head")[0],v=null,m="undefined",y="string",b="textContent"in t.createElement("a")?"textContent":"innerText",S=d("matches",f)||d("matchesSelector",f),C=/^<(\w+)\s*\/>$/,A=/ +/g,E=/^\s*^/,T=i(g.previousElementSibling,m)?function(){for(var e=this;e=e.previousSibling;)if(1===e.nodeType)return e}:function(){return this.previousElementSibling},N=i(g.nextElementSibling,m)?function(){for(var e=this;e=e.nextSibling;)if(1===e.nodeType)return e}:function(){return this.nextElementSibling},B={},L=!1;function w(e){return L||"boolean"==typeof e?e:e&&e.capture}function x(e,n){var r;(r=t.createEvent("CustomEvent")).initCustomEvent(e,"load"!==e&&"resize"!==e,"load"!==e&&"resize"!==e,n),this.node.dispatchEvent(r)}function j(e){if("string"==typeof e)try{e=C.test(e)?t.createElement(e.replace(C,"$1").toLowerCase()):t.querySelector(e)}catch(t){e=v}if(!e)throw new Error("Element could not be resolved");return e}function H(e){return c.apply([],l.call(e)).join(" ").split(A)}function O(e,t){for(var n,r=0;n=e.path[r];r++){if(n[S]&&n[S](t))return e.isDelegate=!0,e.currentTarget=n,!0;if(n===e.currentTarget)break}return!1}function P(e,t,n,r,i){var o=!(r&&1===r),s=!!o&&[];for(i=!o&&i;e=t.call(e);)if(1===e.nodeType){if(!n||e[S](n)){if(!o)return e;s.push(e)}if(i)break}return s}function I(e,t,n,r){var i=!(n&&1===n),o=!!i&&[];for(r=!i&&r;e=e.parentNode;)if(1===e.nodeType){if(!t||e[S](t)){if(!i)return e;o.push(e)}if(r)break}return o}function R(t,r,i){var s,u=this;return(s=(t=j(t)).uuid)||(s=o(),B[s]={},h(t,"uuid",{value:s})),p(u,{uuid:{value:s},type:{value:t===e?"#window":t.nodeName},node:{value:t}}),n(r)&&u.setAttributes(r),n(i)&&u.setStyles(i),u}return function(){var t,n=function(){},r=""+ +new Date;try{t=Object.defineProperty({},"passive",{get:function(){L=!0}}),e.addEventListener(r,n,t),e.removeEventListener(r,n,t)}catch(e){}}(),R.prototype={clone:function(){return new R(this.node.cloneNode(!0))},focus:function(){return this.node.focus(),this},blur:function(){return this.node.blur(),this},getPosition:function(){var e=this.node.getBoundingClientRect();return{left:e.left+f.scrollLeft,top:e.top+f.scrollTop}},getOffset:function(e){var t=this.node,n=e?t.getBoundingClientRect():null;return{left:e?n.left:t.offsetLeft,top:e?n.top:t.offsetTop}},getWidth:function(e){var t,n=this.node,r=n.offsetWidth;return e&&(t=getComputedStyle(n),r+=parseInt(t.marginLeft)+parseInt(t.marginRight)),r},getHeight:function(e){var t,n=this.node,r=n.offsetHeight;return e&&(t=getComputedStyle(n),r+=parseInt(t.marginTop)+parseInt(t.marginBottom)),r},getContent:function(e){var t=this.node;return e?t.innerHTML:t[b]},getAttribute:function(e){if(i(e,y))return this.node.getAttribute(e)},getAttributes:function(){for(var e,t=this,n={},r=H(arguments),i=0;e=r[i];i++)n[e]=t.node.getAttribute(e);return n},getStyle:function(e){if(i(e,y))return a.process("get",this.node,e)},getStyles:function(){for(var e,t=this,n={},r=H(arguments),i=0;e=r[i];i++)n[e]=a.process("get",t.node,e);return n},getSiblingBefore:function(e,t){return P(this.node,T,e,1,t)},getSiblingAfter:function(e,t){return P(this.node,N,e,1,t)},getSiblings:function(e){return this.getSiblingsBefore(e).concat(this.getSiblingsAfter(e))},getSiblingsBefore:function(e){return P(this.node,T,e)},getSiblingsAfter:function(e){return P(this.node,N,e)},getChildren:function(e){var t,n,r,i,o=this.node;if(e)E.test(e)?(t=o.uuid,o.setAttribute("nucleus-uuid",t),e='[nucleus-uuid="'+t+'"] '+e,n=l.call(o.parentNode.querySelectorAll(e)),o.removeAttribute("nucleus-uuid")):n=l.call(o.querySelectorAll(e));else for(n=[],r=0;i=o.childNodes[r];r++)1===i.nodeType&&n.push(i);return n},getParent:function(e,t){return I(this.node,e,1,t)},getParents:function(e){return I(this.node,e)},hasChild:function(e){var t=this.node;return t!==e&&t.contains(e.node||e)},hasClass:function(e){return!!e&&new RegExp("(?:^|\\s)"+e+"(?:\\s|$)").test(this.node.className)},isVisible:function(){var e=this,t=e.node;return!(t.offsetWidth<=0&&t.offsetHeight<=0||"hidden"===e.getStyle("visibility")||e.getStyle("opacity")<=0)},setContent:function(e,t){var n=this.node;return t?n.innerHTML=e:n[b]=e,this},setAttribute:function(e,t){return i(e,y)&&this.node.setAttribute(e,t),this},setAttributes:function(e){var t=this;return s(e,(function(e,n){t.setAttribute(e,n)})),t},removeAttribute:function(e){return i(e,y)&&this.node.removeAttribute(e),this},removeAttributes:function(){for(var e,t=this,n=H(arguments),r=0;e=n[r];r++)t.removeAttribute(e);return t},setStyle:function(e,t){return i(e,y)&&a.process("set",this.node,e,t),this},setStyles:function(e){var t=this;return s(e,(function(e,n){a.process("set",t.node,e,n)})),t},removeStyle:function(e){return i(e,y)&&this.setStyle(e,""),this},removeStyles:function(){for(var e,t=this,n=H(arguments),r=0;e=n[r];r++)t.setStyle(e,"");return t},addClass:function(e){var t=this;return e&&!t.hasClass(e)&&(t.node.className+=t.node.className?" "+e:e),t},removeClass:function(e){var t=this;return e&&t.hasClass(e)&&(t.node.className=t.node.className.replace(new RegExp("(?:^|\\s)"+e+"(?!\\S)"),"").trim()),t},toggleClass:function(e){var t=this;return e&&(t.hasClass(e)?t.removeClass(e):t.addClass(e)),t},prepend:function(e){var t=this,n=t.node;if(e)try{e=r(e,R)?e.node:j(e),n.firstChild?n.insertBefore(e,n.firstChild):t.append(e)}catch(t){n.insertAdjacentHTML("afterBegin",e)}return t},append:function(e){var t=this.node;if(e)try{t.appendChild(r(e,R)?e.node:j(e))}catch(n){t.insertAdjacentHTML("beforeEnd",e)}return this},prependTo:function(e){var t=this,n=t.node;return e&&((e=e.node||j(e)).firstChild?e.insertBefore(n,e.firstChild):t.appendTo(e)),t},appendTo:function(e){return e&&(e.node||j(e)).appendChild(this.node),this},insertBefore:function(e){var t=this.node;return e&&(e=e.node||j(e)).parentNode.insertBefore(t,e),this},insertAfter:function(e){var t=this,n=t.node;return e&&((e=e.node||j(e)).nextSibling?e.parentNode.insertBefore(n,e.nextSibling):t.appendTo(e.parentNode)),t},replace:function(e){var t=this.node;return e&&(e=e.node||j(e)).parentNode.replaceChild(t,e),this},replaceWith:function(e){var t=this.node;return e&&(e=r(e,R)?e.node:j(e),t.parentNode.replaceChild(e,t)),this},detach:function(){var e=this.node;return e.parentNode&&e.parentNode.removeChild(e),this},on:function(e){var t,n=this,r=4===arguments.length||"string"==typeof arguments[1]?arguments[1]:v,i=4===arguments.length||"function"==typeof arguments[2]?arguments[2]:arguments[1],s=w(arguments.length>3?arguments[3]:arguments[2]),a=i.uuid||(i.uuid=o()),d=0;for(e=e.split(A);t=e[d];d++){var f=t+"-"+a,c=function(e){(e=new u(e)).isPropagationStopped||(e.uuid=o(),r&&!O(e,r)||i.call(e.currentTarget,e,e.originalEvent.detail))};c.type=t,B[n.uuid][f]=c,n.node.addEventListener(t,c,s)}return n},one:function(e){var t=this,n=5===arguments.length||"string"==typeof arguments[1]?arguments[1]:v,r=5===arguments.length||"function"==typeof arguments[2]?arguments[2]:arguments[1],i=w(arguments.length>3?arguments[3]:arguments[2]),s=!1!==(arguments.length>4?arguments[4]:arguments[3]),u=function(n){t.off(!0===s?n.type:e,u,i),r.call(this,n,n.originalEvent.detail)};return r.uuid=u.uuid=o(),n?t.on(e,n,u,i):t.on(e,u,i),t},off:function(e,t,n){var r,i,o,s=this,u=s.node,a=0;for(n=w(n),e=e.split(" ");r=e[a];a++)(o=(i=t.uuid&&r+"-"+t.uuid||v)&&B[s.uuid][i]||v)?(u.removeEventListener(r,o,n),delete B[s.uuid][i]):u.removeEventListener(r,t,n);return s},emit:function(e,t){return x.call(this,e,t),this}},R}))}(this,document);
//# sourceMappingURL=element.js.map
