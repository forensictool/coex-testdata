try{
'use strict';var f=this,aa=function(){},g=function(a){a.h=function(){return a.m?a.m:a.m=new a}},ba=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=
typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";else if("function"==b&&"undefined"==typeof a.call)return"object";return b},k=function(a){return"function"==ba(a)},ca=function(a,b,c){return a.call.apply(a.bind,arguments)},da=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);
return a.apply(b,c)}}return function(){return a.apply(b,arguments)}},m=function(a,b,c){m=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ca:da;return m.apply(null,arguments)},ea=function(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var b=c.slice();b.push.apply(b,arguments);return a.apply(this,b)}},fa=Date.now||function(){return+new Date};
var n=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")},p=function(a,b){return a<b?-1:a>b?1:0};var q;a:{var x=f.navigator;if(x){var y=x.userAgent;if(y){q=y;break a}}q=""};var z=function(){return-1!=q.indexOf("Edge")||-1!=q.indexOf("Trident")||-1!=q.indexOf("MSIE")};var A=function(){return-1!=q.indexOf("Edge")};var ga=-1!=q.indexOf("Opera")||-1!=q.indexOf("OPR"),B=z(),C=-1!=q.indexOf("Gecko")&&!(-1!=q.toLowerCase().indexOf("webkit")&&!A())&&!(-1!=q.indexOf("Trident")||-1!=q.indexOf("MSIE"))&&!A(),ha=-1!=q.toLowerCase().indexOf("webkit")&&!A(),ia=function(){var a=q;if(C)return/rv\:([^\);]+)(\)|;)/.exec(a);if(B&&A())return/Edge\/([\d\.]+)/.exec(a);if(B)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(ha)return/WebKit\/(\S+)/.exec(a)},D=function(){var a=f.document;return a?a.documentMode:void 0},E=function(){if(ga&&
f.opera){var a=f.opera.version;return k(a)?a():a}var a="",b=ia();b&&(a=b?b[1]:"");return B&&!A()&&(b=D(),b>parseFloat(a))?String(b):a}(),F={},G=function(a){if(!F[a]){for(var b=0,c=n(String(E)).split("."),d=n(String(a)).split("."),e=Math.max(c.length,d.length),h=0;0==b&&h<e;h++){var l=c[h]||"",r=d[h]||"",w=/(\d*)(\D*)/g,t=/(\d*)(\D*)/g;do{var u=w.exec(l)||["","",""],v=t.exec(r)||["","",""];if(0==u[0].length&&0==v[0].length)break;b=p(0==u[1].length?0:parseInt(u[1],10),0==v[1].length?0:parseInt(v[1], 10))||p(0==u[2].length,0==v[2].length)||p(u[2],v[2])}while(0==b)}F[a]=0<=b}},H=f.document,I=D(),ja=!H||!B||!I&&A()?void 0:I||("CSS1Compat"==H.compatMode?parseInt(E,10):5);
var J;if(!(J=!C&&!B)){var K;if(K=B)K=B&&(A()||9<=ja);J=K}J||C&&G("1.9.1");B&&G("9");var ka=function(a){a()},la=function(a){var b=document.body;b&&a&&ka(function(){b.appendChild(a)})},ma=function(a,b){ka(function(){if("textContent"in a)a.textContent=b;else if(3==a.nodeType)a.data=b;else if(a.firstChild&&3==a.firstChild.nodeType){for(;a.lastChild!=a.firstChild;)a.removeChild(a.lastChild);a.firstChild.data=b}else{for(var c;c=a.firstChild;)a.removeChild(c);a.appendChild((9==a.nodeType?a:a.ownerDocument||a.document).createTextNode(String(b)))}})};
var L=function(a,b,c){this.e=c;this.d=a;this.g=b;this.c=0;this.a=null};L.prototype.get=function(){var a;0<this.c?(this.c--,a=this.a,this.a=a.next,a.next=null):a=this.d();return a};var na=function(a,b){a.g(b);a.c<a.e&&(a.c++,b.next=a.a,a.a=b)};var oa=function(a){f.setTimeout(function(){throw a;},0)},M,pa=function(){var a=f.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&-1==q.indexOf("Presto")&&(a=function(){var a=document.createElement("IFRAME");a.style.display="none";a.src="";document.documentElement.appendChild(a);var b=a.contentWindow,a=b.document;a.open();a.write("");a.close();var c="callImmediate"+Math.random(),d="file:"==b.location.protocol?"*":b.location.protocol+
"//"+b.location.host,a=m(function(a){if(("*"==d||a.origin==d)&&a.data==c)this.port1.onmessage()},this);b.addEventListener("message",a,!1);this.port1={};this.port2={postMessage:function(){b.postMessage(c,d)}}});if("undefined"!==typeof a&&!z()){var b=new a,c={},d=c;b.port1.onmessage=function(){if(void 0!==c.next){c=c.next;var a=c.k;c.k=null;a()}};return function(a){d.next={k:a};d=d.next;b.port2.postMessage(0)}}return"undefined"!==typeof document&&"onreadystatechange"in document.createElement("SCRIPT")? function(a){var b=document.createElement("SCRIPT");b.onreadystatechange=function(){b.onreadystatechange=null;b.parentNode.removeChild(b);b=null;a();a=null};document.documentElement.appendChild(b)}:function(a){f.setTimeout(a,0)}};
var N=function(){this.c=this.a=null},qa=new L(function(){return new O},function(a){a.reset()},100);N.prototype.add=function(a,b){var c=qa.get();c.set(a,b);this.c?this.c.next=c:this.a=c;this.c=c};N.prototype.remove=function(){var a=null;this.a&&(a=this.a,this.a=this.a.next,this.a||(this.c=null),a.next=null);return a};var O=function(){this.next=this.c=this.a=null};O.prototype.set=function(a,b){this.a=a;this.c=b;this.next=null};O.prototype.reset=function(){this.next=this.c=this.a=null};
var ta=function(a,b){P||ra();Q||(P(),Q=!0);sa.add(a,b)},P,ra=function(){if(f.Promise&&f.Promise.resolve){var a=f.Promise.resolve();P=function(){a.then(ua)}}else P=function(){var a=ua;!k(f.setImmediate)||f.Window&&f.Window.prototype&&f.Window.prototype.setImmediate==f.setImmediate?(M||(M=pa()),M(a)):f.setImmediate(a)}},Q=!1,sa=new N,ua=function(){for(var a=null;a=sa.remove();){try{a.a.call(a.c)}catch(b){oa(b)}na(qa,a)}Q=!1};
var S=function(a,b){this.a=0;this.l=void 0;this.d=this.c=this.e=null;this.g=this.i=!1;if(a==va)R(this,2,b);else try{var c=this;a.call(b,function(a){R(c,2,a)},function(a){R(c,3,a)})}catch(d){R(this,3,d)}},wa=function(){this.next=this.d=this.c=this.e=this.a=null;this.g=!1};wa.prototype.reset=function(){this.d=this.c=this.e=this.a=null;this.g=!1};
var xa=new L(function(){return new wa},function(a){a.reset()},100),ya=function(a,b,c){var d=xa.get();d.e=a;d.c=b;d.d=c;return d},va=function(){},Aa=function(a){return new S(function(b,c){var d=a.length,e=[];if(d)for(var h=function(a,c){d--;e[a]=c;0==d&&b(e)},l=function(a){c(a)},r=0,w;w=a[r];r++)za(w,ea(h,r),l);else b(e)})};S.prototype.then=function(a,b,c){return Ba(this,k(a)?a:null,k(b)?b:null,c)};S.prototype.then=S.prototype.then;S.prototype.$goog_Thenable=!0;
var za=function(a,b,c,d){a instanceof S?Ca(a,ya(b||aa,c||null,d)):a.then(b,c,d)},Ca=function(a,b){a.c||2!=a.a&&3!=a.a||Da(a);a.d?a.d.next=b:a.c=b;a.d=b},Ba=function(a,b,c,d){var e=ya(null,null,null);e.a=new S(function(a,l){e.e=b?function(c){try{var e=b.call(d,c);a(e)}catch(t){l(t)}}:a;e.c=c?function(b){try{var e=c.call(d,b);a(e)}catch(t){l(t)}}:l});e.a.e=a;Ca(a,e);return e.a};S.prototype.n=function(a){this.a=0;R(this,2,a)};S.prototype.o=function(a){this.a=0;R(this,3,a)};
var R=function(a,b,c){if(0==a.a){if(a==c)b=3,c=new TypeError("Promise cannot resolve to itself");else{var d;if(c)try{d=!!c.$goog_Thenable}catch(e){d=!1}else d=!1;if(d){a.a=1;za(c,a.n,a.o,a);return}d=typeof c;if("object"==d&&null!=c||"function"==d)try{var h=c.then;if(k(h)){Ea(a,c,h);return}}catch(l){b=3,c=l}}a.l=c;a.a=b;a.e=null;Da(a);3!=b||Fa(a,c)}},Ea=function(a,b,c){a.a=1;var d=!1,e=function(b){d||(d=!0,a.n(b))},h=function(b){d||(d=!0,a.o(b))};try{c.call(b,e,h)}catch(l){h(l)}},Da=function(a){a.i||
(a.i=!0,ta(a.p,a))},Ga=function(a){var b=null;a.c&&(b=a.c,a.c=b.next,b.next=null);a.c||(a.d=null);return b};S.prototype.p=function(){for(var a=null;a=Ga(this);){var b=this.a,c=this.l;a.a&&(a.a.e=null);if(2==b)a.e.call(a.d,c);else if(null!=a.c){if(!a.g)for(b=void 0,b=this;b&&b.g;b=b.e)b.g=!1;a.c.call(a.d,c)}na(xa,a)}this.i=!1};var Fa=function(a,b){a.g=!0;ta(function(){a.g&&Ha.call(null,b)})},Ha=oa;
var T=function(){this.c={};this.a={}};g(T);var U=function(a,b,c,d,e){this.reset(a,b,c,d,e)};U.prototype.a=null;var Ia=0;U.prototype.reset=function(a,b,c,d,e){"number"==typeof e||Ia++;d||fa();this.c=b;delete this.a};U.prototype.getMessage=function(){return this.c};var V=function(a){this.e=a;this.c=this.d=this.a=null},W=function(a,b){this.name=a;this.value=b};W.prototype.toString=function(){return this.name};var Ja=new W("SEVERE",1E3),Ka=new W("CONFIG",700);V.prototype.getChildren=function(){this.c||(this.c={});return this.c};var La=function(a){return a.d?a.d:a.a?La(a.a):null};
V.prototype.log=function(a,b,c){if(a.value>=La(this).value)for(k(b)&&(b=b()),a=new U(a,String(b),this.e),c&&(a.a=c),c="log:"+a.getMessage(),f.console&&(f.console.timeStamp?f.console.timeStamp(c):f.console.markTimeline&&f.console.markTimeline(c)),f.msWriteProfilerMark&&f.msWriteProfilerMark(c),c=this;c;)c=c.a};var X={},Y=null,Ma=function(a){Y||(Y=new V(""),X[""]=Y,Y.d=Ka);var b;if(!(b=X[a])){b=new V(a);var c=a.lastIndexOf("."),d=a.substr(c+1),c=Ma(a.substr(0,c));c.getChildren()[d]=b;b.a=c;X[a]=b}return b};
var Z;Z=Ma("image.collections.extension.Promises");var Ha=function(a){Z&&Z.log(Ja,a.toString(),void 0)},Na=function(a,b,c){return function(d){var e=chrome.runtime.lastError;e?(d=T.h(),a&&(d.a[a]=(d.a[a]||0)+1),c(e.message||"Unknown Chrome API error")):(e=T.h(),a&&(e.c[a]=(e.c[a]||0)+1),b(d))}},Oa=function(a,b){return new S(function(c,d){chrome.tabs.sendMessage(a,b,Na("chrome.tabs.sendMessage",c,d))})},Pa=function(){return new S(function(a,b){chrome.tabs.getCurrent(Na("chrome.tabs.getCurrent",a,b))})};
var Qa=function(){};g(Qa);(function(){Qa.h();var a={type:"get_log_history"},b={type:"get_chrome_api_logs"};Pa().then(function(c){c=c.openerTabId;return Aa([Oa(c,a),Oa(c,b)])}).then(function(a){var b;b=document.createElement("pre");ma(b,a[0]+"\nChrome API calls:\n"+a[1]);la(b)})})();

}catch(e){_DumpException(e)}
// Google Inc.