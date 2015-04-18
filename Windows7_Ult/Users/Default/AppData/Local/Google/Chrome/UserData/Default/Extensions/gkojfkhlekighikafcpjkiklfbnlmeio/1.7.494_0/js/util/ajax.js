// LICENSE_CODE ZON
'use strict'; /*jshint browser:true, es5:true*/
define(['jquery', 'underscore', '/util/etask.js', '/util/date.js',
    '/util/escape.js', '/util/storage.js', '/util/zerr.js'],
    function($, _, etask, date, zescape, storage, zerr){
var E;

function ajax(timeout, url, data, retry){
    return E.ajax_opt({timeout: timeout, url: url, data: data, retry: retry});
}
E = ajax;

// XXX arik: need test
E.json_opt = function(opt){
    var timeout = opt.timeout||20*date.ms.SEC, slow = opt.slow||2*date.ms.SEC;
    var retry = opt.retry, data = opt.data, qs = zescape.qs(opt.qs);
    var url = zescape.uri(opt.url, qs), perr = opt.perr;
    var type = opt.type||'POST';
    var t0 = Date.now();
    var xhr;
    zerr.debug('json url '+url+' retry '+retry);
    return etask([function(){
        var ajopt = {dataType: 'json', type: type, url: url,
	    data: data, timeout: timeout};
        if (opt.with_credentials)
            ajopt.xhrFields = {withCredentials: true};
	return xhr = $.ajax(ajopt);
    }, function catch$(err){
	zerr('json failed url '+url+' data '+
	    zerr.json(data).substr(0, 200)+' status: '+xhr.status+' '+
	    xhr.statusText+'\nresponseText: '+
            (xhr.responseText||'').substr(0, 200));
	if (retry)
	{
	    var _opt = _.clone(opt);
	    _opt.retry = retry-1;
	    return this.ereturn(E.json_opt(_opt));
	}
        // XXX amir: app can't support sync storage set
	if (xhr.statusText=='timeout' && storage.sync_supported)
	    storage.set('ajax_timeout', storage.get_int('ajax_timeout')+1);
        if (opt.no_throw)
	    return {error: xhr.statusText||'no_status'};
	throw new Error(xhr.statusText);
    }, function(data){
	var t = Date.now()-t0;
	zerr[t>slow ? 'err' : 'debug'](
	    'json '+(t>slow ? 'SLOW ' : 'ok ')+t+'ms url '+url);
	if (t>slow && perr)
	    perr({id: 'be_json_slow', info: t+'ms '+url});
        if (E.do_op)
            E.do_op(data&&data.do_op);
	return this.ereturn(data);
    }]);
};

E.json = function(timeout, url, data, retry){
    return E.json_opt({timeout: timeout, url: url, data: data, retry: retry});
};

E.ajax_opt = function(opt){
    var timeout = opt.timeout||20*date.ms.SEC, slow = opt.slow||2*date.ms.SEC;
    var retry = opt.retry, data = opt.data, qs = zescape.qs(opt.qs);
    var url = zescape.uri(opt.url, qs);
    var type = opt.type||'POST';
    var t0 = Date.now();
    var xhr;
    zerr.debug('ajax url '+url+' retry '+retry);
    return etask([function(){
	return xhr = $.ajax({dataType: 'text', type: type, url: url,
	    data: data, timeout: timeout});
    }, function catch$(err){
	zerr('ajax failed url '+url+' data '+zerr.json(data)
	    +' status '+xhr.status+' '+xhr.statusText);
	if (retry)
	{
	    var _opt = _.clone(opt);
	    _opt.retry = retry-1;
	    return this.ereturn(E.ajax_opt(_opt));
	}
        // XXX amir: app can't support sync storage set
	if (xhr.statusText=='timeout' && storage.sync_supported)
	    storage.set('ajax_timeout', storage.get_int('ajax_timeout')+1);
	throw new Error(xhr.statusText);
    }, function(res){
	if (opt.no_retval)
	    return this.ereturn(res);
	var retval = +res.split(' ')[0], _res = res.substr(res.indexOf(' ')+1);
	if ((isNaN(retval) || retval))
	{
	    zerr('ajax failed retval '+retval+' url: '+url
		+' data: '+zerr.json(data).substr(0, 200)+' res: '+res);
	    throw new Error('ajax onfail');
	}
	var t = Date.now()-t0;
	zerr[t>slow ? 'err' : 'debug'](
	    'ajax '+(t>slow ? 'SLOW ' : 'ok ')+t+'ms url '+url);
        return this.ereturn({res: _res});
    }]);
};

return E; });
