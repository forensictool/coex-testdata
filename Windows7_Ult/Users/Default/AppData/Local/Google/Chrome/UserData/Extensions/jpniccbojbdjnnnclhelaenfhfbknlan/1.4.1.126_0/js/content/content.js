// ==UserScript==
// @name 2Gis Phone Highlight
// @include http://*
// @include https://*
// @require js/common/extend.js
// @require js/common/vendor/jquery-2.1.1.min.js
// @require js/content/vendor/jquery.mutation-summary.js
// @require js/common/jquery-noconflict.js
// @require js/common/config.js
// @require js/common/utils.js
// @require js/common/vendor/md5.js
// @require js/background/services/google-analytics-service.js
// @require js/common/errors.js
// @require js/common/i18n.js
// @require js/common/time-service-client.js
// @require js/content/classes/phone-wrapper.js
// @require js/content/classes/document-observer.js
// @require js/content/classes/push-to-dial-popup.js
// @require js/content/classes/phone-parser.js
// @require js/content/classes/phone-info.js
// @require js/common/jquery-plugins/gisform.js
// @require js/content/classes/phone-popup.js
// @require js/common/push2dial-invoker.js
// @require js/common/vendor/handlebars-v1.3.0.js
// @require js/common/handlebars-helpers.js
// @require js/content/vendor/mutation-summary.js
// ==/UserScript==

var DGExt = DGExt || {};

(function() {
    "use strict";

    /**
     * Content scripts entry point
     */

    DGExt._runContext = 'content';

    DGExt.services = {};
    DGExt.services.ga = DGExt.GoogleAnalyticsService();
    DGExt.Errors();

    var extDetect = document.createElement('SCRIPT');
    extDetect.innerHTML = 'var DGExt = DGExt || {}; DGExt._installed = true;';
    document.head.appendChild(extDetect);

    DGExt.xhtmlStrictMode = false;
    window.addEventListener('load', function() {
        DGExt.xhtmlStrictMode = (function() { // should we additionally unescape template code and use innerHTML hacks?
            var f = document.createElement('IFRAME');
            document.body.appendChild(f);
            var hasCW = !!f.contentWindow;
            document.body.removeChild(f);
            return !hasCW;
        })();

        kango.invokeAsync('DGExt.utils.getCountryCodes', function(data) {
            DGExt._countryPhoneCodes = data;
        });

        kango.invokeAsync('DGExt.utils.getCurrentCountryCode', function(data) {
            DGExt._location.countryCode = data;
        });
    });

    DGExt.services.i18n = new DGExt.I18n(function(i18n) { // i18n should be initialized first
        DGExt.services.pushToDialPopup = new DGExt.PushToDialPopup(i18n);

        // base content css
        kango.xhr.send({url: 'css/main-content.css'}, function(data) {
            DGExt.$('<style/>', {id: '_gis-main-content-css'}).appendTo('head').html(data.response);
        });

        kango.xhr.send({url: 'css/normalize.css'}, function(data) {
            DGExt.$('<script/>', {id: '_gis-main-content-normalize-css', type: 'text/template'}).appendTo('head').html(data.response);
        });

        DGExt.currentDomain = document.location.toString().match(/^https?:\/\/([^/?]+)/i)[1];
        if (DGExt.utils.disableApiPhoneSearch()) {
            return;
        }

        // init fonts
        DGExt.$('<div/>', {class: '_gis-font-loader'}).appendTo('body');

        // init modules
        DGExt.services.documentObserver = new DGExt.DocumentObserver();
        DGExt.services.phoneInfo = new DGExt.PhoneInfo(i18n);
        DGExt.services.time = new DGExt.TimeServiceClient();
        if (document.body) { // WAT. Helps against js errors on open page by middle-click (in background tab)
            DGExt._documentHeight = (document.body.scrollHeight > document.body.offsetHeight) ? document.body.scrollHeight : document.body.offsetHeight;
        }
    });
})();