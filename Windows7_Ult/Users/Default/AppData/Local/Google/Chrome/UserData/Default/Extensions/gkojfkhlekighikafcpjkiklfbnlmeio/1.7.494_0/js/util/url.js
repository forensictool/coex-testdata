// LICENSE_CODE ZON
'use strict'; /*jslint node:true, browser:true*/
(function(){
var define, node_url;
var is_node = typeof module=='object' && module.exports;
if (!is_node)
    define = self.define;
else
{
    define = require('./require_node.js').define(module, '../');
    var qs = require('querystring');
}
define([], function(){
var E = {};

E.add_proto = function(url){
    if (!url.match(/^([a-z0-9]+:)?\/\//i))
	url = 'http://'+url;
    return url;
};

E.get_top_level_domain = function(host){
    var n = host.match(/\.([^.]+)$/);
    return n ? n[1] : '';
};

E.get_host = function(url){
    var n = url.match(/^(https?:)?\/\/([^\/]+)\/.*$/);
    return n ? n[2] : '';
};

E.get_path = function(url){
    var n = url.match(/^https?:\/\/[^\/]+(\/.*$)/);
    return n ? n[1] : '';
};

E.get_proto = function(url){
    var n = url.match(/^([a-z0-9]+):\/\//);
    return n ? n[1] : '';
};

E.get_host_gently = function(url){
    var n = url.match(/^(?:(?:[a-z0-9]+?:)?\/\/)?([^\/]+)/);
    return n ? n[1] : '';
};

E.is_ip = function(host){
    return !!host.match(/^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/); };

E.is_ip_port = function(host){
    return !!host.match(
	/^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}(:[0-9]{1,5})?$/);
};

/* basic url validation to prevent script injection like 'javascript:....' */
E.is_valid_url = function(url){
    return /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z0-9-]+(\/.*)?$/i.test(url); };

E.is_valid_domain = function(domain){
    return /^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6}$/.test(domain); };

E.is_hola_domain = function(domain){
    return domain.search(/^(.*\.)?hola.org$/)!=-1; };

E.is_valid_email = function(email){
    var n = email.toLowerCase().match(/^[a-z0-9_\.\-]+@(.*)$/);
    return !!(n && E.is_valid_domain(n[1]));
};

E.host_lookup = function(lookup, host){
    var pos;
    while (1)
    {
        if (host in lookup)
            return lookup[host];
        if ((pos = host.indexOf('.'))<0)
            return;
        host = host.slice(pos+1);
    }
};

// regexp from purl 2.3.1
var key = ['orig', 'protocol', 'slashes',
    'authority', 'auth', 'user', 'password',
    'hostname', 'port', 'relative', 'pathname', 'directory', 'file',
    'search', 'hash'];
var parser = {
    //less intuitive, more accurate to the specs
    strict: /^(?:([^:\/?#]+):)?(?:(\/\/)((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
    // more intuitive, fails on relative paths and deviates from specs
    loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
};

// more-or-less compatible with NodeJS url API
E.uri_obj_href = function(uri){
    return (uri.protocol||'')+(uri.slashes ? '//' : '')
        +(uri.host ? (uri.auth ? uri.auth+'@' : '')+uri.host : '')
        +uri.path
        +(uri.hash||'');
};
E.parse = function(url, strict){
    if (url==null)
        url = window.location.toString();
    var res;
    // Firefox 29 had a bug that caused an invalid internal exception on
    // some complex regex matchings, earlier and later versions just fail
    // and return null
    try { res = parser[strict ? 'strict' : 'loose'].exec(url); }
    catch(err){ res = null; }
    var uri = {}, i;
    if (!res)
        return uri;
    for (i=0; i<key.length; i++)
        uri[key[i]] = res[i]===undefined ? null : res[i];
    uri.slashes = !!uri.slashes;
    uri.query = uri.search;
    if (uri.search!==null)
        uri.search = '?'+uri.search;
    if (uri.hash!==null)
        uri.hash = '#'+uri.hash;
    if (uri.protocol!==null)
        uri.protocol = uri.protocol.toLowerCase()+':';
    if (!uri.protocol && !uri.slashes)
    {
        uri.protocol = 'http:';
        uri.slashes = true;
    }
    if (!uri.pathname)
        uri.pathname = '/';
    if (uri.hostname!==null)
    {
        uri.hostname = uri.hostname.toLowerCase();
        uri.host = uri.hostname+(uri.port ? ':'+uri.port : '');
    }
    uri.path = uri.pathname+(uri.search||'');
    uri.href = E.uri_obj_href(uri);
    return uri;
};

E.qs_parse = function(q, bin){
    var obj = {};
    q = q.split('&');
    var len = q.length;
    var unescape_val = bin ? function(val){
        return qs.unescapeBuffer(val, true).toString('binary');
    } : function(val){
        return decodeURIComponent(val.replace(/\+/g, ' '));
    };
    for (var i = 0; i < len; ++i)
    {
	var x = q[i];
	var idx = x.indexOf('=');
	var kstr = idx >= 0 ? x.substr(0, idx) : x;
	var vstr = idx >= 0 ? x.substr(idx + 1): '';
        var k = unescape_val(kstr);
        var v = unescape_val(vstr);
	if (obj[k]===undefined)
	    obj[k] = v;
	else if (Array.isArray(obj[k]))
	    obj[k].push(v);
	else
	    obj[k] = [obj[k], v];
    }
    return obj;
};

function token_regex(s, end){ return end ? '^'+s+'$' : s; }

E.http_glob_host = function(host, end){
    var n = host.match(/^(|.*[^*])(\*+)$/);
    if (n)
    {
	host = E.http_glob_host(n[1])
	+(n[2].length==1 ? '[^./]+' : '[^/]'+(n[1] ? '*' : '+'));
	return token_regex(host, end);
    }
    /* '**' replace doesn't use '*' in output to avoid conflict with '*'
     * replace following it */
    host = host.replace(/\*\*\./, '**').replace(/\*\./, '*')
    .replace(/\./g, '\\.').replace(/\*\*/g, '(([^./]+\\.)+)?')
    .replace(/\*/g, '[^./]+\\.');
    return token_regex(host, end);
};

E.http_glob_path = function(path, end){
    if (path[0]=='*')
	return E.http_glob_path('/'+path, end);
    var n = path.match(/^(|.*[^*])(\*+)([^*^\/]*)$/);
    if (n)
    {
	path = E.http_glob_path(n[1])+(n[2].length==1 ? '[^/]+' : '.*')+
	    E.http_glob_path(n[3]);
	return token_regex(path, end);
    }
    path = path.replace(/\*\*\//, '**').replace(/\*\//, '*')
    .replace(/\//g, '\\/').replace(/\./g, '\\.')
    .replace(/\*\*/g, '(([^/]+\\/)+)?').replace(/\*/g, '[^/]+\\/');
    return token_regex(path, end);
};

E.http_glob_url = function(url, end){
    var n = url.match(/^((.*):\/\/)?([^\/]+)(\/.*)?$/);
    if (!n)
	return null;
    var prot = n[1] ? n[2] : '*';
    var host = n[3];
    var path = n[4]||'**';
    if (prot=='*')
	prot = 'https?';
    host = E.http_glob_host(host);
    path = E.http_glob_path(path);
    return token_regex(prot+':\\/\\/'+host+path, end);
};

E.root_url_cmp = function(a, b){
    var a_s = a.match(/^[*.]*([^*]+)$/);
    var b_s = b.match(/^[*.]*([^*]+)$/);
    if (!a_s && !b_s)
	return false;
    var re, s;
    if ((a_s && b_s && a_s[1].length>b_s[1].length) || (a_s && !b_s))
    {
	s = a_s[1];
	re = b;
    }
    else
    {
	s = b_s[1];
	re = a;
    }
    s = E.add_proto(s)+'/';
    if (!(re = E.http_glob_url(re, 1)))
	return false;
    try { re = new RegExp(re); }
    catch(e){ return false; }
    return re.test(s);
};

return E; }); }());
