!function(t){"use strict";provide(["/demand/abstract/uuid","/demand/function/iterate"],function(r,e){var n=/^(_|((get|has|is)([A-Z]|$))|(on|one|off|emit|constructor)$)/,o=Object.defineProperty,i=Object.getOwnPropertyNames,u=Object.getOwnPropertyDescriptor,c=Object.getPrototypeOf,f=Object.prototype,s={};function p(){var t=this,r=t.constructor.prototype;(function(t){var r,e,n,o=t,u=[];try{for(;o!==f;){for(r=i(o),e=0;n=r[e];e++)-1===u.indexOf(n)&&u.push(n);o=o.__proto__}}catch(t){}return u})(r).forEach(function(e){var i,c=function(t,r){for(var e,n=t;n&&!(e=u(n,r));)n=n.__proto__;return e}(r,e);"function"==typeof t[e]&&!1===n.test(e)&&(i=e.charAt(0).toUpperCase()+e.slice(1),c.value=function(){var n;return t.emit("pre"+i,arguments),n=r[e].apply(t,arguments),t.emit("post"+i,arguments,n),n},o(t,e,c))})}function a(){var t=r.call(this);return s[t.uuid]={},c(t)!==a.prototype&&p.call(t),t}return a.prototype={on:function(r,e){var n,o=s[this.uuid],i=0;for(r=r.split(" ");(n=r[i])!==t;i++)(o[n]=o[n]||[]).push(e);return this},one:function(t,r,e){var n=this;return e=!1!==e,n.on(t,function o(i){n.off(!0===e?i:t,o),r.apply(this,arguments)}),n},off:function(r,n){var o,i,u,c=s[this.uuid],f=0;if(r)for(r=r.split(" ");(o=r[f])!==t;f++)if(c[o]=c[o]||[],n)for(i=0;(u=c[o][i])!==t;i++)u===n&&(c[o].splice(i,1),i--);else c[o].length=0;else e(this.listener,function(t){c[t].length=0});return this},emit:function(r){var e,n,o,i=0;if(r)for((e=s[this.uuid])[r]=e[r]||[],n=e[r].slice();(o=n[i])!==t;i++)o.apply(this,arguments);return this}},a.extends(r)})}();
//# sourceMappingURL=emitter.js.map
