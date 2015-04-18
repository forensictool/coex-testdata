var DGExt = DGExt || {};

(function() {
    "use strict";

    /**
     * Basic internationalization
     */
    DGExt.I18n = function(onInitDone) {
        var self = this;

        this._getExtensionInfo(function(extInfo) {
            if (!extInfo.locales) {
                if (onInitDone) {
                    onInitDone(self);
                }
                return;
            }

            var locale = self._getLanguage() || extInfo.default_locale || "en";

            DGExt.utils.log('Selected language: ' + locale);

            self._getLocaleMessages(locale, function(result) {
                if (!result) {
                    // take english if no locale found
                    self._getLocaleMessages('en', function(result) {
                        self._messages = self._parseMessagesFormat(result);
                        self._ready = true;
                        if (onInitDone) {
                            onInitDone(self);
                        }
                    });
                    return;
                }

                self._messages = self._parseMessagesFormat(result);
                self._ready = true;
                if (onInitDone) {
                    onInitDone(self);
                }
            });
        });
    };

    DGExt.I18n.prototype = {
        /**
         * true if localization messages were successfully loaded
         */
        _ready: false,
        /**
         * localization messages
         */
        _messages: {},

        /**
         * Get localized message
         */
        getMessage: function(message, params, paramsAsEnumeratedArray) {
            if (!this._messages[message] || !this._ready) {
                return this._substitute(message, params);
            }

            return this._substitute(this._messages[message], params, paramsAsEnumeratedArray);
        },

        /**
         * Substitute variables into the string
         */
        _substitute: function(string, params, paramsAsEnumeratedArray) {
            var i;
            if (paramsAsEnumeratedArray) {
                for (i = 0; i < params.length; i++) {
                    string = string.replace(/\{.*?\}/, params[i]);
                }
                return string;
            } else {
                for (i in params) {
                    if (!params.hasOwnProperty(i)) {
                        continue;
                    }
                    string = string.split('{' + i + '}').join(params[i]);
                }
                return string;
            }
        },

        /**
         * Add commenting possibility into config json format
         */
        _parseMessagesFormat: function(rawMessages) {
            rawMessages = rawMessages.split("\n");
            for (var i in rawMessages) {
                if (!rawMessages.hasOwnProperty(i)) {
                    continue;
                }
                if (rawMessages[i] && rawMessages[i].match(/^\s*#.*/g)) { // комменты
                    rawMessages[i] = null;
                }
            }
            return JSON.parse(rawMessages.join("\n"));
        },

        /**
         * kango api wrapper to get extension information
         *
         * @param callback
         * @private
         */
        _getExtensionInfo: function(callback) {
            if (kango.getExtensionInfo) {
                callback(kango.getExtensionInfo());
            } else {
                kango.invokeAsync('kango.getExtensionInfo', callback);
            }
        },

        /**
         * kango api to get localization messages
         *
         * @param locale
         * @param callback
         * @private
         */
        _getLocaleMessages: function(locale, callback) {
            if (kango.io && kango.io.getExtensionFileContents) {
                callback(kango.io.getExtensionFileContents("locales/" + locale + ".json"));
            } else {
                kango.invokeAsync('kango.io.getExtensionFileContents', "locales/" + locale + ".json", callback);
            }
        },

        /**
         * Get current user locale
         *
         * @returns {string|*|string}
         * @private
         */
        _getLanguage: function() {
            var lang = navigator.language || navigator.browserLanguage || navigator.systemLanguage ||
                navigator.userLanguage || null;
            if (lang) {
                return lang.substr(0, 2);
            }
            return null;
        }
    };
})();