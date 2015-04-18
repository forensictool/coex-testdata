var DGExt = DGExt || {};

(function() {
    "use strict";

    /**
     * Client for background time service
     * @constructor
     */
    DGExt.TimeServiceClient = function() {
        this._currentTime = new Date();
        var self = this;
        self._updateTime();
        this._timer = setInterval(function() {
            self._updateTime();
        }, 11000);
    };

    DGExt.TimeServiceClient.prototype = {
        _currentTime: null,
        _timer: null,

        getTime: function() {
            return this._currentTime;
        },

        _updateTime: function() {
            var self = this;
            kango.invokeAsync('DGExt.services.timeService.getTimestamp', function(result) {
                self._currentTime.setTime(result);
            });
        }
    };
})();