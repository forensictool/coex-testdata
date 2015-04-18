var DGExt = DGExt || {};


(function() {
    "use strict";

    /**
     * Detect language to speak
     * @constructor
     */
    DGExt.LocaleDetector = function() {
        var currentLang = this._getCurrentLang();
        if (DGExt.$.inArray(currentLang, this._rusLocaleLangs)) {
            this._lang = 'ru';
        }
    };

    DGExt.LocaleDetector.prototype = {
        /**
         * English is default
         */
        _lang: 'en',

        /**
         * Countries where people understand russian well
         */
        _rusLocaleLangs: [
            'ru', // россия
            'uk', // украина
            'kk', // казахстан
            'be', // белоруссия
            'az', // азербайджан
            'hy', // армения
            'ky', // киргизия
            'mo', // молдова
            'tg', // таджикистан
            'tk', // туркмения
            'uz'  // узбекистан
        ],

        /**
         * Get current locale
         * @returns {*|string}
         * @private
         */
        _getCurrentLang: function() {
            return navigator.browserLanguage || navigator.language || navigator.userLanguage;
        },

        /**
         * Get language code to use in application
         * @returns {string}
         */
        getLang: function() {
            return this._lang;
        }
    };
})();