/**! Qoopido.nucleus 3.2.8 | http://nucleus.qoopido.com | (c) 2020 Dirk Lueth */
!function(t,e,i){"use strict";if("CSS1Compat"!==e.compatMode)throw new Error("Browser needs to be in standards mode");provide(["/demand/weakmap","../element","../../function/merge","../../function/debounce"],(function(n,o,r,s){var a=e.documentElement,c=new o(t),u={},d=new n,h=[],l="resize orientationchange",g="appear",f="disappear";function m(){u.left=0,u.top=0,u.right=t.innerWidth||a.clientWidth,u.bottom=t.innerHeight||a.clientHeight}function p(){var t=d.get(this),e=t.settings,i=t.boundaries,n=e.threshold,o=void 0!==n?n:a.clientWidth*e.auto,r=void 0!==n?n:a.clientHeight*e.auto;i.left=u.left-o,i.top=u.top-r,i.right=u.right+o,i.bottom=u.bottom+r}function b(t,e){var i=t.getBoundingClientRect();return!(i.right<=e.left||i.bottom<=e.top||i.left>=e.right||i.top>=e.bottom)}function v(){var t=this.node,e=d.get(this);return b(t,u)?2:b(t,e.boundaries)?1:0}function w(t,e){var i=o.call(this,t);return"auto"===(e=r({},w.settings,e)).threshold&&delete e.threshold,d.set(i,{settings:e,boundaries:{},state:-1}),c.on(l,s(p.bind(i))),p.call(i),h.push(i),i}return c.on(l,s(m)),m(),i((function(){for(var t,e,i,n,o=0;t=h[o];o++)if(!(i=(e=d.get(t)).settings).visibility||t.isVisible()){if((n=v.call(t))!==e.state){switch(n){case 0:t.emit(f,{priority:1});break;case 1:t.emit(e.state<=0?g:f,{priority:2});break;case 2:t.emit(g,{priority:1})}e.state=n}i.recur||2!==n||(h.splice(o,1),o--)}}),1e3/30),w.settings={threshold:"auto",recur:!0,auto:1,visibility:!0},w.extends(o)}))}(this,document,setInterval);
//# sourceMappingURL=appear.js.map
