/**! Qoopido.nucleus 3.2.10 | http://nucleus.qoopido.com | (c) 2020 Dirk Lueth */
!function(){"use strict";provide(["/demand/weakmap","/demand/function/iterate"],(function(t,e){var r=/^(_|((get|has|is)([A-Z]|$))|(on|one|off|emit|constructor)$)/,o=Object.defineProperty,n=Object.getOwnPropertyNames,i=Object.getOwnPropertyDescriptor,f=Object.getPrototypeOf,c=Object.prototype,p=new t;function u(t){return p.get(t)||p.set(t,{})&&p.get(t)}function s(){var t=this,e=t.constructor.prototype;(function(t){var e,r,o,i=t,f=[];try{for(;i!==c;){for(e=n(i),r=0;o=e[r];r++)-1===f.indexOf(o)&&f.push(o);i=i.__proto__}}catch(t){}return f})(e).forEach((function(n){var f,c=function(t,e){for(var r,o=t;o&&!(r=i(o,e));)o=o.__proto__;return r}(e,n);c.get||"function"!=typeof t[n]||!1!==r.test(n)||(f=n.charAt(0).toUpperCase()+n.slice(1),c.value=function(){var r;return t.emit("pre"+f,arguments),r=e[n].apply(t,arguments),t.emit("post"+f,arguments,r),r},o(t,n,c))}))}function a(){return f(self)!==a.prototype&&s.call(this),this}return a.prototype={on:function(t,e){var r,o=u(this),n=0;for(t=t.split(" ");void 0!==(r=t[n]);n++)(o[r]=o[r]||[]).push(e);return this},one:function(t,e,r){var o=this;return r=!1!==r,o.on(t,(function n(i){o.off(!0===r?i:t,n),e.apply(this,arguments)})),o},off:function(t,r){var o,n,i,f=this,c=u(f),p=0;if(t)for(t=t.split(" ");void 0!==(o=t[p]);p++)if(c[o]=c[o]||[],r)for(n=0;void 0!==(i=c[o][n]);n++)i===r&&(c[o].splice(n,1),n--);else c[o].length=0;else e(f.listener,(function(t){c[t].length=0}));return f},emit:function(t){var e,r,o,n=this,i=0;if(t)for((e=u(n))[t]=e[t]||[],r=e[t].slice();void 0!==(o=r[i]);i++)o.apply(n,arguments);return n}},a}))}();
//# sourceMappingURL=emitter.js.map
