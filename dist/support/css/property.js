!function(n,r){"use strict";provide(["../../function/property/unify","../../function/string/ucfirst","../prefix"],function(t,e,i){var u=i(),o=n.createElement("div").style,f=/([A-Z])/g,c={};return function(n){n=t(n);var i=c[n]||null;if(null===i){i=!1;for(var l,a=0,s=e(n),p=(n+" "+s+" "+u.join(s+" ")+s).split(" "),v="";(l=p[a])!==r;a++)if(o[l]!==r){i=l,a>0&&(v="-");break}c[n]=i=!!i&&[v+i.replace(f,"-$1").toLowerCase(),i]}return i}})}(document);
//# sourceMappingURL=property.js.map
