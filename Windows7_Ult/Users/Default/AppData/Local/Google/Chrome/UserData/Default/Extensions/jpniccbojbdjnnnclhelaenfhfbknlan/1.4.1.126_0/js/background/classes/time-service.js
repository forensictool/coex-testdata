var DGExt = DGExt || {};

(function() {
    "use strict";

    /**
     * Dummy service class for
     * @constructor
     */
    DGExt.TimeService = function() {
    };

    DGExt.TimeService.prototype = {
        getTime: function() {
            return new Date();
        },

        getTimestamp: function() {
            return this.getTime().getTime(); // :)
        },

        init: function() {
        }
    };
})();