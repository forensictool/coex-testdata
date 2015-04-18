var g_np_init=!1,namedpipeobserverfunction=null;
function lpnp_init(){g_np_init||(!g_is_win&&!g_is_mac&&!g_is_linux?g_np_init=!1:g_issafari&&g_is_win?g_np_init=!1:have_binary()?is_chrome_portable()?g_np_init=!1:(lpdbg("namedpipes","lpnp_init : initializing named pipe server"),namedpipeobserverfunction=function(a,b,c){"lpxpcom"==b&&process_ipc_msg(c,"pipes")},call_binary_function("StartNamedPipeServer"),g_np_init=!0,setTimeout(function(){lpnp_notify("logincheck")},1E3),(g_issafari&&g_is_mac||g_isfirefoxsdk)&&lpnp_get_javascript_message()):lpdbg("namedpipes",
"named pipe server could not be started"))}function lpnp_get_javascript_message(){have_binary_function("get_javascript_message")&&call_binary_function("get_javascript_message",function(a){0<a.length&&namedpipeobserverfunction(null,"lpxpcom",a);setTimeout(function(){lpnp_get_javascript_message()},0==a.length?2E3:0)})}
function lpnp_notify(a,b){if(!LPISLOC||!("refresh_local"!=a&&"local_pwchange"!=a)){var c=lpnp_xml_msg(a,b);lp_ws&&lp_ws.isconnected()&&!have_nplastpass()&&!have_native_messaging()?lp_ws.send(c):g_np_init&&have_binary_function("SendNamedPipeMessageToAll")&&(lpdbg("namedpipes","broadcasting "+c),call_binary_function("SendNamedPipeMessageToAll",c))}}function lpnp_xml_msg(a,b){var c="<"+a,g;if("undefined"!=typeof b)for(g in b)c+=" "+g+'="'+lpxmlescape(b[g])+'"';return c+"/>"}
function lpnp_send_internal_logincheck_ack(){lploggedin&&getuuid(function(a){var b=[];b.data0=lp_phpsessid;b.data1=g_username;b.data2=g_identity;have_binary()||(b.data3=a,b.data4=lpCreateKeyFileData(),b.data5=get_key_iterations(g_username));lpnp_notify("internal_logincheck_ack",b)})}
function process_ipc_msg(a,b){try{var c="",g=a.match(/^<([^ \/]+)/);if(g){if(c=g[1],"websocket"==b&&"launch"!=c&&(have_nplastpass()||have_native_messaging()))return}else if("{"==a[0]){try{native_messaging_message(LPJSON.parse(a),null,!0)}catch(u){}return}if(!LPISLOC||!("refresh_local"!=c&&"local_pwchange"!=c))switch(lpdbg("namedpipes","received cmd="+c+" data="+a),c){case "pipeinitdone":call_binary_function("NamedPipeNumClients",function(a){if(1<a){var b=[];setTimeout(function(){lpnp_notify("internal_logincheck",
b)},g_is_win?0:1E3);setTimeout(function(){lp_StartLogin()},g_is_win?2E3:3E3)}else lp_StartLogin()});break;case "logout":console_log("LOGGING OFF : namedpipes : logoff");lplogoff(!0,"namedpipes1");break;case "login":var q=a.match(/data0=\"([^\"]*)\"/),e=a.match(/data1=\"([^\"]*)\"/);if(q&&e){var d=lpxmlunescape(q[1]),r=lpxmlunescape(e[1]);""!=d&&""!=r&&LP_do_login(d,r)}break;case "refresh":refresh_windows();break;case "switchidentity":if(e=a.match(/data0=\"([^\"]*)\"/)){var t=lpxmlunescape(e[1]);switch_identity(t,
!0,!1,!0)}break;case "launch":var e=a.match(/id=\"([^\"]*)\"/),p=a.match(/existing=\"([^\"]*)\"/);if(e){var h=lpxmlunescape(e[1]),f=[];f.data0=h;lpnp_notify("launchok",f);p?fillaid(h):(launch(h),browser_focus())}break;case "internal_logincheck":lpnp_send_internal_logincheck_ack();break;case "internal_logincheck_ack":var f=a.match(/data0=\"([^\"]*)\"/),d=a.match(/data1=\"([^\"]*)\"/),j=a.match(/data2=\"([^\"]*)\"/),k=a.match(/data3=\"([^\"]*)\"/),l=a.match(/data4=\"([^\"]*)\"/),m=a.match(/data5=\"([^\"]*)\"/);
if(!lploggedin&&f&&d)set_default_login_username(lpxmlunescape(d[1])),p=g_username_hash,h=g_username,g_username=lpusername=lpxmlunescape(d[1]),g_username_hash=SHA256(lpxmlunescape(d[1])),g_identity=""+(j?lpxmlunescape(j[1]):""),lpPutUserPref("identity",j?lpxmlunescape(j[1]):""),null!=h&&(g_username=lpusername=h,g_username_hash=lpusername_hash=p),lpWriteAllPrefs(),lp_phpsessid=lpxmlunescape(f[1]),rsa_setpendingsharests(),have_binary()||(k&&(1<k.length&&k[1].length)&&localStorage_setItem(db_prepend("lp.uid"),
lpxmlunescape(k[1])),l&&(1<l.length&&l[1].length)&&lpSaveData(lpxmlunescape(l[1]),"key"),m&&(1<m.length&&m[1].length)&&localStorage_setItem(g_username_hash+"_key_iter",m[1])),have_binary_function("read_file")?call_binary_function("read_file",db_prepend(SHA256(lpxmlunescape(d[1]))+"_lpall.slps"),function(a){var b=function(a){if("string"==typeof a&&""!=a){var b=opendb();createDataTable(b);b&&b.transaction(function(b){b.executeSql("REPLACE INTO LastPassData (username_hash, type, data) VALUES (?, 'key', ?)",
[db_prepend(SHA256(lpxmlunescape(d[1]))),a],function(){lp_StartLogin(!0)},function(a,b){console_log(b)})})}};"string"!=typeof a||""==a?call_binary_function("read_file",db_prepend(SHA256(lpxmlunescape(d[1]))+"_lpall.lps"),function(a){"string"==typeof a&&""!=a&&protect_data(a,!0,null,function(a){call_binary_function("write_file",db_prepend(SHA256(lpxmlunescape(d[1]))+"_lpall.slps"),a);call_binary_function("delete_file",db_prepend(SHA256(lpxmlunescape(d[1]))+"_lpall.lps"))});b(a)}):unprotect_data(a,
!0,b)}):(g_loginstarted=!1,lp_StartLogin(!0,lp_phpsessid));else if(lploggedin&&(f&&d)&&(null!=lp_phpsessid&&""!=lp_phpsessid&&lp_phpsessid!=lpxmlunescape(f[1])||g_username!=lpxmlunescape(d[1])))console_log("LOGGING OFF : namedpipes : different username"),lplogoff(!1,"namedpipes2");break;case "refresh_local":var s=a.match(/data0=\"([^\"]*)\"/);s&&lpxmlunescape(s[1])==g_username_hash&&(console_log("named_pipes: refresh_local reparsing"),get_accts_local());break;case "local_pwchange":console_log("LOGGING OFF : namedpipes : local_pwchange");
lplogoff(!1,"namedpipes3");break;case "wscapabilities":var n=a.match(/functions=\"([^\"]*)\"/);n&&1<n.length&&(console_log("Got Capabilities Message: "+n[1]),g_ws_functions=n[1].split(","));break;default:lpdbg("namedpipes","received unknown message. data="+a)}}catch(v){}};
