var DGExt = DGExt || {};

// File not included by default
(function() {
    "use strict";

    /**
     * Make use of external time server to know proper time for now
     * @constructor
     */
    DGExt.TimeService = function() {
    };

    DGExt.TimeService.prototype = {
        _currentTime: new Date(),
        _timer: null,

        getTime: function() {
            if (this._timer) {
                return this._currentTime;
            }

            return new Date();
        },

        getTimestamp: function() {
            return this.getTime().getTime(); // :)
        },

        init: function() {
            var self = this;
            var requestDetails = {
                method: 'GET',
                url: DGExt.timeServerApiUrl,
                contentType: 'json',
                params: {
                    lat: DGExt._location.lat,
                    lng: DGExt._location.lon,
                    key: DGExt.timeServerApiKey,
                    format: 'json'
                }
            };

            kango.xhr.send(requestDetails, function(result) {
                if (result && result.response) {
                    self._initTimer(result.response.timestamp);
                }
            });
        },

        _incrementTime: function() {
            this._currentTime.setTime(this._currentTime.getTime() + (1000 * 60));
        },

        /**
         * Set timer to increment by 1 minute once a minute
         * @param startTime
         * @private
         */
        _initTimer: function(startTime) {
            var self = this;
            this._currentTime = new Date(startTime * 1000 + ((new Date()).getTimezoneOffset() * 60000));
            DGExt.utils.log('Got time: ' + this._currentTime);
            this._timer = setInterval(function() {
                self._incrementTime();
            }, 1000 * 60);
        }
    };
})();