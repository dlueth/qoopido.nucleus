/**! Qoopido.nucleus 3.2.10 | http://nucleus.qoopido.com | (c) 2020 Dirk Lueth */
!function(t){"use strict";var e=/\s*!important$/;provide(["../support/css/property"],(function(r){var n={general:{get:function(e,r){return t(e,null).getPropertyValue(r[0])},set:function(t,r,n){n.replace?t.style.setProperty(r[0],n.replace(e,"")||n,e.test(n)?"important":""):t.style[r[1]]=n}}};function o(t){if(t&&n[t])return n[t]}return{add:function(t,e){t&&e&&n[t]&&(n[t]=e)},get:o,process:function(t,e,n,u){var i;if(n=r(n,e))return((i=o(n[1]))&&i[t]||o("general")[t])(e,n,u)}}}))}(getComputedStyle);
//# sourceMappingURL=css.js.map
