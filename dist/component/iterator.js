/**! Qoopido.nucleus 3.2.14 | http://nucleus.qoopido.com | (c) 2021 Dirk Lueth */
!function(){"use strict";provide(["/demand/weakmap","../emitter","../function/merge"],(function(t,e,n){var i=new t;function r(t,e){var n;if((n=i.get(t))&&n.data)return n.data[e]}function s(t,r){var a=e.call(this);return i.set(a,{settings:n({},s.settings,r),index:null,data:null}),t&&a.setData(t),a}return s.prototype={get length(){return r(this,"length")||0},get index(){return function(t,e){var n;if(n=i.get(t))return n.index}(this)},get item(){return r(this,this.index)},setData:function(t){var e,n,r=this;return"object"==typeof t&&t.length&&(n=(e=i.get(r)).settings,e.data=t,null!==n.initial&&r.seek(n.initial)),r},seek:function(t){var e=i.get(this);return(t=parseInt(t,10))!==e.index&&"undefined"!=typeof e.data[t]&&(e.index=t),this},first:function(){return this.seek(0)},last:function(){return this.seek(this.length-1)},previous:function(){var t,e=this,n=i.get(e).settings;return t=!0===n.loop?(e.index-1)%e.length:e.index-1,t=!0===n.loop&&t<0?e.length+t:t,e.seek(t)},next:function(){var t,e=this;return t=!0===i.get(e).settings.loop?(e.index+1)%e.length:e.index+1,e.seek(t)}},s.settings={loop:!0,initial:0},s.extends(e)}))}();
//# sourceMappingURL=iterator.js.map
