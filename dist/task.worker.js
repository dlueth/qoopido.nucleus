/*! /task.worker 1.0.8 | http://nucleus.qoopido.com | (c) 2016 Dirk Lueth */
function d(t){return t.replace(c,"").trim()}function e(t){return t}!function(){function t(t){return t.replace(r,"").trim()}function e(t){return t}var n=this,a=/function\s.*?\(([^)]*)\)/,r=/\/\*.*\*\//;n.addEventListener("message",function(t){n.postMessage({type:"result",result:n.process(t.data.load).apply(null,t.data.parameter)})},!1),n.process=function(n){var r=n.match(a)[1].split(",").map(t).filter(e);return r.push(n.substring(n.indexOf("{")+1,n.lastIndexOf("}"))),Function.apply(null,r)}}();var a=this,b=/function\s.*?\(([^)]*)\)/,c=/\/\*.*\*\//;a.addEventListener("message",function(t){a.postMessage({type:"result",result:a.process(t.data.load).apply(null,t.data.parameter)})},!1),a.process=function(t){var n=t.match(b)[1].split(",").map(d).filter(e);return n.push(t.substring(t.indexOf("{")+1,t.lastIndexOf("}"))),Function.apply(null,n)};
//# sourceMappingURL=task.worker.js.map
