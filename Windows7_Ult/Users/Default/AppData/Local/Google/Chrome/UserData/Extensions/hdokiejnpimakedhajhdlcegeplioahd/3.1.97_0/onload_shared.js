var do_bgiconinput=!0,g_CSPCHECKER=0;
function popupfill_create_iframe(a,c,d,g,b,f,j,h,k){if(do_experimental_popupfill&&a){var e=a.getElementsByTagName("input"),l;for(l in e){var m=e[l];"undefined"!==typeof m.maxLength&&"password"==m.type&&(g_isie||sendBG({cmd:"set_possiblemax",max:m.maxLength}))}c=parseInt(c)+"px";d=parseInt(d)+"px";if(m=a.body){e=a.createElement("iframe");e.id=LPMAGICIFRAME+g;e.name=LPMAGICIFRAME+g;e.onload=function(){g_CSPCHECKER=1};g_fixed_iframe_position?h=!0:"undefined"==typeof h&&(h=!1);h&&(g_fixed_shuffled_once=
!1);if(g_isie)e.src="https://lastpass.com/fake/fake.php#framesrc=LPMAGIC";else if("undefined"!=typeof g_isfirefoxsdk&&g_isfirefoxsdk){g_popup_iframe=e;add_event_listener_if();a=lpParseUri(a.location.href);var s=Math.floor(1E8*Math.random());e.src=a.protocol+"://"+s+"."+a.host+"/lpblankiframe.local"}else e.src=urlprefix+"popupfilltab.html";0>parseInt(c)&&(c="0px");0>parseInt(d)&&(d="0px");dotrans?(g_frame_css_str=h?"display:block; position:fixed !important; visibility:visible !important; z-index:"+
CLICKABLE_ICON_ZINDEX+" !important; border-style:none !important;":"display:block; position:absolute !important; visibility:visible !important; z-index:"+CLICKABLE_ICON_ZINDEX+" !important; border-style:none !important;","undefined"!=typeof g_isie&&g_isie&&(g_frame_css_str+="background-color:transparent !important;background-image:none !important;")):g_frame_css_str=h?"display:block; position:fixed !important; visibility:visible !important; z-index:"+CLICKABLE_ICON_ZINDEX+" !important; border-style:solid !important; border-color: #4c4c4c !important; border-width:1px !important; border-radius: 4px 4px; -moz-border-radius: 4px; -webkit-border-radius: 4px; box-shadow: 1px rgba(200, 200, 200, 0.5); -webkit-box-shadow: 1px 1px rgba(200, 200, 200, 0.5); -moz-box-shadow: 1px 1px rgba(200, 200, 200, 0.5);":
"display:block; position:absolute !important; visibility:visible !important; z-index:"+CLICKABLE_ICON_ZINDEX+" !important; border-style:solid !important; border-color: #4c4c4c !important; border-width:1px !important; border-radius: 4px 4px; -moz-border-radius: 4px; -webkit-border-radius: 4px; box-shadow: 1px rgba(200, 200, 200, 0.5); -webkit-box-shadow: 1px 1px rgba(200, 200, 200, 0.5); -moz-box-shadow: 1px 1px rgba(200, 200, 200, 0.5);";e.style.cssText=g_frame_css_str;try{if(framesetarr=document.getElementsByTagName("frameset"),
0==framesetarr.length)m.appendChild(e);else if(g_create_iframe_in_top&&!g_isie&&!g_isfirefox&&k&&1==framesetarr.length){var p=LPJSON.stringify(g_frame_css_str+" border: none;");k.body.setAttribute("data-lp-gcss",p);var n=k.getElementsByTagName("FRAMESET");if(n&&n[0]){var q=n[0].getElementsByTagName("FRAME");if(q){var r=q[0].contentWindow.document;r.body.setAttribute("data-lp-gcss",p);r.body.appendChild(e)}else k.body.appendChild(e)}}else{h=!1;for(l=0;l<framesetarr.length;l++){for(k=0;k<framesetarr[l].children.length;k++)"FRAME"==
framesetarr[l].children[k].tagName&&(cf=framesetarr[l].children[k].contentWindow.document,null!=cf.getElementById(g)?(h=!0,toappendTo=cf.getElementById(g)):null!=cf.getElementsByName(g)&&0!=cf.getElementsByName(g).length&&(h=!0,toappendTo=cf.getElementsByName(g)[0]));if(h){try{toappendTo.ownerDocument.body.setAttribute("data-lp-gcss",LPJSON.stringify(g_frame_css_str)),toappendTo.parentNode.appendChild(e)}catch(u){framesetarr[l].children[k].contentWindow.document.body.appendChild(e)}break}}}}catch(t){verbose_log("append failed! "+
t);return}e.width=parseInt(f)+"px";e.height=g_isie?"38px":"26px";"undefined"!=typeof b&&0<b&&(e.height=24*b+23+"px");e.height=0<parseInt(j)?parseInt(j)+"px":parseInt(e.height)+"px";g=parseInt(e.width)+"px";b=parseInt(e.height)+"px";e.style.cssText=g_frame_css_str+("width: "+g+" !important; height: "+b+" !important; top:"+d+" !important; left:"+c+" !important; ");setTimeout(function(){},5E3)}}}
function weasel(a){g_ctr_weasel++;if(do_experimental_popupfill){if("undefined"==typeof a||!1==a||!0==a||5>a)a=200;g_weaseled=!0;popupfill_resize();g_weasel_id=setTimeout(function(){weasel(a)},a)}}function issaveall(a){a=a.elements;for(var c=0,d=0,g=0,b=0;b<a.length;b++){var f=a[b].type;"password"==f?d++:"text"==f||"tel"==f||"email"==f?c++:"textarea"==f&&g++}return 1==c&&1==d&&0==g?!1:!0}var POPUP_FIELD_OFFSET=-4;
function calculate_iframe_pos(a,c,d,g){if(!do_experimental_popupfill)return null;"undefined"==typeof g&&(g=!1);if(!a||null==c)return null;var b=c.style.left,f=c.style.top;if(g_double_password_hack||g_double_secret_password_hack||0>parseInt(b)||0>parseInt(f)){var j=a.getElementById(LPMAGICIFRAME+LP_pickFieldName(a,c));if(null!=j&&(j=LP_getAbsolutePos(a,j)))return f=parseInt(j.top),b=parseInt(j.left),isNaN(f)||isNaN(b)?null:{posx:b+"px",posy:f+"px"}}LP_pickFieldName(a,c);if(null!=c){j=LP_getAbsolutePos(a,
c);null!=j&&(b=parseInt(j.left)+POPUP_FIELD_OFFSET+"px",f=parseInt(j.top)+parseInt(j.height)+"px",g_do_icon_number_hint&&(f=parseInt(j.top)+parseInt(j.height)+4+"px"));if(null==d||0==d||""==d)j=LP_getElementByIdOrName(a,LPMAGICIFRAME+LP_pickFieldName(a,c)),d=null!=j?(d=LP_getAbsolutePos(a,j))?d.width:0:0;if(!g){g=LP_getWindowWidth(window);if(!g)return{posx:0,posy:0};parseInt(d)+parseInt(b)>g&&(b=g-parseInt(d)-20+"px")}}if(""==b||"auto"==b||""==f||"auto"==f)return null;b=parseInt(b);f=parseInt(f);
return"NaN"==b||"NaN"==f?null:{posx:b+"px",posy:f+"px"}}function verbose_log(a){verbose&&console_log(a)}function is_watermark(){return!1}function checkAskGenerate(){}function sendKey(a,c){try{return keyName="DOM_VK_"+a.toUpperCase(),send_simulated_key(c,0,KeyEvent[keyName],!1)}catch(d){lpdbg("error",d)}return null}
function send_simulated_key(a,c,d,g){if(void 0===a||void 0===a.ownerDocument)return lpdbg("error","No key target!"),!1;var b=a.ownerDocument.createEvent("KeyboardEvent");"undefined"!=typeof g_isfirefoxsdk&&g_isfirefoxsdk?b.initKeyEvent("keydown",!0,!0,null,!1,!1,g,!1,d,c):b.initKeyboardEvent("keydown",!0,!0,document.defaultView,!1,!1,g,!1,d,d);var f=a.dispatchEvent(b);f&&("undefined"!=typeof g_isfirefoxsdk&&g_isfirefoxsdk)&&(b=a.ownerDocument.createEvent("KeyboardEvent"),b.initKeyEvent("keypress",
!0,!0,null,!1,!1,g,!1,d,c),f=a.dispatchEvent(b));b=a.ownerDocument.createEvent("KeyboardEvent");"undefined"!=typeof g_isfirefoxsdk&&g_isfirefoxsdk?b.initKeyEvent("keyup",!0,!0,null,!1,!1,g,!1,d,c):b.initKeyboardEvent("keyup",!0,!0,null,!1,!1,g,!1,d,d);a.dispatchEvent(b);return f}
if("undefined"==typeof KeyEvent)var KeyEvent={DOM_VK_CANCEL:3,DOM_VK_HELP:6,DOM_VK_BACK_SPACE:8,DOM_VK_TAB:9,DOM_VK_CLEAR:12,DOM_VK_RETURN:13,DOM_VK_ENTER:14,DOM_VK_SHIFT:16,DOM_VK_CONTROL:17,DOM_VK_ALT:18,DOM_VK_PAUSE:19,DOM_VK_CAPS_LOCK:20,DOM_VK_ESCAPE:27,DOM_VK_SPACE:32,DOM_VK_PAGE_UP:33,DOM_VK_PAGE_DOWN:34,DOM_VK_END:35,DOM_VK_HOME:36,DOM_VK_LEFT:37,DOM_VK_UP:38,DOM_VK_RIGHT:39,DOM_VK_DOWN:40,DOM_VK_PRINTSCREEN:44,DOM_VK_INSERT:45,DOM_VK_DELETE:46,DOM_VK_0:48,DOM_VK_1:49,DOM_VK_2:50,DOM_VK_3:51,
DOM_VK_4:52,DOM_VK_5:53,DOM_VK_6:54,DOM_VK_7:55,DOM_VK_8:56,DOM_VK_9:57,DOM_VK_SEMICOLON:59,DOM_VK_EQUALS:61,DOM_VK_A:65,DOM_VK_B:66,DOM_VK_C:67,DOM_VK_D:68,DOM_VK_E:69,DOM_VK_F:70,DOM_VK_G:71,DOM_VK_H:72,DOM_VK_I:73,DOM_VK_J:74,DOM_VK_K:75,DOM_VK_L:76,DOM_VK_M:77,DOM_VK_N:78,DOM_VK_O:79,DOM_VK_P:80,DOM_VK_Q:81,DOM_VK_R:82,DOM_VK_S:83,DOM_VK_T:84,DOM_VK_U:85,DOM_VK_V:86,DOM_VK_W:87,DOM_VK_X:88,DOM_VK_Y:89,DOM_VK_Z:90,DOM_VK_WIN:91,DOM_VK_CONTEXT_MENU:93,DOM_VK_NUMPAD0:96,DOM_VK_NUMPAD1:97,DOM_VK_NUMPAD2:98,
DOM_VK_NUMPAD3:99,DOM_VK_NUMPAD4:100,DOM_VK_NUMPAD5:101,DOM_VK_NUMPAD6:102,DOM_VK_NUMPAD7:103,DOM_VK_NUMPAD8:104,DOM_VK_NUMPAD9:105,DOM_VK_MULTIPLY:106,DOM_VK_ADD:107,DOM_VK_SEPARATOR:108,DOM_VK_SUBTRACT:109,DOM_VK_DECIMAL:110,DOM_VK_DIVIDE:111,DOM_VK_F1:112,DOM_VK_F2:113,DOM_VK_F3:114,DOM_VK_F4:115,DOM_VK_F5:116,DOM_VK_F6:117,DOM_VK_F7:118,DOM_VK_F8:119,DOM_VK_F9:120,DOM_VK_F10:121,DOM_VK_F11:122,DOM_VK_F12:123,DOM_VK_F13:124,DOM_VK_F14:125,DOM_VK_F15:126,DOM_VK_F16:127,DOM_VK_F17:128,DOM_VK_F18:129,
DOM_VK_F19:130,DOM_VK_F20:131,DOM_VK_F21:132,DOM_VK_F22:133,DOM_VK_F23:134,DOM_VK_F24:135,DOM_VK_NUM_LOCK:144,DOM_VK_SCROLL_LOCK:145,DOM_VK_COMMA:188,DOM_VK_PERIOD:190,DOM_VK_SLASH:191,DOM_VK_BACK_QUOTE:192,DOM_VK_OPEN_BRACKET:219,DOM_VK_BACK_SLASH:220,DOM_VK_CLOSE_BRACKET:221,DOM_VK_QUOTE:222,DOM_VK_META:224};var g_formmutations=0;
function checkShouldRecheck(){if(!(20<g_formmutations)&&do_experimental_popupfill&&(verbose_log("entered checkShouldRecheck()"),0<=g_input_cnt&&0<=g_form_cnt)){var a=countInputs(document),c=countFormEquivalents(document),d=computeFingerprint(document);verbose_log("checkShouldRecheck() : # inputs was "+g_input_cnt+", now "+a+" #forms was "+g_form_cnt+" now "+c+", fingerprint was "+g_input_fingerprint+" now "+d);if(g_input_cnt!=a||g_form_cnt!=c||g_input_fingerprint!=d)g_formmutations++,formcachereset(document),
fieldcachereset(document),g_isie?(setTimeout(function(){ie_recheck_page(document,g_is_specialsite)},200),setTimeout(function(){ie_recheck_page(document,g_is_specialsite)},1E3)):setTimeout(function(){g_ctr_recheck++;evalScriptsInFrame(window,document,!0)},200),g_input_cnt=a,g_form_cnt=c,g_input_fingerprint=d}}function is_watermark_password(){return!1}
function LP_addEventHandler(a,c,d){try{return null==a||null==c||null==d||0>=c.length?null:"undefined"!=typeof a.addEventListener?a.addEventListener(c,d,!1):"undefined"!=typeof a.attachEvent?a.attachEvent("on"+c,d):null}catch(g){return verbose_log("LP_addEventHandler failed, "+g.message),null}}
function LP_stopEventPropagation(a){try{"undefined"!=typeof a.preventDefault?a.preventDefault():typeof window.event&&(window.event.returnValue=!1),"undefined"!=typeof a.stopPropagation?a.stopPropagation():typeof window.event&&(window.event.cancelBubble=!0)}catch(c){verbose_log("LP_stopEventPropagation failed, "+c.message)}}
function LP_getEventTarget(a){a=a?a:window.event;if((a="undefined"!=typeof a.target?a.target:a.srcElement)&&"undefined"!=typeof a.nodeType&&3==a.nodeType)a=a.parentNode;return a}
function createpopuptoplevel_handler(a){var c=LP_derive_doc(),d=parseInt(a.from_iframe.posx),g=parseInt(a.from_iframe.posy),b=a.from_iframe.id,f=a.from_iframe.rows,j=a.from_iframe.width,h=a.from_iframe.framename,k=a.from_iframe.framesrc;a=null;if(!is_your_popup_showing(c)){var e=find_iframe_pos(c,h,k,!1);e||(e=find_iframe_pos(c,h,k,!0),null!==e&&"undefined"!=typeof e.cframedoc&&(a=e.cframedoc));k=h=0;e?(h=parseInt(e.left)+d+"px",k=parseInt(e.top)+g+"px",g_toplevel_initial_abs_x=h,g_toplevel_initial_abs_y=
k):k=h="10px";popupfill_create_iframe(c,h,k,b,f,j,"90px",!0,a);g_popupfill_iframe_width_save=j}}var g_toplevel_initial_abs_x=null,g_toplevel_initial_abs_y=null;function popupfillresize_handler(a){g_minwidth_override=parseInt(a.width);g_minheight_override=parseInt(a.height);g_create_iframe_in_top&&!g_isie&&!g_isfirefox&&!LP_inIframe(window)&&toplevel_iframe_state_get()&&relocate_popupfill_iframes(document)}
function find_iframe_pos(a,c,d,g){if(!a)return null;var b,f;try{var j=a.getElementsByTagName("IFRAME");g&&(j=a.getElementsByTagName("FRAME"));if(!c&&1==j.length)return LP_getAbsolutePos(a,j[0],!0);var h=[];for(b=0;b<j.length&&50>b;b++)h[b]=j[b];for(b=0;b<h.length;b++)if(h[b].name&&""!=c&&h[b].name==c||h[b].src&&""!=d&&h[b].src==d)return LP_getAbsolutePos(a,h[b],!0);if(g)for(b=0;b<h.length;b++){var k=h[b].contentWindow.document,e=k.getElementsByTagName("FRAME");for(f=0;f<e.length&&50>f;f++)if(e[f].name&&
""!=c&&e[f].name==c||e[f].src&&""!=d&&e[f].src==d){var l=LP_getAbsolutePos(k,e[f],!0);l.cframedoc=k;return l}}}catch(m){}return null}function LP_getComputedStyle(a,c){return!c?null:"undefined"!=typeof a.getComputedStyle?g_isfirefox?a.getComputedStyle(c,null):a.getComputedStyle(c):c.currentStyle}
function add_event_listener_if(){"undefined"==typeof g_added_event_listener&&(g_added_event_listener=!0,window.addEventListener("message",function(a){try{0==urlprefix.indexOf(a.origin)&&self.port.emit("lpmessage",a.data)}catch(c){}},!1))};
