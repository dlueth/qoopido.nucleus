/*! /task 1.0.1 | http://nucleus.qoopido.com | (c) 2015 Dirk Lueth */
!function(){"use strict";function e(e,r,t,a,n){function s(){var e,t;!m.length||p&&!v.idle.length||(e=m.shift(),p?(t=v.idle.shift(),v.busy[e.uuid]=t,t.addEventListener("message",e.onMessage),t.addEventListener("error",e.onError),t.postMessage({load:e.load.toString(),parameter:e.parameter},r(e.parameter,ArrayBuffer)?[e.parameter]:null)):setTimeout(function(){try{e.deferred.resolve(e.load.apply(null,e.parameter))}catch(r){e.deferred.reject()}s()},4))}function i(e){var r=v.busy[e.uuid];delete v.busy[e.uuid],r.removeEventListener("message",e.onMessage),r.removeEventListener("error",e.onError),v.idle.push(r),s()}function u(r,t){var a=this,i=e.defer();return a.uuid=n(),a.deferred=i,a.load=r,a.parameter=t||[],m.push(a),s(),i.pledge}var d,o=a("Worker"),l=a("URL"),c=a("Blob"),p=o&&l&&c,f='function d(a){return a.replace(c,"").trim()}function e(a){return a}var a=this,b=/functions.*?(([^)]*))/,c=//*.**//;a.addEventListener("message",function(b){a.postMessage({type:"result",result:a.process(b.data.load).apply(null,b.data.parameter)})},!1),a.process=function(a){var c=a.match(b)[1].split(",").map(d).filter(e);return c.push(a.substring(a.indexOf("{")+1,a.lastIndexOf("}"))),Function.apply(null,c)};',v={idle:[],busy:{}},m=[],h=0;if(u.prototype={onMessage:function(e){var r=this;"result"===e.data.type&&(r.deferred.resolve(e.data.result),i(r))},onError:function(){var e=this;e.deferred.reject(),i(e)}},p)try{for(d=l.createObjectURL(new c([f],{type:"application/javascript"}));4>h;h++)v.idle[h]=new o(d)}catch(g){p=!1}return t.extend(u)}provide(["/demand/pledge","/demand/validator/isInstanceOf","./base","./support/method","./function/unique/uuid"],e)}();
//# sourceMappingURL=task.js.map
