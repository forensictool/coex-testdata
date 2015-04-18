// LICENSE_CODE ZON
'use strict'; /*jshint node:true, browser:true*/
(function(){
var define;
var is_node = typeof module=='object' && module.exports;
if (!is_node)
    define = self.define;
else
    define = function(setup){ module.exports = setup(); };
define(function(){
var E = {};

// XXX arik: sync: util/user_agent.js <-> system/www/pub/play_loader.js
/* XXX mikhail: unify with OS version parsing from hola_service */
var win_versions = {
    '6.3': '8.1',
    '6.2': '8',
    '6.1': '7',
    '6.0': 'vista',
    '5.2': '2003',
    '5.1': 'xp',
    '5.0': '2000'
};

var arch_mapping = {
    'x86_64': '64',
    'i686': '32',
    'arm': 'arm'
};

var check_hola = /\bhola_android\b/i;
var check_opera = /\bOPR\b\/(\d+)/i;
var check_xbox = /\bxbox\b/i;

E.guess_browser = function(ua){
    var res;
    ua = ua || (!is_node ? self.navigator.userAgent : '');
    if ((res = /[( ]MSIE ([6789]|10).\d[);]/.exec(ua)))
	return {browser: 'ie', version: res[1], xbox: check_xbox.test(ua)};
    if ((res = /[( ]Trident\/\d+(\.\d)+.*rv:(\d\d)(\.\d)+[);]/.exec(ua)))
	return {browser: 'ie', version: res[2], xbox: check_xbox.test(ua)};
    if ((res = / Chrome\/(\d+)(\.\d+)+.* Safari\/\d+(\.\d+)+/.exec(ua)))
    {
        var opera = check_opera.exec(ua);
	return {browser: 'chrome', version: res[1],
	    android: ua.match(/Android/),
	    webview: ua.match(/ Version\/(\d+)(\.\d)/),
	    hola_android: check_hola.test(ua),
	    opera: opera && !!opera[1],
	    opera_version: opera ? opera[1] : undefined};
    }
    if ((res = / Version\/(\d+)(\.\d)+.* Safari\/\d+.\d+/.exec(ua)))
    {
	if (ua.match(/Android/))
	    return {browser: 'chrome', version: res[1], android: true,
	        webview: true, hola_android: check_hola.test(ua)};
	return {browser: 'safari', version: res[1]};
    }
    if ((res = / (Firefox|PaleMoon)\/(\d+).\d/.exec(ua)))
    {
	return {browser: 'firefox', version: res[2],
            palemoon: res[1]=='PaleMoon'};
    }
    if (/Hola\/\d+\.\d+./.exec(ua))
        return {browser: 'safari', version: 'Hola'};
    return {};
};

E.guess = function(ua){
    var res;
    ua = ua || (!is_node ? self.navigator.userAgent : '');
    if ((res = /Windows(?: NT(?: (.*?))?)?[);]/.exec(ua)))
    {
        return {os: 'windows', version: win_versions[res[1]],
            arch: ua.match(/WOW64|Win64|x64/) ? '64' : '32'};
    }
    if ((res = /Macintosh.*; (?:Intel|PPC) Mac OS X (\d+[._]\d+)/.exec(ua)))
        return {os: 'macos', version: res[1].replace('_', '.')};
    if (/Macintosh/.exec(ua))
        return {os: 'macos'};
    if ((res = /Android(?: (\d+\.\d+))?/.exec(ua)))
        return {os: 'android', version: res[1]};
    if ((res = /(Linux|CrOS|OpenBSD|FreeBSD)(?: (x86_64|i686|arm))?/.exec(ua)))
        return {os: res[1].toLowerCase(), arch: arch_mapping[res[2]]};
    if ((res = /(?:iPhone|iPad|iPod|iPod touch); iOS (\d+[.]\d+)/.exec(ua)))
        return {os: 'ios', version: res[1].replace('_', '.')};
    if (/iPhone|iPad|iPod/.exec(ua))
        return {os: 'ios'};
    if (/PLAYSTATION/.exec(ua))
        return {os: 'ps'};
    if (/Windows Phone/.exec(ua))
        return {os: 'winphone'};
    // HitLeap Viewer (whatever it is) is Windows-only
    if (/HitLeap Viewer/.exec(ua))
        return {os: 'windows'};
    return {};
};

return E; }); }());
