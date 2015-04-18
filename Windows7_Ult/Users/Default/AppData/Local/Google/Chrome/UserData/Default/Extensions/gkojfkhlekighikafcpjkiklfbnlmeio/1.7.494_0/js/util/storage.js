// LICENSE_CODE ZON
'use strict'; /*jshint browser:true, es5:true*/
define([], function(){
var E = {};

E.set = function(key, val){
    try { localStorage.setItem(key, val); }
    catch(err){ E.on_err('storage_set', key, err); }
};

E.get = function(key){
    try { return localStorage.getItem(key); }
    catch(err){ E.on_err('storage_get', key, err); }
};

E.get_int = function(key){ return +E.get(key)||0; };

E.clr = function(key){
    try { localStorage.removeItem(key); }
    catch(err){ E.on_err('storage_clr', key, err); }
};

E.set_json = function(key, val){
    return E.set(key, JSON.stringify(val||null)); };

E.get_json = function(key){
    var val = E.get(key);
    if (!val)
	return val;
    return JSON.parse(val);
};

// The try block is necessary since any referecne to localStorage in Chrome
// throws an exception
try { E.sync_supported = !!window.localStorage;
} catch(e){ E.sync_supported = false; }

return E; });
