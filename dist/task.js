/**! Qoopido.nucleus 3.2.15 | http://nucleus.qoopido.com | (c) 2021 Dirk Lueth */
!function(e){"use strict";provide(["/demand/abstract/uuid","/demand/pledge","/demand/validator/isInstanceOf","/demand/function/defer","./support/method"],(function(r,t,a,n,s){var d,i="ArrayBuffer"in e?i:null,o=s("Worker"),u=s("URL"),l=s("Blob"),c=o&&u&&l,p={idle:[],busy:{}},f=[],m=0;function h(){var e,r;!f.length||c&&!p.idle.length||(e=f.shift(),c?(r=p.idle.shift(),p.busy[e.uuid]=r,r.addEventListener("message",e.onMessage),r.addEventListener("error",e.onError),r.postMessage({load:e.load.toString(),parameter:e.parameter},i&&a(e.parameter,i)?[e.parameter]:null)):n((function(){try{e.deferred.resolve(e.load.apply(null,e.parameter))}catch(r){e.deferred.reject()}h()})))}function v(e){var r=p.busy[e.uuid];delete p.busy[e.uuid],r.removeEventListener("message",e.onMessage),r.removeEventListener("error",e.onError),p.idle.push(r),h()}function g(e,a){var n=r.call(this),s=t.defer();return n.deferred=s,n.load=e,n.parameter=a||[],f.push(n),h(),s.pledge}if(g.prototype={onMessage:function(e){"result"===e.data.type&&(this.deferred.resolve(e.data.result),v(this))},onError:function(){this.deferred.reject(),v(this)}},c)try{for(d=u.createObjectURL(new l(['function d(a){return a.replace(c,"").trim()}function e(a){return a}var a=this,b=/functions.*?(([^)]*))/,c=//*.**//;a.addEventListener("message",function(b){a.postMessage({type:"result",result:a.process(b.data.load).apply(null,b.data.parameter)})},!1),a.process=function(a){var c=a.match(b)[1].split(",").map(d).filter(e);return c.push(a.substring(a.indexOf("{")+1,a.lastIndexOf("}"))),Function.apply(null,c)};'],{type:"application/javascript"}));m<4;m++)p.idle[m]=new o(d)}catch(e){c=!1}return g.extends(r)}))}(this);
//# sourceMappingURL=task.js.map
