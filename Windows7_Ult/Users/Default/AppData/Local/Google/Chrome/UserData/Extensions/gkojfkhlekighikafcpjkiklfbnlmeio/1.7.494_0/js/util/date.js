// LICENSE_CODE ZON
'use strict'; /*jslint node:true, browser:true*/
(function(){
var define;
var is_node = typeof module=='object' && module.exports;
if (!is_node)
    define = self.define;
else
    define = require('./require_node.js').define(module, '../');
define([], function(){
var E = date_get;

function pad(num, size){ return ('000'+num).slice(-size); }

E.ms_to_dur = function(ms){
    var s = '';
    var sec = Math.floor(ms/1000);
    if (sec<0)
    {
	s += '-';
	sec = -sec;
    }
    var days = Math.floor(sec/(60*60*24));
    sec -= days*60*60*24;
    var hours = Math.floor(sec/(60*60));
    sec -= hours*60*60;
    var mins = Math.floor(sec/60);
    sec -= mins*60;
    if (days)
	s += days + ' ' + (days>1 ? 'Days' : 'Day') + ' ';
    return s+pad(hours, 2)+':'+pad(mins, 2)+':'+pad(sec, 2);
};

E.months_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
    'Sep', 'Oct', 'Nov', 'Dec'];
var months_short_lc = E.months_short.map(function(m){
    return m.toLowerCase(); });
E.get = date_get;
function date_get(d, _new){
    var y, mon, day, H, M, S, ms;
    if (d===undefined)
	return new Date();
    if (d instanceof Date)
	return _new ? new Date(d) : d;
    if (typeof d==='string')
    {
	var m;
	// check for ISO/SQL/JDate date
	if ((m = /^\s*((\d\d\d\d)-(\d\d)-(\d\d)|(\d\d?)-([A-Za-z]{3})-(\d\d(\d\d)?))\s*([\sT](\d\d):(\d\d)(:(\d\d)(\.(\d\d\d))?)?Z?)?\s*$/
	    .exec(d)))
	{
            H = +m[10]||0; M = +m[11]||0; S = +m[13]||0; ms = +m[15]||0;
            if (m[2]) // SQL or ISO date
            {
                y = +m[2]; mon = +m[3]; day = +m[4];
                if (!y && !mon && !day && !H && !M && !S && !ms)
                    return new Date(NaN);
                return new Date(Date.UTC(y, mon-1, day, H, M, S, ms));
            }
            if (m[5]) // jdate
            {
                y = +m[7];
                mon = months_short_lc.indexOf(m[6].toLowerCase())+1;
                day = +m[5];
                if (m[7].length==2)
                {
                    y = +y;
                    y += y>=70 ? 1900 : 2000;
                }
                return new Date(Date.UTC(y, mon-1, day, H, M, S, ms));
            }
            // cannot reach here
        }
        // else might be parsed as non UTC!
        return new Date(d);
    }
    if (typeof d==='number')
	return new Date(d);
    throw new TypeError();
}

E.to_sql_ms = function(d){
    d = E.get(d);
    if (isNaN(d))
        return '0000-00-00 00:00:00.000';
    return pad(d.getUTCFullYear(), 4)+'-'+pad(d.getUTCMonth()+1, 2)
    +'-'+pad(d.getUTCDate(), 2)
    +' '+pad(d.getUTCHours(), 2)+':'+pad(d.getUTCMinutes(), 2)
    +':'+pad(d.getUTCSeconds(), 2)
    +'.'+pad(d.getUTCMilliseconds(), 3);
};

E.to_sql = function(d){
    return E.to_sql_ms(d).replace(/( 00:00:00)?....$/, ''); };
E.from_sql = E.get;

E.to_month_short = function(d){
    d = E.get(d);
    return E.months_short[d.getUTCMonth()];
};
// timestamp format (used by tickets, etc). dates before 2000 not supported
E.to_jdate = function(d){
    d = E.get(d);
    return (pad(d.getUTCDate(), 2)+'-'+E.months_short[d.getUTCMonth()]
	+'-'+pad(d.getUTCFullYear()%100, 2)+' '+pad(d.getUTCHours(), 2)+
	':'+pad(d.getUTCMinutes(), 2)+':'+pad(d.getUTCSeconds(), 2))
    .replace(/( 00:00)?:00$/, '');
};
// used in log file names
E.to_log_file = function(d){
    d = E.get(d);
    return d.getUTCFullYear()+pad(d.getUTCMonth()+1, 2)+pad(d.getUTCDate(), 2)
    +'_'+pad(d.getUTCHours(), 2)+pad(d.getUTCMinutes(), 2)
    +pad(d.getUTCSeconds(), 2);
};
// zerr compatible timestamp format
E.to_log_ms = function(d){ return E.to_sql_ms(d).replace(/-/g, '.'); };

E.sec = {
    MS: 0.001,
    SEC: 1,
    MIN: 60,
    HOUR: 60*60,
    DAY: 24*60*60,
    WEEK: 7*24*60*60,
    MONTH: 30*24*60*60,
    YEAR: 365*24*60*60
};
E.ms = {};
for (var key in E.sec)
    E.ms[key] = E.sec[key]*1000;

E.align = function(d, align){
    d = E.get(d, 1);
    switch (align.toUpperCase())
    {
    case 'MS': break;
    case 'SEC': d.setUTCMilliseconds(0); break;
    case 'MIN': d.setUTCSeconds(0, 0); break;
    case 'HOUR': d.setUTCMinutes(0, 0, 0); break;
    case 'DAY': d.setUTCHours(0, 0, 0, 0); break;
    case 'MONTH': d.setUTCDate(1); d.setUTCHours(0, 0, 0, 0); break;
    case 'YEAR': d.setUTCMonth(0, 1); d.setUTCHours(0, 0, 0, 0); break;
    default: throw new Error('invalid align '+align);
    }
    return d;
};

E.add = function(d, duration){
    d = E.get(d, 1);
    if (duration.year)
        d.setUTCFullYear(d.getUTCFullYear()+duration.year);
    if (duration.month)
        d.setUTCMonth(d.getUTCMonth()+duration.month);
    ['day', 'hour', 'min', 'sec', 'ms'].forEach(function(key){
        if (duration[key])
            d.setTime(d.getTime()+duration[key]*E.ms[key.toUpperCase()]);
    });
    return d;
};

E.time_ago = function(d){
    var ms = Date.now()-E.get(d);
    if (ms < 2*E.ms.SEC)
        return 'right now';
    if (ms < 2*E.ms.MIN)
        return Math.round(ms/E.ms.SEC)+' sec ago';
    if (ms < 2*E.ms.HOUR)
        return Math.round(ms/E.ms.MIN)+' min ago';
    if (ms < 2*E.ms.DAY)
        return Math.round(ms/E.ms.HOUR)+' hour ago';
    if (ms < 2*E.ms.WEEK)
        return Math.round(ms/E.ms.DAY)+' days ago';
    if (ms < 2*E.ms.MONTH)
        return Math.round(ms/E.ms.WEEK)+' weeks ago';
    if (ms < 2*E.ms.YEAR)
        return Math.round(ms/E.ms.MONTH)+' month ago';
    return Math.round(ms/E.ms.YEAR)+' years ago';
};

E.ms_to_str = function(ms){
    var s = ''+ms;
    return s.length<=3 ? s+'ms' : s.slice(0, -3)+'.'+s.slice(-3)+'s';
};
return E; }); }());
