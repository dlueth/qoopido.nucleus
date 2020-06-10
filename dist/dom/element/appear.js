/**! Qoopido.nucleus 3.2.5 | http://nucleus.qoopido.com | (c) 2020 Dirk Lueth */
!function(t,e,i){"use strict";if("CSS1Compat"!==e.compatMode)throw new Error("Browser needs to be in standards mode");provide(["/demand/weakmap","../element","../../function/merge","../../function/debounce"],(function(n,o,r,s){var a=e.documentElement,c=new o(t),d={},u=new n,h=[];function l(){d.left=0,d.top=0,d.right=t.innerWidth||a.clientWidth,d.bottom=t.innerHeight||a.clientHeight}function p(){var t=u.get(this),e=t.settings,i=t.boundaries,n=e.threshold,o=void 0!==n?n:a.clientWidth*e.auto,r=void 0!==n?n:a.clientHeight*e.auto;i.left=d.left-o,i.top=d.top-r,i.right=d.right+o,i.bottom=d.bottom+r}function g(t,e){var i=t.getBoundingClientRect();return!(i.right<=e.left||i.bottom<=e.top||i.left>=e.right||i.top>=e.bottom)}function f(){var t=this.node,e=u.get(this);return g(t,d)?2:g(t,e.boundaries)?1:0}function m(t,e){var i=o.call(this,t);return"auto"===(e=r({},m.settings,e)).threshold&&delete e.threshold,u.set(i,{settings:e,boundaries:{},state:-1}),c.on("resize orientationchange",s(p.bind(i))),p.call(i),h.push(i),i}return c.on("resize orientationchange",s(l)),l(),i((function(){for(var t,e,i,n,o=0;t=h[o];o++)if(!(i=(e=u.get(t)).settings).visibility||t.isVisible()){if((n=f.call(t))!==e.state){switch(n){case 0:t.emit("disappear",{priority:1});break;case 1:t.emit(e.state<=0?"appear":"disappear",{priority:2});break;case 2:t.emit("appear",{priority:1})}e.state=n}i.recur||2!==n||(h.splice(o,1),o--)}}),1e3/30),m.settings={threshold:"auto",recur:!0,auto:1,visibility:!0},m.extends(o)}))}(this,document,setInterval);
//# sourceMappingURL=appear.js.map
