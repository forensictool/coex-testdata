var DGExt = DGExt || {};

(function() {
    "use strict";

    /**
     * Generic data collection
     * @constructor
     */
    DGExt.ResultCollection = function() {
        /**
         * Encapsulated object
         * @type {{attempt: int, value: string}}
         */
        this.collection = {};
    };

    /**
     * Прототип коллекции
     */
    DGExt.ResultCollection.prototype = {
        /**
         * Check if there is a key in the collection
         * @todo unittest
         * @param key
         * @returns {boolean}
         */
        has: function(key) {
            return !!this.collection[key];
        },

        /**
         * Check if there is non-empty key in the collection
         * @todo unittest
         * @param key
         * @returns {boolean}
         */
        hasValue: function(key) {
            return this.has(key) && !!this.collection[key].value;
        },

        /**
         * Get value by key
         * Returns null on empty value
         * @todo unittest
         * @param key
         * @returns {*}
         */
        get: function(key) {
            if (this.has(key)) {
                return this.collection[key].value;
            }
            return null;
        },

        /**
         * todo: what is this needed for?
         * @param key
         * @returns {boolean}
         */
        hasAttempt: function(key) {
            // todo: checkout why it's 3. From named constant NULL_ATTEMPT.
            return !this.has(key) || this.collection[key].attempt < 3;
        },

        /**
         * Add value to collection
         * @todo unittest
         * @param key
         * @param value
         */
        add: function(key, value) {
            if (!this.has(key)) {
                this.collection[key] = {
                    attempt: 0,
                    value: null
                };
            }

            if (!value) {
                this.collection[key].attempt++;
            } else {
                this.collection[key].value = value;
            }
        }
    };
})();