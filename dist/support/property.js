/**! Qoopido.nucleus 3.2.0 | http://nucleus.qoopido.com | (c) 2020 Dirk Lueth */
!function(n){"use strict";provide(["/demand/validator/isObject","../function/property/unify","../function/string/ucfirst","./prefix"],(function(i,r,t,u){var o=u(),e={};return function(u){var f,l,c,a,s,d=i(arguments[1])?arguments[1]:null,p=!!arguments[d?2:1],v=null,b=0;if(d=d||n,u=r(u),(l=d===n?"#window":d.nodeName)&&(v=(f=e[l]=e[l]||{})[u]=e[l][u]||null),null===v){for(v=!1,s=t(u),c=o?(u+" "+s+" "+o.join(s+" ")+s).split(" "):[u];a=c[b];b++)if(a in d){v=a;break}f&&(f[u]=v)}return v&&p?d[v]:v}}))}(this);
//# sourceMappingURL=property.js.map
