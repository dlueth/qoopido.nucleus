/**! Qoopido.nucleus 3.2.6 | http://nucleus.qoopido.com | (c) 2020 Dirk Lueth */
!function(e,t){"use strict";provide(["/demand/function/iterate"],(function(a){var r={general:{properties:"type altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which path".split(" "),process:function(a,r){var n;if(a.originalEvent=r,a.isDefaultPrevented=!!r.defaultPrevented,a.isPropagationStopped=!!r.cancelBubble,a.metaKey=!(!r.metaKey||!1===r.metaKey),a.target||(a.target=r.srcElement||t),3===a.target.nodeType&&(a.target=a.target.parentNode),!a.path){a.path=[],n=a.target;do{a.path.push(n)}while(n=n.parentNode);a.path.push(e)}}},mouse:{match:/^(?:mouse|pointer|contextmenu|touch|click|dblclick|drag|drop|wheel)/,properties:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement dataTransfer deltaX deltaY deltaZ deltaMode targetTouches".split(" "),process:function(e,a){var r,n,o;n=a.fromElement,o=a.button,null===e.pageX&&null!==a.clientX&&(r=(r=e.target.ownerDocument||t).documentElement||r.body,e.pageX=a.clientX+(r.scrollLeft||0)-(r.clientLeft||0),e.pageY=a.clientY+(r.scrollTop||0)-(r.clientTop||0)),!e.relatedTarget&&n&&(e.relatedTarget=n===e.target?a.toElement:n),e.which||void 0===o||(e.which=1&o?1:2&o?3:4&o?2:0)}},passive:{match:/^(?:touch|wheel)/,properties:"passive".split(" ")},key:{match:/^(?:key)/,properties:"char charCode key keyCode".split(" "),process:function(e,t){null===e.which&&(e.which=null!==t.charCode?t.charCode:t.keyCode)}}};return{add:function(e,t){e&&t&&r[e]&&(r[e]=t)},get:function(e){if(e&&r[e])return r[e]},process:function(e,t){a(r,(function(a,r){(!r.match||r.match.test(t.type))&&(r.properties&&function(e,t,a){for(var r,n=0;r=a[n];n++)e[r]=t[r]}(e,t,r.properties),r.process&&r.process(e,t),r.delegate&&(e.delegate=r.delegate))}))}}}))}(this,document);
//# sourceMappingURL=event.js.map
