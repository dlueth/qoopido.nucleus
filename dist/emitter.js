!function(h){"use strict";provide(["/demand/weakmap","/demand/function/iterate"],function(t,s){var i=/^(_|((get|has|is)([A-Z]|$))|(on|one|off|emit|constructor)$)/,f=Object.defineProperty,c=Object.getOwnPropertyNames,p=Object.getOwnPropertyDescriptor,e=Object.getPrototypeOf,u=Object.prototype,r=new t;function a(t){return r.get(t)||r.set(t,{})&&r.get(t)}function n(){var n=this,o=n.constructor.prototype;(function(t){var e,r,n,o=t,i=[];try{for(;o!==u;){for(e=c(o),r=0;n=e[r];r++)-1===i.indexOf(n)&&i.push(n);o=o.__proto__}}catch(t){}return i})(o).forEach(function(e){var r,t=function(t,e){for(var r,n=t;n&&!(r=p(n,e));)n=n.__proto__;return r}(o,e);t.get||"function"!=typeof n[e]||!1!==i.test(e)||(r=e.charAt(0).toUpperCase()+e.slice(1),t.value=function(){var t;return n.emit("pre"+r,arguments),t=o[e].apply(n,arguments),n.emit("post"+r,arguments,t),t},f(n,e,t))})}function o(){return e(self)!==o.prototype&&n.call(this),this}return o.prototype={on:function(t,e){var r,n=a(this),o=0;for(t=t.split(" ");(r=t[o])!==h;o++)(n[r]=n[r]||[]).push(e);return this},one:function(r,n,o){var i=this;return o=!1!==o,i.on(r,function t(e){i.off(!0===o?e:r,t),n.apply(this,arguments)}),i},off:function(t,e){var r,n,o,i=this,f=a(i),c=0;if(t)for(t=t.split(" ");(r=t[c])!==h;c++)if(f[r]=f[r]||[],e)for(n=0;(o=f[r][n])!==h;n++)o===e&&(f[r].splice(n,1),n--);else f[r].length=0;else s(i.listener,function(t){f[t].length=0});return i},emit:function(t){var e,r,n,o=0;if(t)for((e=a(this))[t]=e[t]||[],r=e[t].slice();(n=r[o])!==h;o++)n.apply(this,arguments);return this}},o})}();
//# sourceMappingURL=emitter.js.map
