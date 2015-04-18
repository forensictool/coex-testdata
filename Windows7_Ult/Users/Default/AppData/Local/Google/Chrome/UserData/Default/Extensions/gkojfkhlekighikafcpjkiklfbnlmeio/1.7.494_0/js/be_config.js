// LICENSE_CODE ZON
'use strict'; /*jshint browser:true, es5:true*/
define([window.hola && window.hola.no_be_ver ? null : 'be_ver'],
    function(be_ver){
var chrome = window.chrome;
if (!window.conf || !window.zon_config)
{
    // XXX bahaa BACKWARD: old chrome versions
    var BG = chrome.extension.getBackgroundPage();
    window.conf = window.conf||BG.conf;
    window.zon_config = window.zon_config||BG.zon_config||BG;
}
var conf = window.conf, zconf = window.zon_config;
conf.url_perr = conf.url_perr||'https://perr.hola.org/client_cgi';
var is_local = require_is_local();
var E = {modules: {be_ver: {name: 'be_ver'}, be_config: {name: 'be_config'}}};

function require_is_local(){
    return !window.require_is_remote && is_local_url(location.href); }

function is_local_url(url){
    return /^(chrome-extension|resource|file):\/\//.test(url); }

function extend(a, b){
    for (var prop in b)
	a[prop] = b[prop];
}

function get_paths(cdn, base_url, ver, alt_cdn){
    function c(){ return arguments[alt_cdn]; }
    // XXX romank: for FF we cannot place files in root directory
    // for chrome changing this path will break injections on old version
    // since we inject local file (js/jquery.min) from remote script
    // (be_iframe), need version comparasion
    var l = !chrome ? '/hola_firefox_ext/data' : '/js';
    var p = is_local ? {
	jquery: 'jquery.min',
        jquery_cookie: 'jquery.cookie.min',
	spin: 'spin.min',
	purl: 'purl',
	underscore: 'underscore.min',
	backbone: 'backbone.min',
	bootstrap: 'bootstrap',
	typeahead: 'typeahead',
        // XXX romank: baseUrl ignored for absolute path
        events: l+'/util/events',
        '/util/array.js': l+'/util/array.js',
        '/util/util.js': l+'/util/util.js',
        '/util/etask.js': l+'/util/etask.js',
        '/util/date.js': l+'/util/date.js',
        '/util/zerr.js': l+'/util/zerr.js',
        '/util/version_util.js': l+'/util/version_util.js',
        '/util/escape.js': l+'/util/escape.js',
        '/util/conv.js': l+'/util/conv.js',
        '/util/match.js': l+'/util/match.js',
        '/util/ajax.js': l+'/util/ajax.js',
        '/util/storage.js': l+'/util/storage.js',
        '/util/user_agent.js': l+'/util/user_agent.js',
        '/util/string.js': l+'/util/string.js',
        '/util/strftime.js': l+'/util/strftime.js',
        '/util/zdot.js': l+'/util/zdot.js',
        '/util/sprintf.js': l+'/util/sprintf.js',
        '/util/url.js': l+'/util/url.js',
        '/util/attrib.js': l+'/util/attrib.js',
        '/util/sample.js': l+'/util/sample.js',
        '/util/rate_limit.js': l+'/util/rate_limit.js',
        '/util/rand.js': l+'/util/rand.js',
        '/util/hash.js': l+'/util/hash.js',
        '/util/browser.js': l+'/util/browser.js',
        '/util/jquery_ajax_ie.js': l+'/util/jquery_ajax_ie.js',
        '/util/jquery_ajax_binary.js': l+'/util/jquery_ajax_binary.js',
        '/util/zquery.js': l+'/util/zquery.js',
        '/util/es6_shim.js': l+'/util/es6_shim.js',
        '/util/bio.js': l+'/util/bio.js',
        '/util/arrbuf.js': l+'/util/arrbuf.js',
        '/svc/util.js': l+'/svc/util.js',
        '/svc/pub/be_about_main.js': l+'/svc/pub/be_about_main.js',
        '/svc/pub/be_backbone.js': l+'/svc/pub/be_backbone.js',
        '/svc/pub/be_bg_main.js': l+'/svc/pub/be_bg_main.js',
        '/svc/pub/be_browser.js': l+'/svc/pub/be_browser.js',
        '/svc/pub/be_chrome.js': l+'/svc/pub/be_chrome.js',
        '/svc/pub/be_lib.js': l+'/svc/pub/be_lib.js',
        '/svc/pub/be_locale.js': l+'/svc/pub/be_locale.js',
        '/svc/pub/be_msg.js': l+'/svc/pub/be_msg.js',
        '/svc/pub/be_popup_main.js': l+'/svc/pub/be_popup_main.js',
        '/svc/pub/be_popup_lib.js': l+'/svc/pub/be_popup_lib.js',
        '/svc/pub/be_transport.js': l+'/svc/pub/be_transport.js',
        '/svc/pub/be_ui_obj.js': l+'/svc/pub/be_ui_obj.js',
        '/svc/pub/be_user_nav.js': l+'/svc/pub/be_user_nav.js',
        '/svc/pub/be_util.js': l+'/svc/pub/be_util.js',
        '/svc/pub/cs_inject.js': l+'/svc/pub/cs_inject.js',
        '/svc/pub/be_ui_popup.js': l+'/svc/pub/be_ui_popup.js',
        '/svc/pub/locale/be_af.js': l+'/svc/pub/locale/be_af.js',
        '/svc/pub/locale/be_ar.js': l+'/svc/pub/locale/be_ar.js',
        '/svc/pub/locale/be_az.js': l+'/svc/pub/locale/be_az.js',
        '/svc/pub/locale/be_be.js': l+'/svc/pub/locale/be_be.js',
        '/svc/pub/locale/be_bg.js': l+'/svc/pub/locale/be_bg.js',
        '/svc/pub/locale/be_bn.js': l+'/svc/pub/locale/be_bn.js',
        '/svc/pub/locale/be_bs.js': l+'/svc/pub/locale/be_bs.js',
        '/svc/pub/locale/be_ca.js': l+'/svc/pub/locale/be_ca.js',
        '/svc/pub/locale/be_cs.js': l+'/svc/pub/locale/be_cs.js',
        '/svc/pub/locale/be_cy.js': l+'/svc/pub/locale/be_cy.js',
        '/svc/pub/locale/be_da.js': l+'/svc/pub/locale/be_da.js',
        '/svc/pub/locale/be_de.js': l+'/svc/pub/locale/be_de.js',
        '/svc/pub/locale/be_el.js': l+'/svc/pub/locale/be_el.js',
        '/svc/pub/locale/be_en.js': l+'/svc/pub/locale/be_en.js',
        '/svc/pub/locale/be_es.js': l+'/svc/pub/locale/be_es.js',
        '/svc/pub/locale/be_et.js': l+'/svc/pub/locale/be_et.js',
        '/svc/pub/locale/be_eu.js': l+'/svc/pub/locale/be_eu.js',
        '/svc/pub/locale/be_fa.js': l+'/svc/pub/locale/be_fa.js',
        '/svc/pub/locale/be_fi.js': l+'/svc/pub/locale/be_fi.js',
        '/svc/pub/locale/be_fr.js': l+'/svc/pub/locale/be_fr.js',
        '/svc/pub/locale/be_ga.js': l+'/svc/pub/locale/be_ga.js',
        '/svc/pub/locale/be_gl.js': l+'/svc/pub/locale/be_gl.js',
        '/svc/pub/locale/be_gu.js': l+'/svc/pub/locale/be_gu.js',
        '/svc/pub/locale/be_he.js': l+'/svc/pub/locale/be_he.js',
        '/svc/pub/locale/be_hi.js': l+'/svc/pub/locale/be_hi.js',
        '/svc/pub/locale/be_hr.js': l+'/svc/pub/locale/be_hr.js',
        '/svc/pub/locale/be_ht.js': l+'/svc/pub/locale/be_ht.js',
        '/svc/pub/locale/be_hu.js': l+'/svc/pub/locale/be_hu.js',
        '/svc/pub/locale/be_hy.js': l+'/svc/pub/locale/be_hy.js',
        '/svc/pub/locale/be_id.js': l+'/svc/pub/locale/be_id.js',
        '/svc/pub/locale/be_is.js': l+'/svc/pub/locale/be_is.js',
        '/svc/pub/locale/be_it.js': l+'/svc/pub/locale/be_it.js',
        '/svc/pub/locale/be_ja.js': l+'/svc/pub/locale/be_ja.js',
        '/svc/pub/locale/be_ka.js': l+'/svc/pub/locale/be_ka.js',
        '/svc/pub/locale/be_km.js': l+'/svc/pub/locale/be_km.js',
        '/svc/pub/locale/be_kn.js': l+'/svc/pub/locale/be_kn.js',
        '/svc/pub/locale/be_ko.js': l+'/svc/pub/locale/be_ko.js',
        '/svc/pub/locale/be_lt.js': l+'/svc/pub/locale/be_lt.js',
        '/svc/pub/locale/be_lv.js': l+'/svc/pub/locale/be_lv.js',
        '/svc/pub/locale/be_mk.js': l+'/svc/pub/locale/be_mk.js',
        '/svc/pub/locale/be_mr.js': l+'/svc/pub/locale/be_mr.js',
        '/svc/pub/locale/be_ms.js': l+'/svc/pub/locale/be_ms.js',
        '/svc/pub/locale/be_mt.js': l+'/svc/pub/locale/be_mt.js',
        '/svc/pub/locale/be_nl.js': l+'/svc/pub/locale/be_nl.js',
        '/svc/pub/locale/be_no.js': l+'/svc/pub/locale/be_no.js',
        '/svc/pub/locale/be_pl.js': l+'/svc/pub/locale/be_pl.js',
        '/svc/pub/locale/be_pt_BR.js': l+'/svc/pub/locale/be_pt_BR.js',
        '/svc/pub/locale/be_pt.js': l+'/svc/pub/locale/be_pt.js',
        '/svc/pub/locale/be_ro.js': l+'/svc/pub/locale/be_ro.js',
        '/svc/pub/locale/be_ru.js': l+'/svc/pub/locale/be_ru.js',
        '/svc/pub/locale/be_sk.js': l+'/svc/pub/locale/be_sk.js',
        '/svc/pub/locale/be_sl.js': l+'/svc/pub/locale/be_sl.js',
        '/svc/pub/locale/be_sq.js': l+'/svc/pub/locale/be_sq.js',
        '/svc/pub/locale/be_sr.js': l+'/svc/pub/locale/be_sr.js',
        '/svc/pub/locale/be_sv.js': l+'/svc/pub/locale/be_sv.js',
        '/svc/pub/locale/be_sw.js': l+'/svc/pub/locale/be_sw.js',
        '/svc/pub/locale/be_ta.js': l+'/svc/pub/locale/be_ta.js',
        '/svc/pub/locale/be_te.js': l+'/svc/pub/locale/be_te.js',
        '/svc/pub/locale/be_th.js': l+'/svc/pub/locale/be_th.js',
        '/svc/pub/locale/be_tl.js': l+'/svc/pub/locale/be_tl.js',
        '/svc/pub/locale/be_tr.js': l+'/svc/pub/locale/be_tr.js',
        '/svc/pub/locale/be_uk.js': l+'/svc/pub/locale/be_uk.js',
        '/svc/pub/locale/be_ur.js': l+'/svc/pub/locale/be_ur.js',
        '/svc/pub/locale/be_vi.js': l+'/svc/pub/locale/be_vi.js',
        '/svc/pub/locale/be_zh_CN.js': l+'/svc/pub/locale/be_zh_CN.js',
        '/svc/pub/locale/be_zh_TW.js': l+'/svc/pub/locale/be_zh_TW.js',
        // XXX romank: entry points/injections, check later
        '/svc/pub/be_popup.js': l+'/be_popup.js',
        '/svc/pub/be_bg.js': l+'/be_bg.js',
        '/svc/pub/cs_hola.js': l+'/cs_hola.js',
    } : {
	jquery: c(cdn+'/jquery/1.11.1/jquery.min',
	    cdn+'{[MD5 /jquery.min.js]}'),
	jquery_cookie: c(cdn+'/jquery-cookie/1.4.0/jquery.cookie.min',
	    cdn+'{[MD5 /jquery.cookie.min.js]}'),
	spin: c(cdn+'/spin.js/1.2.7/spin.min',
	    cdn+'{[MD5 /spin.min.js]}'),
	purl: c(cdn+'/jquery-url-parser/2.2.1/purl.min',
	    cdn+'{[MD5 /purl.min.js]}'),
	underscore: c(cdn+'/underscore.js/1.4.4/underscore-min',
	    cdn+'{[MD5 /underscore-min.js]}'),
	backbone: c(cdn+'/backbone.js/1.0.0/backbone-min',
	    cdn+'{[MD5 /backbone-min.js]}'),
	bootstrap: c(cdn+'/twitter-bootstrap/3.1.1/js/bootstrap.min',
	    cdn+'{[MD5 /bootstrap.min.js]}'),
	typeahead: c(cdn+'/typeahead.js/0.10.2/typeahead.bundle.min',
	    cdn+'{[MD5 /typeahead.bundle.min.js]}')
    };
    if ('{[=1]}'!=='1')
        return {paths: p};
    var b = base_url;
    var config = {};
    // XXX romank: do a simplier check for cdn fallback available
    var cdn_list = JSON.parse('{[=it.cdn_list]}'||'[]');
    if (cdn_list.length && require.s && require.s.contexts &&
        require.s.contexts._ && require.s.contexts._.config &&
        require.s.contexts._.config.cdn)
    {
        config.cdn = cdn_list;
        b = '';
    }
    extend(p, {
        // XXX arik: get from cdn
        jschardet: base_url+'{[MD5 /svc/pub/jschardet.min.js]}',
        '/protocol/countries.js': b+'{[MD5 /protocol/countries.js]}',
        '/protocol/pac_engine.js': b+'{[MD5 /protocol/pac_engine.js]}',
        '/svc/account/membership.js': b+'{[MD5 /svc/account/membership.js]}',
        '/svc/util.js': b+'{[MD5 /svc/util.js]}',
        '/util/ajax.js': b+'{[MD5 /util/ajax.js]}',
        '/util/array.js': b+'{[MD5 /util/array.js]}',
        '/util/browser.js': b+'{[MD5 /util/browser.js]}',
        '/util/country.js': b+'{[MD5 /util/country.js]}',
        '/util/conv.js': b+'{[MD5 /util/conv.js]}',
        '/util/date.js': b+'{[MD5 /util/date.js]}',
        '/util/escape.js': b+'{[MD5 /util/escape.js]}',
        '/util/etask.js': b+'{[MD5 /util/etask.js]}',
        '/util/events.js': b+'{[MD5 /util/events.js]}',
        '/util/hash.js': b+'{[MD5 /util/hash.js]}',
        '/util/match.js': b+'{[MD5 /util/match.js]}',
        '/util/rand.js': b+'{[MD5 /util/rand.js]}',
        '/util/rate_limit.js': b+'{[MD5 /util/rate_limit.js]}',
        '/util/sample.js': b+'{[MD5 /util/sample.js]}',
        '/util/sprintf.js': b+'{[MD5 /util/sprintf.js]}',
        '/util/storage.js': b+'{[MD5 /util/storage.js]}',
        '/util/string.js': b+'{[MD5 /util/string.js]}',
        '/util/strftime.js': b+'{[MD5 /util/strftime.js]}',
        '/util/url.js': b+'{[MD5 /util/url.js]}',
        '/util/user_agent.js': b+'{[MD5 /util/user_agent.js]}',
        '/util/util.js': b+'{[MD5 /util/util.js]}',
        '/util/version_util.js': b+'{[MD5 /util/version_util.js]}',
        '/util/zerr.js': b+'{[MD5 /util/zerr.js]}',
        '/util/lang.js': b+'{[MD5 /util/lang.js]}',
        '/util/attrib.js': b+'{[MD5 /util/attrib.js]}',
        '/util/zquery.js': b+'{[MD5 /util/zquery.js]}',
        '/util/jquery_ajax_ie.js': b+'{[MD5 /util/jquery_ajax_ie.js]}',
        '/util/jquery_ajax_binary.js': b+'{[MD5 /util/jquery_ajax_binary.js]}',
        '/svc/pub/jquery.xmlrpc.js': b+'{[MD5 /svc/pub/jquery.xmlrpc.js]}',
        '/util/zdot.js': b+'{[MD5 /util/zdot.js]}',
        '/util/arrbuf.js': b+'{[MD5 /util/arrbuf.js]}',
        '/util/bio.js': b+'{[MD5 /util/bio.js]}',
        '/util/es6_shim.js': b+'{[MD5 /util/es6_shim.js]}',
        '/svc/mp/pub/msg.js': b+'{[MD5 /svc/mp/pub/msg.js]}',
        '/svc/mp/pub/plugin.js': b+'{[MD5 /svc/mp/pub/plugin.js]}',
        '/svc/mp/pub/plugin_util.js': b+'{[MD5 /svc/mp/pub/plugin_util.js]}',
        '/svc/mp/pub/util.js': b+'{[MD5 /svc/mp/pub/util.js]}',
        '/svc/mp/pub/www_storage.js': b+'{[MD5 /svc/mp/pub/www_storage.js]}',
        '/svc/pub/background.js': b+'{[MD5 /svc/pub/background.js]}',
        '/svc/pub/be_about.js': b+'{[MD5 /svc/pub/be_about.js]}',
        '/svc/pub/be_about_main.js': b+'{[MD5 /svc/pub/be_about_main.js]}',
        '/svc/pub/be_agent.js': b+'{[MD5 /svc/pub/be_agent.js]}',
        '/svc/pub/be_app.js': b+'{[MD5 /svc/pub/be_app.js]}',
        '/svc/pub/be_auto_rule.js': b+'{[MD5 /svc/pub/be_auto_rule.js]}',
        '/svc/pub/be_backbone.js': b+'{[MD5 /svc/pub/be_backbone.js]}',
        '/svc/pub/be_base.js': b+'{[MD5 /svc/pub/be_base.js]}',
        '/svc/pub/be_bg.js': b+'{[MD5 /svc/pub/be_bg.js]}',
        '/svc/pub/be_bg_main.js': b+'{[MD5 /svc/pub/be_bg_main.js]}',
        '/svc/pub/be_browser.js': b+'{[MD5 /svc/pub/be_browser.js]}',
        '/svc/pub/be_ccgi.js': b+'{[MD5 /svc/pub/be_ccgi.js]}',
        '/svc/pub/be_chrome.js': b+'{[MD5 /svc/pub/be_chrome.js]}',
        '/svc/pub/be_defines.js': b+'{[MD5 /svc/pub/be_defines.js]}',
        '/svc/pub/be_ext.js': b+'{[MD5 /svc/pub/be_ext.js]}',
        '/svc/pub/be_features.js': b+'{[MD5 /svc/pub/be_features.js]}',
        '/svc/pub/be_firefox.js': b+'{[MD5 /svc/pub/be_firefox.js]}',
        '/svc/pub/be_icon.js': b+'{[MD5 /svc/pub/be_icon.js]}',
        '/svc/pub/be_iframe.js': b+'{[MD5 /svc/pub/be_iframe.js]}',
        '/svc/pub/be_info.js': b+'{[MD5 /svc/pub/be_info.js]}',
        '/svc/pub/be_lib.js': b+'{[MD5 /svc/pub/be_lib.js]}',
        '/svc/pub/be_locale.js': b+'{[MD5 /svc/pub/be_locale.js]}',
        '/svc/pub/be_main.js': b+'{[MD5 /svc/pub/be_main.js]}',
        '/svc/pub/be_mp.js': b+'{[MD5 /svc/pub/be_mp.js]}',
        '/svc/pub/be_inject.js': b+'{[MD5 /svc/pub/be_inject.js]}',
        '/svc/pub/be_msg.js': b+'{[MD5 /svc/pub/be_msg.js]}',
        '/svc/pub/be_pac.js': b+'{[MD5 /svc/pub/be_pac.js]}',
        '/svc/pub/be_plugin.js': b+'{[MD5 /svc/pub/be_plugin.js]}',
        '/svc/pub/be_popup.js': b+'{[MD5 /svc/pub/be_popup.js]}',
        '/svc/pub/be_popup_lib.js': b+'{[MD5 /svc/pub/be_popup_lib.js]}',
        '/svc/pub/be_popup_main.js': b+'{[MD5 /svc/pub/be_popup_main.js]}',
        '/svc/pub/be_premium.js': b+'{[MD5 /svc/pub/be_premium.js]}',
        '/svc/pub/be_rmt.js': b+'{[MD5 /svc/pub/be_rmt.js]}',
        '/svc/pub/be_rmt_ext.js': b+'{[MD5 /svc/pub/be_rmt_ext.js]}',
        '/svc/pub/be_rule.js': b+'{[MD5 /svc/pub/be_rule.js]}',
        '/svc/pub/be_slave.js': b+'{[MD5 /svc/pub/be_slave.js]}',
        '/svc/pub/be_social.js': b+'{[MD5 /svc/pub/be_social.js]}',
        '/svc/pub/be_stream.js': b+'{[MD5 /svc/pub/be_stream.js]}',
        '/svc/pub/be_svc.js': b+'{[MD5 /svc/pub/be_svc.js]}',
        '/svc/pub/be_mode.js': b+'{[MD5 /svc/pub/be_mode.js]}',
        '/svc/pub/be_tabs.js': b+'{[MD5 /svc/pub/be_tabs.js]}',
        '/svc/pub/be_tab_unblocker.js': b+
            '{[MD5 /svc/pub/be_tab_unblocker.js]}',
        '/svc/pub/be_tpopup.js': b+'{[MD5 /svc/pub/be_tpopup.js]}',
        '/svc/pub/be_transport.js': b+'{[MD5 /svc/pub/be_transport.js]}',
        '/svc/pub/be_ui_obj.js': b+'{[MD5 /svc/pub/be_ui_obj.js]}',
        '/svc/pub/be_ui_popup.js': b+'{[MD5 /svc/pub/be_ui_popup.js]}',
        '/svc/pub/be_ui_popup_ext.js': b+'{[MD5 /svc/pub/be_ui_popup_ext.js]}',
        '/svc/pub/be_ui_vpn.js': b+'{[MD5 /svc/pub/be_ui_vpn.js]}',
        '/svc/pub/be_ui_mp.js': b+'{[MD5 /svc/pub/be_ui_mp.js]}',
        '/svc/pub/be_ui_accel.js': b+'{[MD5 /svc/pub/be_ui_accel.js]}',
        '/svc/pub/be_user_nav.js': b+'{[MD5 /svc/pub/be_user_nav.js]}',
        '/svc/pub/be_util.js': b+'{[MD5 /svc/pub/be_util.js]}',
        // be_ver should never be required from cdn
        be_ver: conf.url_bext+'/be_ver',
        '/svc/pub/be_vpn.js': b+'{[MD5 /svc/pub/be_vpn.js]}',
        '/svc/pub/be_vpn_util.js': b+'{[MD5 /svc/pub/be_vpn_util.js]}',
        '/svc/pub/be_rule_rating.js': b+'{[MD5 /svc/pub/be_rule_rating.js]}',
        '/svc/pub/be_zerr.js': b+'{[MD5 /svc/pub/be_zerr.js]}',
        '/svc/pub/cs_hola.js': b+'{[MD5 /svc/pub/cs_hola.js]}',
        '/svc/pub/cs_inject.js': b+'{[MD5 /svc/pub/cs_inject.js]}',
        '/svc/pub/ensure_login.js': b+'{[MD5 /svc/pub/ensure_login.js]}',
        '/svc/pub/experiment.js': b+'{[MD5 /svc/pub/experiment.js]}',
        '/svc/pub/ga.js': b+'{[MD5 /svc/pub/ga.js]}',
        '/svc/pub/popup.js': b+'{[MD5 /svc/pub/popup.js]}',
        '/svc/pub/torch_whitelist.js': b+'{[MD5 /svc/pub/torch_whitelist.js]}',
        '/svc/pub/search.js': b+'{[MD5 /svc/pub/search.js]}',
        '/svc/pub/sharing.js': b+'{[MD5 /svc/pub/sharing.js]}',
        '/svc/pub/wbm_flags.js': b+'{[MD5 /svc/pub/wbm_flags.js]}',
        zon_config: b+'{[MD5 /zon_config.js]}',
        '/svc/pub/locale/be_af.js': b+'{[MD5 /svc/pub/locale/be_af.js]}',
        '/svc/pub/locale/be_ar.js': b+'{[MD5 /svc/pub/locale/be_ar.js]}',
        '/svc/pub/locale/be_az.js': b+'{[MD5 /svc/pub/locale/be_az.js]}',
        '/svc/pub/locale/be_be.js': b+'{[MD5 /svc/pub/locale/be_be.js]}',
        '/svc/pub/locale/be_bg.js': b+'{[MD5 /svc/pub/locale/be_bg.js]}',
        '/svc/pub/locale/be_bn.js': b+'{[MD5 /svc/pub/locale/be_bn.js]}',
        '/svc/pub/locale/be_bs.js': b+'{[MD5 /svc/pub/locale/be_bs.js]}',
        '/svc/pub/locale/be_ca.js': b+'{[MD5 /svc/pub/locale/be_ca.js]}',
        '/svc/pub/locale/be_cs.js': b+'{[MD5 /svc/pub/locale/be_cs.js]}',
        '/svc/pub/locale/be_cy.js': b+'{[MD5 /svc/pub/locale/be_cy.js]}',
        '/svc/pub/locale/be_da.js': b+'{[MD5 /svc/pub/locale/be_da.js]}',
        '/svc/pub/locale/be_de.js': b+'{[MD5 /svc/pub/locale/be_de.js]}',
        '/svc/pub/locale/be_el.js': b+'{[MD5 /svc/pub/locale/be_el.js]}',
        '/svc/pub/locale/be_en.js': b+'{[MD5 /svc/pub/locale/be_en.js]}',
        '/svc/pub/locale/be_es.js': b+'{[MD5 /svc/pub/locale/be_es.js]}',
        '/svc/pub/locale/be_et.js': b+'{[MD5 /svc/pub/locale/be_et.js]}',
        '/svc/pub/locale/be_eu.js': b+'{[MD5 /svc/pub/locale/be_eu.js]}',
        '/svc/pub/locale/be_fa.js': b+'{[MD5 /svc/pub/locale/be_fa.js]}',
        '/svc/pub/locale/be_fi.js': b+'{[MD5 /svc/pub/locale/be_fi.js]}',
        '/svc/pub/locale/be_fr.js': b+'{[MD5 /svc/pub/locale/be_fr.js]}',
        '/svc/pub/locale/be_ga.js': b+'{[MD5 /svc/pub/locale/be_ga.js]}',
        '/svc/pub/locale/be_gl.js': b+'{[MD5 /svc/pub/locale/be_gl.js]}',
        '/svc/pub/locale/be_gu.js': b+'{[MD5 /svc/pub/locale/be_gu.js]}',
        '/svc/pub/locale/be_he.js': b+'{[MD5 /svc/pub/locale/be_he.js]}',
        '/svc/pub/locale/be_hi.js': b+'{[MD5 /svc/pub/locale/be_hi.js]}',
        '/svc/pub/locale/be_hr.js': b+'{[MD5 /svc/pub/locale/be_hr.js]}',
        '/svc/pub/locale/be_ht.js': b+'{[MD5 /svc/pub/locale/be_ht.js]}',
        '/svc/pub/locale/be_hu.js': b+'{[MD5 /svc/pub/locale/be_hu.js]}',
        '/svc/pub/locale/be_hy.js': b+'{[MD5 /svc/pub/locale/be_hy.js]}',
        '/svc/pub/locale/be_id.js': b+'{[MD5 /svc/pub/locale/be_id.js]}',
        '/svc/pub/locale/be_is.js': b+'{[MD5 /svc/pub/locale/be_is.js]}',
        '/svc/pub/locale/be_it.js': b+'{[MD5 /svc/pub/locale/be_it.js]}',
        '/svc/pub/locale/be_ja.js': b+'{[MD5 /svc/pub/locale/be_ja.js]}',
        '/svc/pub/locale/be_ka.js': b+'{[MD5 /svc/pub/locale/be_ka.js]}',
        '/svc/pub/locale/be_km.js': b+'{[MD5 /svc/pub/locale/be_km.js]}',
        '/svc/pub/locale/be_kn.js': b+'{[MD5 /svc/pub/locale/be_kn.js]}',
        '/svc/pub/locale/be_ko.js': b+'{[MD5 /svc/pub/locale/be_ko.js]}',
        '/svc/pub/locale/be_lt.js': b+'{[MD5 /svc/pub/locale/be_lt.js]}',
        '/svc/pub/locale/be_lv.js': b+'{[MD5 /svc/pub/locale/be_lv.js]}',
        '/svc/pub/locale/be_mk.js': b+'{[MD5 /svc/pub/locale/be_mk.js]}',
        '/svc/pub/locale/be_mr.js': b+'{[MD5 /svc/pub/locale/be_mr.js]}',
        '/svc/pub/locale/be_ms.js': b+'{[MD5 /svc/pub/locale/be_ms.js]}',
        '/svc/pub/locale/be_mt.js': b+'{[MD5 /svc/pub/locale/be_mt.js]}',
        '/svc/pub/locale/be_nl.js': b+'{[MD5 /svc/pub/locale/be_nl.js]}',
        '/svc/pub/locale/be_no.js': b+'{[MD5 /svc/pub/locale/be_no.js]}',
        '/svc/pub/locale/be_pl.js': b+'{[MD5 /svc/pub/locale/be_pl.js]}',
        '/svc/pub/locale/be_pt_BR.js': b+'{[MD5 /svc/pub/locale/be_pt_BR.js]}',
        '/svc/pub/locale/be_pt.js': b+'{[MD5 /svc/pub/locale/be_pt.js]}',
        '/svc/pub/locale/be_ro.js': b+'{[MD5 /svc/pub/locale/be_ro.js]}',
        '/svc/pub/locale/be_ru.js': b+'{[MD5 /svc/pub/locale/be_ru.js]}',
        '/svc/pub/locale/be_sk.js': b+'{[MD5 /svc/pub/locale/be_sk.js]}',
        '/svc/pub/locale/be_sl.js': b+'{[MD5 /svc/pub/locale/be_sl.js]}',
        '/svc/pub/locale/be_sq.js': b+'{[MD5 /svc/pub/locale/be_sq.js]}',
        '/svc/pub/locale/be_sr.js': b+'{[MD5 /svc/pub/locale/be_sr.js]}',
        '/svc/pub/locale/be_sv.js': b+'{[MD5 /svc/pub/locale/be_sv.js]}',
        '/svc/pub/locale/be_sw.js': b+'{[MD5 /svc/pub/locale/be_sw.js]}',
        '/svc/pub/locale/be_ta.js': b+'{[MD5 /svc/pub/locale/be_ta.js]}',
        '/svc/pub/locale/be_te.js': b+'{[MD5 /svc/pub/locale/be_te.js]}',
        '/svc/pub/locale/be_th.js': b+'{[MD5 /svc/pub/locale/be_th.js]}',
        '/svc/pub/locale/be_tl.js': b+'{[MD5 /svc/pub/locale/be_tl.js]}',
        '/svc/pub/locale/be_tr.js': b+'{[MD5 /svc/pub/locale/be_tr.js]}',
        '/svc/pub/locale/be_uk.js': b+'{[MD5 /svc/pub/locale/be_uk.js]}',
        '/svc/pub/locale/be_ur.js': b+'{[MD5 /svc/pub/locale/be_ur.js]}',
        '/svc/pub/locale/be_vi.js': b+'{[MD5 /svc/pub/locale/be_vi.js]}',
        '/svc/pub/locale/be_zh_CN.js': b+'{[MD5 /svc/pub/locale/be_zh_CN.js]}',
        '/svc/pub/locale/be_zh_TW.js': b+'{[MD5 /svc/pub/locale/be_zh_TW.js]}',
    });
    config.paths = p;
    config.map = {
        events: '/util/events.js',
        '/svc/be_rmt_ext.js': '/svc/pub/be_rmt_ext.js',
        '/svc/be_ui_popup_ext.js': '/svc/pub/be_ui_popup_ext.js',
        // XXX romank: used by old extensions
        pcountries: '/protocol/countries.js',
        pac_engine: '/protocol/pac_engine.js',
        membership: '/svc/account/membership.js',
        svc_util: '/svc/util.js',
        ajax: '/util/ajax.js',
        array: '/util/array.js',
        browser: '/util/browser.js',
        country: '/util/country.js',
        conv: '/util/conv.js',
        date: '/util/date.js',
        escape: '/util/escape.js',
        etask: '/util/etask.js',
        hash: '/util/hash.js',
        rand: '/util/rand.js',
        rate_limit: '/util/rate_limit.js',
        sample: '/util/sample.js',
        sprintf: '/util/sprintf.js',
        storage: '/util/storage.js',
        string: '/util/string.js',
        url: '/util/url.js',
        user_agent: '/util/user_agent.js',
        util: '/util/util.js',
        version_util: '/util/version_util.js',
        zerr: '/util/zerr.js',
        attrib: '/util/attrib.js',
        zquery: '/util/zquery.js',
        jquery_ajax_ie: '/util/jquery_ajax_ie.js',
    };
    return config;
}

E.init = function(ver, country){
    if (E.inited)
        return console.error('be_config already inited');
    E.inited = true;
    require.onError = require_on_error;
    require.onResourceLoad = function(context, map, depArray){
        if (E.modules[map.name] && !{be_ver: 1, be_config: 1}[map.name])
        {
            console.error('module %s already loaded. id: %s, url: %s',
                map.name, map.id, map.url);
        }
        E.modules[map.name] = map;
    };
    E.ver = ver;
    var cdn_prefix = 'https://cdnjs.cloudflare.com/ajax/libs';
    var alt_cdn = 0;
    if (['CN', 'IQ', 'RU'].indexOf(country)!=-1)
    {
	cdn_prefix = 'https://holaalt-holanetworksltd.netdna-ssl.com';
	alt_cdn = 1;
    }
    var base_url = zconf._RELEASE ? conf.url_bext_cdn4||conf.url_bext :
        conf.url_bext;
    var require_config = get_paths(cdn_prefix, base_url, ver, alt_cdn);
    E.config = {
        enforceDefine: true,
        ver: ver,
	country: country,
	baseUrl: is_local ? '' : base_url,
	urlArgs: is_local ? 'ver='+ver : '',
	waitSeconds: is_local ? 0 : 30,
        paths: require_config.paths,
	shim: {
	    purl: {deps: ['jquery']},
	    jquery: {exports: '$'},
	    jquery_cookie: {deps: ['jquery']},
	    underscore: {exports: '_'},
	    backbone: {deps: ['jquery', 'underscore'], exports: 'Backbone'},
	    bootstrap: {deps: ['jquery'], exports: 'jQuery.fn.popover'},
	    typeahead: {deps: ['jquery'], exports: 'jQuery.fn.typeahead'},
            '/svc/pub/jquery.xmlrpc.js': {deps: ['jquery'],
                exports: 'jQuery.xmlrpc'},
	}
    };
    if (require_config.map)
        E.config.map = {'*': require_config.map};
    if (require_config.cdn)
        E.config.cdn = require_config.cdn;
    require.config(E.config);
    define('virt_jquery_all', ['jquery', '/util/jquery_ajax_ie.js',
        '/util/jquery_ajax_binary.js', '/svc/pub/jquery.xmlrpc.js'],
        function(j){ return j; });
};

E.no_undef = ['jquery', 'purl', 'spin', 'underscore', 'backbone',
    'conf', 'zon_config', 'be_bg_main', 'be_popup_main', 'bootstrap',
    'be_main', 'be_plugin'];
E.undef = function(){
    for (var m in E.modules)
    {
	var name = E.modules[m].name;
	if (E.no_undef.indexOf(name)!=-1)
	    continue;
	require.undef(name);
	delete E.modules[m];
    }
};

function perr(opt){
    if (window.be_bg_main && window.be_bg_main.be_lib &&
        window.be_bg_main.be_lib.perr_err)
    {
	return window.be_bg_main.be_lib.perr_err(opt);
    }
    if (window.be_popup_main && window.be_popup_main.be_popup_lib &&
        window.be_popup_main.be_popup_lib.perr_err)
    {
	return window.be_popup_main.be_popup_lib.perr_err(opt);
    }
    if (!window.hola || !window.hola.base)
        return;
    opt.bt = opt.err && opt.err.stack;
    delete opt.err;
    window.hola.base.perr(opt);
}
// XXX romank: merge with be_base.js somehow
function require_on_error(err){
    err = err||{};
    var retries = 3;
    var i, modules = err.requireModules;
    var id = require_is_local() ? 'be_int_require_err' : 'be_require_err';
    require_on_error.err = require_on_error.err||{};
    var perr_sent = require.perr_sent||(require.perr_sent = []);
    err.require_handled = true;
    if (window.hola)
    {
	window.hola.err = window.hola.err||{};
	window.hola.err.require=(window.hola.err.require||0)+1;
    }
    if (!modules)
    {
        id += '_fin';
	console.error('require fatal error '+err.stack);
        if (perr_sent.indexOf(id)<0)
        {
            perr({id: id, info: 'no_modules '+err, err: err});
            perr_sent.push(id);
        }
	return;
    }
    for (i=0; i<modules.length; i++)
    {
	var m = modules[i];
        var filehead = require.toUrl(m);
        // XXX romank: simplify
        var cdn_fallback = require.s && require.s.contexts &&
            require.s.contexts._ && require.s.contexts._.config &&
            require.s.contexts._.config.cdn;
        var path = E.config.paths[m]||m;
        if (/^(http(s)?:)?\/\//.test(path))
            cdn_fallback = false;
        var e = require_on_error.err[m] = require_on_error.err[m]||{failed: 0};
        e.failed++;
	// XXX arik/bahaa hack: rm ver/tpopup from here. need to send it in
	// build in all cases
	var info = m+' failed '+e.failed+' err '+err.requireType
	+(window.is_tpopup ? ' tpopup' : '')+' ver '+E.ver;
        // first perr
        if ((err.fallback===true || e.failed<retries) &&
            perr_sent.indexOf(id)<0)
        {
            perr({id: id, info: info, err: err, filehead: filehead});
            perr_sent.push(id);
        }
        // no fallback available
        if (!cdn_fallback && e.failed<retries)
        {
            require.undef(m);
            require([m]);
        }
        // second perr on third retry or if fallback is not available
        if ((!cdn_fallback && e.failed<retries) || err.fallback)
            return;
        E.test_all(m, function(ret){
            if (ret)
            {
                if (ret.timeout)
                    info += ' tests_timeout';
                if (ret.url && ret.url.status == '200 OK')
                    info += ' url_ok';
                if (ret.cc_url && ret.cc_url.status == '200 OK')
                    info += ' cc_url_ok';
                if (ret.ms_url && ret.ms_url.status == '200 OK')
                    info += ' ms_url_ok';
                info += ' '+filehead;
                filehead = JSON.stringify(ret, null, '\t')+'\n';
            }
            if (perr_sent.indexOf(id)<0)
            {
                perr({id: id+'_fin', info: info, err: err,
                    filehead: filehead});
                perr_sent.push(id+'_fin');
            }
        });
    }
}

// XXX arik: WIP
E.test_url = function(url, done_cb, opt){
    opt = opt||{};
    console.log('testing '+url);
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    if (opt.no_cache)
    {
        xhr.setRequestHeader('Cache-Control', 'no-cache');
        xhr.setRequestHeader('Pragma', 'no-cache');
        xhr.setRequestHeader('If-None-Match', '"-- bad etag --"');
        xhr.setRequestHeader('If-Modified-Since',
            'Thu Jan 01 1970 02:00:00 GMT');
    }
    var t0 = Date.now();
    // XXX arik: add timeout/ontimeout
    xhr.onreadystatechange = function(){
	var DONE = 4;
	if (xhr.readyState!=DONE)
	    return;
	var res = (xhr.responseText||'');
	done_cb(xhr, {url: url, status: xhr.status+' '+xhr.statusText,
	    duration: (Date.now()-t0)+'ms', responseType: xhr.responseType,
	    responseLen: res.length,
	    response: '0..64:\n'+res.substr(0, 64)+'\n-64..'+res.length+':'+
	        res.substr(-64)});
    };
    xhr.send();
};

// XXX arik todo: send results of
// - wget of m
// - wget of small png in microsoft cdn
// - wget of m with clear-cache
E.test_all = function(module, done_cb){
    var ms_url = '//www.microsoft.com/library/errorpages/Images/'+
	'Microsoft_logo.png';
    var url = require.toUrl(module);
    if (!url)
        return void done_cb();
    // XXX romank: temp hack for old toUrl, remove when all bext updated to
    // require 2.1.14-9
    if (!/\.js(\?|$)/.test(url) && (module=='be_ver' || module=='be_config'))
    {
        url = url.replace(new RegExp(module+'(\\?|$)'), module+'.js$1');
    }
    var ret = {timeout: false};
    var tests_timeout = setTimeout(function(){
        console.error('require tests timeouted');
        ret.timeout = true;
        done_cb(ret);
    }, 60000);
    function check_return(){
	if (ret.url && ret.ms_url && ret.cc_url && !ret.timeout)
        {
            clearTimeout(tests_timeout);
	    done_cb(ret);
        }
    }
    E.test_url(url, function(xhr, e){
        ret.url = e;
        check_return();
    });
    E.test_url(url, function(xhr, e){
        ret.cc_url = e;
        check_return();
    }, {no_cache: true});
    E.test_url(ms_url, function(xhr, e){
	delete e.response;
        ret.ms_url = e;
	check_return();
    });
};

// XXX arik: WIP
function test_and_recover(m){
    // XXX arik: take urlArgs into account
    // consider to use only-if-cached
    var url = E.config.paths[m];
    console.log('test_and_recover '+m+' '+url);
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    // XXX arik: timeout/ontimeout
    xhr.onreadystatechange = function(){
	var DONE = 4;
	if (xhr.readyState!=DONE)
	    return;
	console.log('status '+xhr.status);
	console.log('statusText '+xhr.statusText);
	console.log('responseType '+xhr.responseType);
	console.log('responseText len '+(xhr.responseText||'').length);
	console.log('responseText '+(xhr.responseText||'').substr(0, 128));
    };
    //xhr.setRequestHeader('cache-control', 'no-cache')
    xhr.send();
}

if (be_ver)
    E.init(be_ver.ver);

return E; });
