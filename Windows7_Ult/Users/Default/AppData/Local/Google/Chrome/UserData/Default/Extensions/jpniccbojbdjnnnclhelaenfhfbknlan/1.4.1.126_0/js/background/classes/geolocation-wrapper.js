var DGExt = DGExt || {};

(function() {
    "use strict";

    /**
     * Geolocation wrapper for some browsers that do not fire
     * error event on timeout expiration
     * @constructor
     */
    DGExt.GeolocationWrapper = function(provider) {
        this._provider = provider;
    };

    DGExt.GeolocationWrapper.prototype = {
        _locationStateResolved: false,
        _resolutionTimer: null,
        _provider: null,
        getCurrentPosition: function(_cb, _err, opts) {
            var self = this;
            var cb = _cb, err = _err;

            if (opts.timeout) {
                cb = function() {
                    window.clearTimeout(self._resolutionTimer);
                    self._resolutionTimer = null;
                    if (!self._locationStateResolved) {
                        self._locationStateResolved = true;
                        _cb.apply(self, arguments);
                    }
                };
                err = function() {
                    window.clearTimeout(self._resolutionTimer);
                    self._resolutionTimer = null;
                    if (!self._locationStateResolved) {
                        self._locationStateResolved = true;
                        _err.apply(self, arguments);
                    }
                };

                self._resolutionTimer = window.setTimeout(err, opts.timeout + 1000); // set a bit longer for good browsers
            }

            return this._provider.getCurrentPosition(cb, err, opts);
        },
        watchPosition: function(cb, err, opts) {
            return this._provider.watchPosition(cb, err, opts);
        },
        clearWatch: function(id) {
            return this._provider.clearWatch(id);
        }
    };
})();