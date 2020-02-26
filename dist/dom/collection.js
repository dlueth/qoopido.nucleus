/**! Qoopido.nucleus 3.1.8 | http://nucleus.qoopido.com | (c) 2020 Dirk Lueth */
!function(t){"use strict";provide(["/demand/validator/isTypeOf","/demand/validator/isInstanceOf","/demand/descriptor","./element"],(function(e,n,r,i){var s=Array.prototype.slice,l=Object.defineProperty;function o(n){var r,i,l=0;if(e(n,"string"))for(r=n.split(","),n=[],l=0;i=r[l];l++)try{n=n.concat(s.call(t.querySelectorAll(i)))}catch(t){}return n.length&&!Array.isArray(n)&&(n=s.call(n)),Array.isArray(n)||(n=[n]),n}function c(t){for(var e,n=this,r=n.elements,i=s.call(arguments,1),l=0;e=r[l];l++)e[t].apply(e,i);return n}function u(t,e){return(t=n(t,i)?t:new i(t))&&t[e].call(t,a(this.elements)),this}function a(e){for(var n,r=t.createDocumentFragment(),i=0;n=e[i];i++)r.appendChild(n.node);return r}function f(t){return l(this,"elements",new r([])),l(this,"nodes",new r([])),t&&this.add(t),this}return f.prototype={get length(){return this.elements.length},get:function(t){return this.elements[t]},add:function(t){var e,r=0;for(t=o(t);e=t[r];r++)-1===this.nodes.indexOf(e.node||e)&&(e=n(e,i)?e:new i(e),this.elements.push(e),this.nodes.push(e.node));return this},remove:function(t){var e,n,r=0;for(t=o(t);e=t[r];r++)-1!==(n=this.nodes.indexOf(e.node||e))&&(this.elements.splice(n,1),this.nodes.splice(n,1));return this},each:function(t){for(var e,n=this.elements,r=0;e=n[r];r++)t.call(e,r);return this},setAttribute:function(t,e){return c.call(this,"setAttribute",t,e)},setAttributes:function(t){return c.call(this,"setAttributes",t)},removeAttribute:function(t){return c.call(this,"removeAttribute",t)},removeAttributes:function(t){return c.call(this,"removeAttributes",t)},setStyle:function(t,e){return c.call(this,"setStyle",t,e)},setStyles:function(t){return c.call(this,"setStyles",t)},removeStyle:function(t){return c.call(this,"removeStyle",t)},removeStyles:function(t){return c.call(this,"removeStyles",t)},addClass:function(t){return c.call(this,"addClass",t)},removeClass:function(t){return c.call(this,"removeClass",t)},toggleClass:function(t){return c.call(this,"toggleClass",t)},prependTo:function(t){return u.call(this,t,"prepend")},appendTo:function(t){return u.call(this,t,"append")},insertBefore:function(t){return(t=n(t,i)?t:new i(t))&&(t=t.node)&&t.parentNode.insertBefore(a(this.elements),t),this},insertAfter:function(t){var e,r;return(t=n(t,i)?t:new i(t))&&(t=t.node)&&(r=a(this.elements),(e=t.nextSibling)?t.parentNode.insertBefore(r,e):t.parentNode.appendChild(r)),this},replace:function(t){for(var e,n=this.elements,r=0;e=n[r];r++)0===r?e.replace(t):e.insertAfter(n[r-1]);return this},detach:function(){for(var t,e=this.elements,n=0;t=e[n];n++)t.detach();return this},blur:function(){return c.call(this,"blur")},on:function(){return c.apply(this,["on"].concat(s.call(arguments)))},one:function(){return c.apply(this,["one"].concat(s.call(arguments)))},off:function(){return c.apply(this,["off"].concat(s.call(arguments)))},emit:function(){return c.apply(this,["emit"].concat(s.call(arguments)))}},f}))}(document);
//# sourceMappingURL=collection.js.map
