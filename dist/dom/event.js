/**! Qoopido.nucleus 3.2.3 | http://nucleus.qoopido.com | (c) 2020 Dirk Lueth */
!function(){"use strict";provide(["../hooks/event"],(function(t){function e(e){return t.process(this,e),this}return e.prototype={originalEvent:null,isDelegate:!1,isDefaultPrevented:!1,isPropagationStopped:!1,isImmediatePropagationStopped:!1,preventDefault:function(){var t=this.originalEvent;!1===this.cancelable||this.passive||(this.isDefaultPrevented=!0,t.preventDefault?t.preventDefault():t.returnValue=!1)},stopPropagation:function(){var t=this.originalEvent;this.isPropagationStopped=!0,t.stopPropagation&&t.stopPropagation(),t.cancelBubble=!0},stopImmediatePropagation:function(){var t=this.originalEvent;this.isImmediatePropagationStopped=!0,t.stopImmediatePropagation&&t.stopImmediatePropagation(),this.stopPropagation()}},e}))}();
//# sourceMappingURL=event.js.map
