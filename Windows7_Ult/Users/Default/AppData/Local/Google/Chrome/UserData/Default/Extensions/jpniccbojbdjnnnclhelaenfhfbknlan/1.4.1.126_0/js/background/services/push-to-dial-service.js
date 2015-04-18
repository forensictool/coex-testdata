var DGExt = DGExt || {};

(function() {
    "use strict";

    /**
     * Push2Dial service singleton
     *
     * @returns {DGExt.PushToDialService._PushToDial|*|DGExt.GoogleAnalyticsService._singletonInstance}
     * @constructor
     */
    DGExt.PushToDialService = function() {
        if (!DGExt.PushToDialService.prototype._singletonInstance) {
            DGExt.PushToDialService.prototype._singletonInstance = new DGExt.PushToDialService._PushToDial();
        }

        return DGExt.PushToDialService.prototype._singletonInstance;
    };

    /**
     * Push2DIal service instance
     *
     * @private
     */
    DGExt.PushToDialService._PushToDial = function() {
        this.hash = kango.storage.getItem('p2d_hash');
        var name = DGExt.utils.getBrowserName();
        this.senderName = DGExt.services.i18n.getMessage('__2gis_for_{browsername}', {browsername: name.charAt(0).toUpperCase() +
            name.slice(1)});
    };

    DGExt.extend(DGExt.PushToDialService._PushToDial.prototype, {
        /**
         * Extension identification string
         */
        senderName: '',

        /**
         * User identification hash
         */
        hash: '',

        /**
         * Send result to content script
         *
         * @param type
         * @param result
         */
        sendResult: function(type, result) {
            type = type || 'P2DResult';
            result = result || {};
            if (!kango.browser.windows.isNull()) {
                kango.browser.tabs.getCurrent(function(tab) {
                    tab.dispatchMessage(type, result);
                });
            }
        },

        /**
         * Save hash to storage
         *
         * @param hash
         */
        setHash: function(hash) {
            kango.storage.setItem('p2d_hash', hash);
            this.hash = hash;
        },

        /**
         * Make push2dial request
         *
         * @param phone
         * @param desc
         * @param callback
         * @param fromPhonePopup    set to true if requested from content script
         */
        push2dial: function(phone, desc, callback, fromPhonePopup) {
            var resultType = 'p2d_push2dialDone';

            if (fromPhonePopup) {
                DGExt.services.ga._PHCallClickDial();
            } else {
                DGExt.services.ga._TBCallClickDial();
            }

            if (!this.hash) {
                DGExt.utils.log('No hash, sending negative result');
                var result = {phone: phone, desc: desc, error: true, type: 'badToken', message: DGExt.services.i18n.getMessage('__link_your_phone')};
                this.sendResult(resultType, result);

                if (DGExt.$.isFunction(callback)) {
                    callback(result);
                }
                return;
            }

            desc = desc || '';
            this._APIRequest('dial', {
                phone: phone,
                message: desc,
                hash: this.hash
            }).done(DGExt.$.proxy(function(data) {
                if (fromPhonePopup) {
                    DGExt.services.ga._PHCallClickSentPushNotification();
                } else {
                    DGExt.services.ga._TBCallClickSentPushNotification();
                }
                var defaultErrorMessage = DGExt.services.i18n.getMessage('__p2d_error');
                this.sendResult(resultType, this._getResult(data, phone, desc, defaultErrorMessage));
                if (DGExt.$.isFunction(callback)) {
                    callback(result);
                }
            }, this));
        },

        /**
         * Reformat result array
         *
         * @param data
         * @param phone
         * @param desc
         * @param defaultErrorMessage
         * @returns {{}}
         * @private
         */
        _getResult: function(data, phone, desc, defaultErrorMessage) {
            var result = {};
            if (!data || !data.meta) {
                result = {phone: phone, desc: desc, error: true, type: 'badToken', message: DGExt.services.i18n.getMessage('__service_unavailable')};
            } else if (+data.meta.code === 200) {
                result = {phone: phone, desc: desc, success: true};
            } else if (data.meta.error.message === 'token not found') {
                result = {phone: phone, desc: desc, error: true, type: 'badToken', message: DGExt.services.i18n.getMessage('__link_your_phone')};
            } else if (data.meta.error.message === 'PIN not found') {
                result = {phone: phone, desc: desc, error: true, type: 'error', message: DGExt.services.i18n.getMessage('__wrong_pin')};
            } else {
                result = {phone: phone, desc: desc, error: true, type: 'error', message: defaultErrorMessage};
            }

            return result;
        },

        /**
         * Bind phone and browser together by user identification hash
         *
         * @param pin
         * @param phone
         * @param desc
         */
        bind: function(pin, phone, desc) {
            this._APIRequest('bind', {
                pin: pin,
                sender_name: this.senderName
            }).done(DGExt.$.proxy(function(data) {
                var defaultErrorMessage = DGExt.services.i18n.getMessage('__pin_gen_error');
                var result = this._getResult(data, phone, desc, defaultErrorMessage);
                if (+data.meta.code === 200) {
                    this.setHash(data.result.hash);
                }
                this.sendResult('p2d_bindDone', result);
            }, this));
        },

        /**
         * APi request wrapper
         *
         * @param {String} cmd
         * @param {Object} params
         * @returns {jqXHR}
         * @private
         */
        _APIRequest: function(cmd, params) {
            return DGExt.$.ajax({
                url: 'http://push2dial.api.2gis.ru/1.0/sender/' + encodeURIComponent(cmd),
                data: params,
                dataType: 'JSON'
            });
        }
    });
})();