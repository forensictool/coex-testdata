try{
'use strict';var h=this,k=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b},aa=function(a,b,c){return a.call.apply(a.bind,arguments)},ba=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}},l=function(a,b,c){l=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?
aa:ba;return l.apply(null,arguments)},ca=function(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var b=c.slice();b.push.apply(b,arguments);return a.apply(this,b)}},n=Date.now||function(){return+new Date},p=function(a,b){function c(){}c.prototype=b.prototype;a.m=b.prototype;a.prototype=new c;a.D=function(a,c,f){for(var m=Array(arguments.length-2),g=2;g<arguments.length;g++)m[g-2]=arguments[g];return b.prototype[c].apply(a,m)}};
var da=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")},q=function(a,b){return a<b?-1:a>b?1:0};var r=Array.prototype,ea=r.indexOf?function(a,b,c){return r.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if("string"==typeof a)return"string"==typeof b&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1};
var t;a:{var fa=h.navigator;if(fa){var ga=fa.userAgent;if(ga){t=ga;break a}}t=""};var u=function(){return-1!=t.indexOf("Edge")};var ha=function(){this.c="";this.a=null},ia=function(a){var b=new ha;b.c=a;b.a=0};ia("<!DOCTYPE html>");ia("");var ja=-1!=t.indexOf("Opera")||-1!=t.indexOf("OPR"),v=-1!=t.indexOf("Edge")||-1!=t.indexOf("Trident")||-1!=t.indexOf("MSIE"),w=-1!=t.indexOf("Gecko")&&!(-1!=t.toLowerCase().indexOf("webkit")&&!u())&&!(-1!=t.indexOf("Trident")||-1!=t.indexOf("MSIE"))&&!u(),x=-1!=t.toLowerCase().indexOf("webkit")&&!u(),ka=function(){var a=t;if(w)return/rv\:([^\);]+)(\)|;)/.exec(a);if(v&&u())return/Edge\/([\d\.]+)/.exec(a);if(v)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(x)return/WebKit\/(\S+)/.exec(a)},la=function(){var a=
h.document;return a?a.documentMode:void 0},ma=function(){if(ja&&h.opera){var a=h.opera.version;return"function"==k(a)?a():a}var a="",b=ka();b&&(a=b?b[1]:"");return v&&!u()&&(b=la(),b>parseFloat(a))?String(b):a}(),na={},y=function(a){var b;if(!(b=na[a])){b=0;for(var c=da(String(ma)).split("."),d=da(String(a)).split("."),e=Math.max(c.length,d.length),f=0;0==b&&f<e;f++){var m=c[f]||"",g=d[f]||"",C=/(\d*)(\D*)/g,Qa=/(\d*)(\D*)/g;do{var D=C.exec(m)||["","",""],E=Qa.exec(g)||["","",""];if(0==D[0].length&&
0==E[0].length)break;b=q(0==D[1].length?0:parseInt(D[1],10),0==E[1].length?0:parseInt(E[1],10))||q(0==D[2].length,0==E[2].length)||q(D[2],E[2])}while(0==b)}b=na[a]=0<=b}return b},oa=h.document,pa=la(),qa=!oa||!v||!pa&&u()?void 0:pa||("CSS1Compat"==oa.compatMode?parseInt(ma,10):5);
var z=function(a,b,c,d,e){this.reset(a,b,c,d,e)};z.prototype.a=null;var ra=0;z.prototype.reset=function(a,b,c,d,e){"number"==typeof e||ra++;this.d=d||n();this.e=a;this.g=b;this.c=c;delete this.a};z.prototype.getMessage=function(){return this.g};var A=function(a){this.e=a;this.c=this.d=this.a=null},B=function(a,b){this.name=a;this.value=b};B.prototype.toString=function(){return this.name};var sa=new B("SHOUT",1200),ta=new B("SEVERE",1E3),ua=new B("WARNING",900),va=new B("INFO",800),wa=new B("CONFIG",700);A.prototype.getChildren=function(){this.c||(this.c={});return this.c};var xa=function(a){return a.d?a.d:a.a?xa(a.a):null};
A.prototype.log=function(a,b,c){if(a.value>=xa(this).value)for("function"==k(b)&&(b=b()),a=new z(a,String(b),this.e),c&&(a.a=c),c="log:"+a.getMessage(),h.console&&(h.console.timeStamp?h.console.timeStamp(c):h.console.markTimeline&&h.console.markTimeline(c)),h.msWriteProfilerMark&&h.msWriteProfilerMark(c),c=this;c;)c=c.a}; var F={},G=null,ya=function(){G||(G=new A(""),F[""]=G,G.d=wa)},H=function(a){ya();var b;if(!(b=F[a])){b=new A(a);var c=a.lastIndexOf("."),d=a.substr(c+1),c=H(a.substr(0,c));c.getChildren()[d]=b;b.a=c;F[a]=b}return b};
H("image.collections.extension.Promises");var I=function(a){this.a=a},za={"stars-gws":"https://www.google.com","stars-last-import-time":0};I.prototype.get=function(a,b){this.a.get(a,l(this.c,this,a,b))};I.prototype.c=function(a,b,c){null!=c||(c={});for(var d=0;d<a.length;++d){var e=a[d];e in c||(c[e]=za[e])}b(c)};I.prototype.set=function(a){this.a.set(a)};
var J=function(){this.a=n()},Aa=new J;J.prototype.set=function(a){this.a=a};J.prototype.reset=function(){this.set(n())};J.prototype.get=function(){return this.a};var K=function(a){this.e=a||"";this.g=Aa};K.prototype.a=!0;K.prototype.c=!0;K.prototype.d=!1;var L=function(a){return 10>a?"0"+a:String(a)},Ba=function(a,b){var c=(a.d-b)/1E3,d=c.toFixed(3),e=0;if(1>c)e=2;else for(;100>c;)e++,c*=10;for(;0<e--;)d=" "+d;return d},Ca=function(a){K.call(this,a)};p(Ca,K);
var Da=function(){l(this.e,this);this.a=new Ca;this.a.c=!1;this.a.d=!1;this.c=this.a.a=!1;this.d="";this.g={}};
Da.prototype.e=function(a){if(!this.g[a.c]){var b;b=this.a;var c=[];c.push(b.e," ");if(b.c){var d=new Date(a.d);c.push("[",L(d.getFullYear()-2E3)+L(d.getMonth()+1)+L(d.getDate())+" "+L(d.getHours())+":"+L(d.getMinutes())+":"+L(d.getSeconds())+"."+L(Math.floor(d.getMilliseconds()/10)),"] ")}c.push("[",Ba(a,b.g.get()),"s] ");c.push("[",a.c,"] ");c.push(a.getMessage());b.d&&(d=a.a)&&c.push("\n",d instanceof Error?d.message:d.toString());b.a&&c.push("\n");b=c.join("");if(c=Ea)switch(a.e){case sa:M(c, "info",b);break;case ta:M(c,"error",b);break;case ua:M(c,"warn",b);break;default:M(c,"debug",b)}else this.d+=b}};var Ea=h.console,M=function(a,b,c){if(a[b])a[b](c);else a.log(c)};
var N=function(){this.d=this.d;this.a=this.a};N.prototype.d=!1;N.prototype.n=function(){this.d||(this.d=!0,this.c())};N.prototype.c=function(){if(this.a)for(;this.a.length;)this.a.shift()()};var Fa=function(a){a&&"function"==typeof a.n&&a.n()};!w&&!v||v&&v&&(u()||9<=qa)||w&&y("1.9.1");v&&y("9");var Ga=!v||v&&(u()||9<=qa),Ha=v&&!y("9");!x||y("528");w&&y("1.9b")||v&&y("8")||ja&&y("9.5")||x&&y("528");w&&!y("8")||v&&y("9");var O=function(a,b){this.type=a;this.a=this.target=b};O.prototype.c=function(){};var P=function(a){P[" "](a);return a};P[" "]=function(){};var Q=function(a,b){O.call(this,a?a.type:"");this.d=this.state=this.a=this.target=null;if(a){this.type=a.type;this.target=a.target||a.srcElement;this.a=b;var c=a.relatedTarget;if(c&&w)try{P(c.nodeName)}catch(d){}this.state=a.state;this.d=a;a.defaultPrevented&&this.c()}};p(Q,O);Q.prototype.c=function(){Q.m.c.call(this);var a=this.d;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,Ha)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};
var R="closure_listenable_"+(1E6*Math.random()|0),Ia=0;var Ja=function(a,b,c,d,e){this.i=a;this.proxy=null;this.src=b;this.type=c;this.l=!!d;this.a=e;this.o=++Ia;this.removed=this.k=!1},S=function(a){a.removed=!0;a.i=null;a.proxy=null;a.src=null;a.a=null};var T=function(a){this.src=a;this.a={};this.c=0},La=function(a,b,c,d,e){var f=b.toString();b=a.a[f];b||(b=a.a[f]=[],a.c++);var m=Ka(b,c,d,e);-1<m?(a=b[m],a.k=!1):(a=new Ja(c,a.src,f,!!d,e),a.k=!1,b.push(a));return a};T.prototype.remove=function(a,b,c,d){a=a.toString();if(!(a in this.a))return!1;var e=this.a[a];b=Ka(e,b,c,d);return-1<b?(S(e[b]),r.splice.call(e,b,1),0==e.length&&(delete this.a[a],this.c--),!0):!1};
var Ma=function(a,b){var c=b.type;if(!(c in a.a))return!1;var d=a.a[c],e=ea(d,b),f;(f=0<=e)&&r.splice.call(d,e,1);f&&(S(b),0==a.a[c].length&&(delete a.a[c],a.c--));return f};T.prototype.removeAll=function(a){a=a&&a.toString();var b=0,c;for(c in this.a)if(!a||c==a){for(var d=this.a[c],e=0;e<d.length;e++)++b,S(d[e]);delete this.a[c];this.c--}return b}; var Na=function(a,b,c,d,e){a=a.a[b.toString()];b=-1;a&&(b=Ka(a,c,d,e));return-1<b?a[b]:null},Ka=function(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.removed&&f.i==b&&f.l==!!c&&f.a==d)return e}return-1};
var Oa="closure_lm_"+(1E6*Math.random()|0),Pa={},Ra=0,Sa=function(a,b,c,d,e){if("array"==k(b)){for(var f=0;f<b.length;f++)Sa(a,b[f],c,d,e);return null}c=Ta(c);if(a&&a[R])a=a.listen(b,c,d,e);else{if(!b)throw Error("Invalid event type");var f=!!d,m=U(a);m||(a[Oa]=m=new T(a));c=La(m,b,c,d,e);c.proxy||(d=Ua(),c.proxy=d,d.src=a,d.i=c,a.addEventListener?a.addEventListener(b.toString(),d,f):a.attachEvent(Va(b.toString()),d),Ra++);a=c}return a},Ua=function(){var a=Wa,b=Ga?function(c){return a.call(b.src,
b.i,c)}:function(c){c=a.call(b.src,b.i,c);if(!c)return c};return b},Xa=function(a,b,c,d,e){if("array"==k(b))for(var f=0;f<b.length;f++)Xa(a,b[f],c,d,e);else c=Ta(c),a&&a[R]?a.unlisten(b,c,d,e):a&&(a=U(a))&&(b=Na(a,b,c,!!d,e))&&V(b)},V=function(a){if("number"==typeof a||!a||a.removed)return!1;var b=a.src;if(b&&b[R])return Ma(b.h,a);var c=a.type,d=a.proxy;b.removeEventListener?b.removeEventListener(c,d,a.l):b.detachEvent&&b.detachEvent(Va(c),d);Ra--;(c=U(b))?(Ma(c,a),0==c.c&&(c.src=null,b[Oa]=null)):
S(a);return!0},Va=function(a){return a in Pa?Pa[a]:Pa[a]="on"+a},Za=function(a,b,c,d){var e=!0;if(a=U(a))if(b=a.a[b.toString()])for(b=b.concat(),a=0;a<b.length;a++){var f=b[a];f&&f.l==c&&!f.removed&&(f=Ya(f,d),e=e&&!1!==f)}return e},Ya=function(a,b){var c=a.i,d=a.a||a.src;a.k&&V(a);return c.call(d,b)},Wa=function(a,b){if(a.removed)return!0;if(!Ga){var c;if(!(c=b))a:{c=["window","event"];for(var d=h,e;e=c.shift();)if(null!=d[e])d=d[e];else{c=null;break a}c=d}e=c;c=new Q(e,this);d=!0;if(!(0>e.keyCode||
void 0!=e.returnValue)){a:{var f=!1;if(0==e.keyCode)try{e.keyCode=-1;break a}catch(m){f=!0}if(f||void 0==e.returnValue)e.returnValue=!0}e=[];for(f=c.a;f;f=f.parentNode)e.push(f);for(var f=a.type,g=e.length-1;0<=g;g--){c.a=e[g];var C=Za(e[g],f,!0,c),d=d&&C}for(g=0;g<e.length;g++)c.a=e[g],C=Za(e[g],f,!1,c),d=d&&C}return d}return Ya(a,new Q(b,this))},U=function(a){a=a[Oa];return a instanceof T?a:null},$a="__closure_events_fn_"+(1E9*Math.random()>>>0),Ta=function(a){if("function"==k(a))return a;a[$a]|| (a[$a]=function(b){return a.handleEvent(b)});return a[$a]};
var W=function(a){N.call(this);this.g=a;this.e={}};p(W,N);var ab=[];W.prototype.listen=function(a,b,c,d){"array"!=k(b)&&(b&&(ab[0]=b.toString()),b=ab);for(var e=0;e<b.length;e++){var f=Sa(a,b[e],c||this.handleEvent,d||!1,this.g||this);if(!f)break;this.e[f.o]=f}return this};
W.prototype.unlisten=function(a,b,c,d,e){if("array"==k(b))for(var f=0;f<b.length;f++)this.unlisten(a,b[f],c,d,e);else c=c||this.handleEvent,e=e||this.g||this,c=Ta(c),d=!!d,b=a&&a[R]?Na(a.h,String(b),c,d,e):a?(a=U(a))?Na(a,b,c,d,e):null:null,b&&(V(b),delete this.e[b.o]);return this};W.prototype.removeAll=function(){var a=this.e,b=V,c;for(c in a)b.call(void 0,a[c],c,a);this.e={}};W.prototype.c=function(){W.m.c.call(this);this.removeAll()}; W.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented");};
var X=function(){N.call(this);this.h=new T(this)};p(X,N);X.prototype[R]=!0;X.prototype.addEventListener=function(a,b,c,d){Sa(this,a,b,c,d)};X.prototype.removeEventListener=function(a,b,c,d){Xa(this,a,b,c,d)};X.prototype.c=function(){X.m.c.call(this);this.h&&this.h.removeAll(void 0)};X.prototype.listen=function(a,b,c,d){return La(this.h,String(a),b,c,d)};X.prototype.unlisten=function(a,b,c,d){return this.h.remove(String(a),b,c,d)};
var Y=function(){X.call(this);var a=document;this.p=a.getElementById("gws");this.e=a.getElementById("save_and_exit");this.e.disabled=!0;this.s=new I(chrome.storage.sync);this.g=new W(this);a=ca(Fa,this.g);this.d?a.call(void 0):(this.a||(this.a=[]),this.a.push(a))};p(Y,X);Y.c=function(){return Y.a?Y.a:Y.a=new Y};var bb=new Da;0!=bb.c&&(ya(),bb.c=!1);var cb=H("image.collections.extension.Options");Y.prototype.A=function(a){this.p.value=a["stars-gws"]};
Y.prototype.w=function(){this.s.set({"stars-gws":this.p.value});this.e.disabled=!0;chrome.runtime.reload()};Y.prototype.v=function(){this.e.disabled=!1};var Z=Y.c();cb&&cb.log(va,"Initializing extension options",void 0);Z.g.listen(Z.e,"click",Z.w).listen(document.body,"input",Z.v);var db={B:"stars-gws",C:"stars-last-import-time"},eb=[],fb=0,gb;for(gb in db)eb[fb++]=db[gb];Z.s.get(eb,l(Z.A,Z));

}catch(e){_DumpException(e)}
// Google Inc.
