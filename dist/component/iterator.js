/**! Qoopido.nucleus 3.2.3 | http://nucleus.qoopido.com | (c) 2020 Dirk Lueth */
!function(){"use strict";provide(["/demand/weakmap","../emitter","../function/merge"],(function(t,e,n){var i=new t;function s(t,e){var n;if((n=i.get(t))&&n.data)return n.data[e]}function r(t,s){var a=e.call(this);return i.set(a,{settings:n({},r.settings,s),index:null,data:null}),t&&a.setData(t),a}return r.prototype={get length(){return s(this,"length")||0},get index(){return function(t,e){var n;if(n=i.get(t))return n.index}(this)},get item(){return s(this,this.index)},setData:function(t){var e,n;return"object"==typeof t&&t.length&&(n=(e=i.get(this)).settings,e.data=t,null!==n.initial&&this.seek(n.initial)),this},seek:function(t){var e=i.get(this);return(t=parseInt(t,10))!==e.index&&"undefined"!=typeof e.data[t]&&(e.index=t),this},first:function(){return this.seek(0)},last:function(){return this.seek(this.length-1)},previous:function(){var t,e=i.get(this).settings;return t=!0===e.loop?(this.index-1)%this.length:this.index-1,t=!0===e.loop&&t<0?this.length+t:t,this.seek(t)},next:function(){var t;return t=!0===i.get(this).settings.loop?(this.index+1)%this.length:this.index+1,this.seek(t)}},r.settings={loop:!0,initial:0},r.extends(e)}))}();
//# sourceMappingURL=iterator.js.map
