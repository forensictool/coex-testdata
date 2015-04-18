var DGExt = DGExt || {};

(function() {
    "use strict";

    /**
     * Analytics service wrapper singleton
     * @returns {DGExt.GoogleAnalyticsService._GoogleAnalytics|*|DGExt.PushToDialService._singletonInstance}
     * @constructor
     */
    DGExt.GoogleAnalyticsService = function() {
        if (!DGExt.GoogleAnalyticsService.prototype._singletonInstance) {
            DGExt.GoogleAnalyticsService.prototype._singletonInstance = new DGExt.GoogleAnalyticsService._GoogleAnalytics();
        }

        return DGExt.GoogleAnalyticsService.prototype._singletonInstance;
    };

    /**
     * Analytics service wrapper
     * @private
     */
    DGExt.GoogleAnalyticsService._GoogleAnalytics = function() {
        var self = this;
        if (DGExt._runContext === 'background') {
            this._init();
            this._userIdTimeout = setTimeout(function() {
                self._initUserUniqueId();
            }, 3000); // should load page in 3 sec, else it will create new uniqid; uniqid may be rewritten on window load
        }

        if (DGExt._runContext === 'content' && location.href.match(/apps\.2gis.*\/installed/)) {
            DGExt.$(window).load(function() {
                var customId = DGExt.$('body').attr('data-ga-client-id') || self._makeRandomId();
                kango.invokeAsync('DGExt.services.ga._storeUniqueId', customId);
            });
        }
    };

    DGExt.extend(DGExt.GoogleAnalyticsService._GoogleAnalytics.prototype, {
        /**
         * Identifier
         */
        _analyticsId: 'UA-44852991-1',
        /**
         * XMLHttpRequest
         */
        _xhr: null,
        /**
         * User unique id
         * @type number
         */
        _userUniqueId: null,
        /**
         * Timeout for user id
         */
        _userIdTimeout: null,

        /**
         * Additional parameters to pass into analytics
         */
        _additionalData: {},

        /**
         * Set additional parameter
         * @param name
         * @param value
         */
        setParam: function(name, value) {
            if (value) {
                this._additionalData[name] = value;
            } else if (this._additionalData[name]) {
                delete this._additionalData[name];
            }
        },

        /**
         * Store unique identifier
         * @param uniqueId
         * @private
         */
        _storeUniqueId: function(uniqueId) {
            if (this._userIdTimeout) {
                clearTimeout(this._userIdTimeout);
            }
            this._userUniqueId = uniqueId;
            kango.storage.setItem('_user_unique_id', uniqueId);
        },

        /**
         * Get user unique id
         * @returns {*}
         * @private
         */
        _retrieveUniqueId: function() {
            return kango.storage.getItem('_user_unique_id');
        },

        /**
         * Make random id used as user id
         * @returns {number}
         */
        _makeRandomId: function() {
            return (1000000000 + Math.floor(Math.random() * (2147483647 - 1000000000)));
        },

        /**
         * Generate and store unique user id, or get it from storage
         * @todo unittest
         */
        _initUserUniqueId: function() {
            if (this._userUniqueId) {
                return;
            }

            var uniqueId = this._retrieveUniqueId();
            if (uniqueId) {
                this._userUniqueId = uniqueId;
            } else {
                this._userUniqueId = this._makeRandomId();
                this._storeUniqueId(this._userUniqueId);
            }
        },

        /**
         * Initialize xhr and unique id
         * @private
         */
        _init: function() {
            if (kango.browser.getName() === 'firefox' && Components.classes) {
                this._xhr = Components.classes["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance();
            } else {
                this._xhr = new XMLHttpRequest();
            }
        },

        _addRequest: function(args) {
            var url = "http://www.google-analytics.com/collect";
            var params = "v=1";
            params += "&tid=" + encodeURIComponent(this._analyticsId);
            params += "&cid=" + encodeURIComponent(this._userUniqueId);
            params += "&t=" + "event";
            if (args[2]) { // category
                params += "&ec=" + encodeURIComponent(args[2]);
            }
            if (args[3]) { // action
                params += "&ea=" + encodeURIComponent(args[3]);
            }
            if (args[4]) { // label
                params += "&el=" + encodeURIComponent(args[4]);
            }
            if (args[5]) { // value
                params += "&ev=" + encodeURIComponent(args[5]);
            }
            params += "&z=" + (1000000000 + Math.floor(Math.random() * (2147483647 - 1000000000)));

            var self = this;
            DGExt.services.timeoutQueue.add(function() {
                self._xhr.open("POST", url, true);
                if (self._xhr.channel) { // firefox customization
                    self._xhr.channel.loadFlags |= Components.interfaces.nsIRequest.LOAD_BYPASS_CACHE;
                }
                self._xhr.send(params);
            });
        },

        /**
         * Send request to GA via measurement interface
         * @todo unittest
         * @param args
         * @private
         */
        _req: function(args) {
            if (!DGExt._debug.useAnalytics) {
                DGExt.utils.log('Called analytics req with: [' + args.join(', ') + '] @ cid=' + this._userUniqueId);
                return;
            }

            if (DGExt._runContext === 'background') {
                if (this._userUniqueId) {
                    this._addRequest(args);
                }
            } else {
                kango.invokeAsync('DGExt.services.ga._req', args);
            }
        },

        // GA Events:

        _EVInstalled: function(version) {
            this._req(['send', 'event', 'GeneralEvent', 'ExtensionInstalled', version]);
        },

        _EVUpdated: function(version) {
            this._req(['send', 'event', 'GeneralEvent', 'ExtensionUpdated', version]);
        },

        _JSError: function(value) {
            value = value || '';
            this._req(['send', 'event', 'GeneralEvent', 'JavaScriptError', value]);
        },

        _TBSiteFound: function(value) {
            value = value || '';
            this._req(['send', 'event', 'Toolbar', 'SiteFound', value]);
        },

        _TBCoordinatesAbsent: function(value) {
            value = value || '';
            this._req(['send', 'event', 'Toolbar', 'NoCoordinatesReceived', value]);
        },

        _TBSiteNotMatched: function(value) {
            value = value || '';
            this._req(['send', 'event', 'Toolbar', 'SiteCheckError', value]);
        },

        _TBNoSiteFound: function(value) {
            value = value || '';
            this._req(['send', 'event', 'Toolbar', 'NoSiteInResults', value]);
        },

        _TBPopupOpened: function() {
            this._req(['send', 'event', 'Toolbar', 'PopupOpened', this._additionalData['rubric']]);
        },

        _TBCallClickDial: function() {
            this._req(['send', 'event', 'Toolbar', 'CallClick', this._additionalData['rubric']]);
        },

        _TBCallClickSentPushNotification: function() {
            this._req(['send', 'event', 'Toolbar', 'Call', this._additionalData['rubric']]);
        },

        _TBScheduleClick: function() {
            this._req(['send', 'event', 'Toolbar', 'ScheduleClick', this._additionalData['rubric']]);
        },

        _TBMapClick: function() {
            this._req(['send', 'event', 'Toolbar', 'MapClick', this._additionalData['rubric']]);
            this._req(['send', 'event', 'Toolbar', 'CardClick', this._additionalData['rubric']]);
        },

        _TBAddressClick: function() {
            this._req(['send', 'event', 'Toolbar', 'AddressClick', this._additionalData['rubric']]);
            this._req(['send', 'event', 'Toolbar', 'CardClick', this._additionalData['rubric']]);
        },

        _TBCloseClick: function() {
            this._req(['send', 'event', 'Toolbar', 'CloseClick', this._additionalData['rubric']]);
        },

        _TBTransFromClick: function() {
            this._req(['send', 'event', 'Toolbar', 'RouteFromClick', this._additionalData['rubric']]);
            this._req(['send', 'event', 'Toolbar', 'CardClick', this._additionalData['rubric']]);
        },

        _TBTransToClick: function() {
            this._req(['send', 'event', 'Toolbar', 'RouteToClick', this._additionalData['rubric']]);
            this._req(['send', 'event', 'Toolbar', 'CardClick', this._additionalData['rubric']]);
        },

        _TBReviewsClick: function() {
            this._req(['send', 'event', 'Toolbar', 'ReviewsClick', this._additionalData['rubric']]);
            this._req(['send', 'event', 'Toolbar', 'CardClick', this._additionalData['rubric']]);
        },

        _TBAllReviewsClick: function() {
            this._req(['send', 'event', 'Toolbar', 'AllReviewsClick', this._additionalData['rubric']]);
            this._req(['send', 'event', 'Toolbar', 'CardClick', this._additionalData['rubric']]);
        },

        _TBBranchesClick: function() {
            this._req(['send', 'event', 'Toolbar', 'BranchesClick', this._additionalData['rubric']]);
            this._req(['send', 'event', 'Toolbar', 'CardClick', this._additionalData['rubric']]);
        },

        _TBRubricsClick: function() {
            this._req(['send', 'event', 'Toolbar', 'RubricClick', this._additionalData['rubric']]);
            this._req(['send', 'event', 'Toolbar', 'CardClick', this._additionalData['rubric']]);
        },

        _TBSourceClick: function() {
            this._req(['send', 'event', 'Toolbar', 'SourceClick', this._additionalData['rubric']]);
            this._req(['send', 'event', 'Toolbar', 'CardClick', this._additionalData['rubric']]);
        },

        /////////////////////////////////////////////////////

        _PHPhoneFound: function(value) {
            value = value || '';
            this._req(['send', 'event', 'Phone', 'PhoneFound', value]);
        },

        _PHPhoneNotFound: function(value) {
            value = value || '';
            this._req(['send', 'event', 'Phone', 'PhoneNotFound', value]);
        },

        _PHPhoneNotMatched: function(value) {
            value = value || '';
            this._req(['send', 'event', 'Phone', 'PhoneCheckError', value]);
        },

        _PHPopupOpened: function() {
            this._req(['send', 'event', 'Phone', 'PopupOpened', this._additionalData['rubric']]);
        },

        _PHCallClickDial: function() {
            this._req(['send', 'event', 'Phone', 'CallClick', this._additionalData['rubric']]);
        },

        _PHCallClickSentPushNotification: function() {
            this._req(['send', 'event', 'Phone', 'Call', this._additionalData['rubric']]);
        },

        _PHScheduleClick: function() {
            this._req(['send', 'event', 'Phone', 'ScheduleClick', this._additionalData['rubric']]);
        },

        _PHCloseClick: function() {
            this._req(['send', 'event', 'Phone', 'CloseClick', this._additionalData['rubric']]);
        },

        _PHReviewsClick: function() {
            this._req(['send', 'event', 'Phone', 'ReviewsClick', this._additionalData['rubric']]);
            this._req(['send', 'event', 'Phone', 'CardClick', this._additionalData['rubric']]);
        },

        _PHMoreClick: function() {
            this._req(['send', 'event', 'Phone', 'MoreClick', this._additionalData['rubric']]);
            this._req(['send', 'event', 'Phone', 'CardClick', this._additionalData['rubric']]);
        },

        ////////////////////////////////////

        _P2DPopupOpened: function() {
            this._req(['send', 'event', 'P2D', 'PopupOpened']);
        },

        _P2DDialerDownload: function() {
            this._req(['send', 'event', 'P2D', 'DownloadDialerClick']);
        },

        _P2D2GisAndroidDownload: function() {
            this._req(['send', 'event', 'P2D', 'Download2GisAndroidClick']);
        },

        _P2D2GisIosDownload: function() {
            this._req(['send', 'event', 'P2D', 'Download2GisIosClick']);
        },

        _P2DConnectDevice: function() {
            this._req(['send', 'event', 'P2D', 'ConnectDeviceClick']);
        }
    });
})();
