!function(a,c,e){"use strict";provide(["/demand/function/iterate"],function(e){var n=null,o={general:{properties:"type altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which path".split(" "),process:function(e,t){var r;if(e.originalEvent=t,e.isDefaultPrevented=!!t.defaultPrevented,e.isPropagationStopped=!!t.cancelBubble,e.metaKey=!(!t.metaKey||!1===t.metaKey),e.target||(e.target=t.srcElement||c),3===e.target.nodeType&&(e.target=e.target.parentNode),!e.path){for(e.path=[],r=e.target;e.path.push(r),r=r.parentNode;);e.path.push(a)}}},mouse:{match:/^(?:mouse|pointer|contextmenu|touch|click|dblclick|drag|drop|wheel)/,properties:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement dataTransfer deltaX deltaY deltaZ deltaMode targetTouches".split(" "),process:function(e,t){var r,a,o;a=t.fromElement,o=t.button,e.pageX===n&&t.clientX!==n&&(r=(r=e.target.ownerDocument||c).documentElement||r.body,e.pageX=t.clientX+(r.scrollLeft||0)-(r.clientLeft||0),e.pageY=t.clientY+(r.scrollTop||0)-(r.clientTop||0)),!e.relatedTarget&&a&&(e.relatedTarget=a===e.target?t.toElement:a),e.which||void 0===o||(e.which=1&o?1:2&o?3:4&o?2:0)}},passive:{match:/^(?:touch|wheel)/,properties:"passive".split(" ")},key:{match:/^(?:key)/,properties:"char charCode key keyCode".split(" "),process:function(e,t){e.which===n&&(e.which=t.charCode!==n?t.charCode:t.keyCode)}}};return{add:function(e,t){e&&t&&o[e]&&(o[e]=t)},get:function(e){if(e&&o[e])return o[e]},process:function(r,a){e(o,function(e,t){(!t.match||t.match.test(a.type))&&(t.properties&&function(e,t,r){for(var a,o=0;a=r[o];o++)e[a]=t[a]}(r,a,t.properties),t.process&&t.process(r,a),t.delegate&&(r.delegate=t.delegate))})}}})}(this,document);
//# sourceMappingURL=event.js.map
