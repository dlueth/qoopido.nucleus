/**! Qoopido.nucleus 3.2.1 | http://nucleus.qoopido.com | (c) 2020 Dirk Lueth */
!function(){"use strict";provide(["/demand/weakmap","../element"],(function(e,n){var t=new e,i=!(document.documentMode<11)&&"pointerEvents"in document.createElement("iframe").style,o={pointerEvents:"none",userSelect:"none",userDrag:"none",zIndex:"-1",display:"block",opacity:0,position:"absolute",left:0,top:"-100%",width:"100%",height:"100%",margin:"1px 0 0",padding:0,border:"none"};return i||(o.visibility="hidden"),function(e){var i,r,a=t.get(e);if(a)return a;i=(a=t.set(e,n.call(this,e)).get(e)).getStyle("position"),r=new n("<iframe />",{draggable:"false"},o),"static"!==i&&""!==i||a.setStyle("position","relative"),r.one("load",(function(){r.node.contentWindow.onresize=function(){a.emit("resize")}})).appendTo(a)}.extends(n)}))}();
//# sourceMappingURL=resize.js.map
