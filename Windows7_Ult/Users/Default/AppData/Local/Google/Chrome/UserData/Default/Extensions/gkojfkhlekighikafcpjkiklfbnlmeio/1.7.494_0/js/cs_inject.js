// LICENSE_CODE ZON
'use strict'; /*jslint browser:true, es5:true, evil:true*/
(function(){
var chrome = window.chrome, firefox = window.self;

if (firefox && firefox.options && firefox.options.ff_debug_page &&
    location.href.startsWith(firefox.options.ff_debug_page))
{
    return;
}

function hola_ext_present(){
    document.documentElement.setAttribute('hola_ext_inject', 'inited'); }
hola_ext_present();

function inject_code(resp){
    if (resp.id!=='cs_inject')
        return;
    if (!chrome)
        firefox.port.removeListener('resp', inject_code);
    resp.data = resp.data||{};
    document.documentElement.setAttribute('hola_ext_inject',
        resp.data.code ? 'ready' : 'disabled');
    if (!resp.data.code)
        return;
    try { eval(resp.data.code); }
    catch(e){ return void console.log('eval error', e);  }
}

var msg = {id: 'cs_inject', location: location};
if (chrome)
    return chrome.extension.sendMessage(msg, inject_code);

function uninit(){
    firefox.port.removeListener('resp', inject_code);
    firefox.removeListener('detach', uninit);
    firefox.port.removeListener('detach', uninit);
}

firefox.port.on('resp', inject_code);
firefox.on('detach', uninit); // FF<30
firefox.port.on('detach', uninit); // FF>=30
firefox.port.emit('req', msg);

})();
