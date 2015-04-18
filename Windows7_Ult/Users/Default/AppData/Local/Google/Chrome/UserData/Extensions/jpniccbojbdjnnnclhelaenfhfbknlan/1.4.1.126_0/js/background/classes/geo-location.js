var DGExt = DGExt || {};

(function() {
    "use strict";

    /**
     * Geolocation data provider
     * @constructor
     */
    DGExt.GeoLocation = function() {
        if (kango.browser.getName() === 'firefox') {
            // import notification module for firefox to ask user to allow access to geodata: addons.mozilla.org requirement
            Components.utils.import("resource://gre/modules/PopupNotifications.jsm");
        }

        if (DGExt.allowSelfAPI && !DGExt.geoLocationServiceUrl) {
            DGExt.allowSelfAPI = false;
        }
    };

    DGExt.GeoLocation.prototype = {
        providerDeferred:  DGExt.$.Deferred(),
        provider: null,
        _cachedLocation: null,
        _cachedCountryName: null,

        //=================== outcome handlers ========================
        _onPositionReceived: function(position) {
            DGExt._location = { // in safari, lat & lon reside in position itself, not in position.coords
                'lat': position.coords ? position.coords.latitude : position.latitude,
                'lon': position.coords ? position.coords.longitude : position.longitude
            };
            // test case outside of all cities
//            DGExt._location = {
//                'lat': 40.845632,
//                'lon': -115.75736
//            };
//            DGExt._location = {
//                lon: 76.922911,
//                lat: 43.259182
//            };
            DGExt.utils.log('geoPosition: Request done. (' + DGExt._location.lat + ', ' + DGExt._location.lon + ')');
        },

        _onPositionError: function(positionError) {
            DGExt.utils.log('geoPosition: Request error. (' + positionError.code +
                (positionError.message ? ': ' + positionError.message : '') + ')');
        },

        //================== firefox custom prompt code ======================
        _firefox: {
            _preferenceName: 'extensions.2gis.allowGeolocation',
            /**
             * Custom prompt for firefox to ask user for permission on using geolocation
             * @returns {*}
             * @private
             */
            _prompt: function() {
                var result = DGExt.$.Deferred();

                if (!DGExt.firefoxGeolocationPromptEnabled) {
                    result.resolve();
                    return result.promise();
                }

                var branch;
                var done;
                var mainAction;
                var dialogSettings;
                var choiceButtons;
                var notification;
                var self = this;
                var mainWindow = kango.chromeWindows.getChromeWindows()[0];

                branch = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);

                if (branch.getPrefType(this._preferenceName) === branch.PREF_STRING) {
                    switch (branch.getCharPref(this._preferenceName)) {
                        case "always":
                            result.resolve();
                            DGExt.utils.log('Found setting: always allow');
                            return result.promise();
                        case "never":
                            result.reject();
                            DGExt.utils.log('Found setting: always reject');
                            return result.promise();
                    }
                }

                DGExt.utils.log('No setting found');

                done = false;

                /**
                 * Store data into preference
                 * @param value
                 * @returns {Function}
                 */
                function remember(value) {
                    return function() {
                        done = true;
                        branch.setCharPref(self._preferenceName, value);
                        switch (value) {
                            case "always":
                                DGExt.utils.log('Remembered decision: always allow');
                                result.resolve();
                                break;
                            case "never":
                                DGExt.utils.log('Remembered decision: never allow');
                                result.reject();
                                break;
                        }
                    };
                }

                mainAction = {
                    label: DGExt.services.i18n.getMessage('__share_location'),
                    accessKey: "S",
                    callback: function(notification) {
                        DGExt.utils.log('Select by main action: allow');
                        remember("always")();
                    }
                };

                dialogSettings = {
                    eventCallback: function(event) {
                        if (event === "dismissed") {
                            if (!done) {
                                DGExt.utils.log('Selected by dismiss: reject');
                                remember("never")();
                            }
                            done = true;
                            mainWindow.PopupNotifications.remove(notification);
                        }
                    },
                    persistWhileVisible: true
                };

                choiceButtons = [
                    {
                        label: DGExt.services.i18n.getMessage('__always_allow_geolocation'),
                        accessKey: "A",
                        callback: remember("always")
                    },
                    {
                        label: DGExt.services.i18n.getMessage('__never_allow_geolocation'),
                        accessKey: "N",
                        callback: remember("never")
                    }
                ];

                notification = mainWindow.PopupNotifications.show(
                    mainWindow.gBrowser.selectedBrowser,
                    "geolocation",
                    DGExt.services.i18n.getMessage('__addon_wants_to_know_your_geolocation'),
                    "geo-notification-icon",
                    mainAction,
                    choiceButtons,
                    dialogSettings
                );

                return result.promise();
            }
        },

        //================== location change watchers ======================
        /**
         * watcher on current location change
         */
        _locationWatcher: null,
        /**
         * Connection activity flag
         */
        _connectionReady: true,
        /**
         * Connection activity watcher (case: move between wifi aps with temporary connection loss)
         */
        _connectionWatchdogTimer: null,

        /**
         * Initialize location watcher
         * @param onLocationChange
         */
        initLocationWatcher: function(onLocationChange) {
            var self = this;

            this.getProvider().done(function(provider) {
                if (provider) {
                    this._locationWatcher = provider.watchPosition(function(position) {
                        if (!self._positionChangeThresholdPassed(position)) {
                            return;
                        }
                        DGExt.utils.log('Position changed!');
                        self._onPositionReceived(position);
                        onLocationChange();
                    }, function(positionError) {
                        DGExt.utils.log('Position changed, but could not get position...');
                        self._onPositionError(positionError);
                        DGExt.utils.setGeolocationFailStatus();
                        DGExt.utils.changeState(DGExt.STATE_DISABLE, true);
                    });
                }
            }).fail(function() {
                DGExt.utils.log('Provider get failed: Use Self remote provider');
                self.getCurrentPositionFromExternalService(function(position) {
                    self._onPositionReceived(position);
                    onLocationChange();
                }, function(positionError) {
                    self._onPositionError(positionError);
                    DGExt.utils.setGeolocationFailStatus();
                    DGExt.utils.changeState(DGExt.STATE_DISABLE, true);
                });
            });
        },

        /**
         * Initialize connection watcher
         * @param onLocationChange
         */
        initConnectionWatcher: function(onLocationChange) {
            this._initConnectionWatchdog(function() {
                DGExt.utils.log('connection watchdog triggered');
                window.setTimeout(function() {
                    DGExt.utils.log('connection watchdog callback triggered');
                    onLocationChange();
                }, 1000);
            });
        },

        /**
         * Initialize connection watcher
         * @param onStateChange
         * @private
         */
        _initConnectionWatchdog: function(onStateChange) {
            var self = this;
            this._connectionWatchdogTimer = window.setInterval(function() {
                if (!self._connectionReady && window.navigator.onLine) { // подключились, обрабатываем событие
                    onStateChange();
                }
                self._connectionReady = window.navigator.onLine;
            }, 2000);
        },

        /**
         * Determine if we've passed some threshold to consider current place different from the previous one.
         * @todo unittest
         * @param position
         * @returns {boolean}
         * @private
         */
        _positionChangeThresholdPassed: function(position) {
            if (!DGExt._location.lat || !DGExt._location.lon) {
                return true;
            }

            var lat = +(position.coords ? position.coords.latitude : position.latitude);
            var lon = +(position.coords ? position.coords.longitude : position.longitude);
            return !(
                lat.toFixed(4) === (+DGExt._location.lat).toFixed(4) && lon.toFixed(4) === (+DGExt._location.lon).toFixed(4)
            );
        },

        //================== basic geolocation functions ======================

        /**
         * Get geolocation provider
         * @returns {*}
         */
        getProvider: function() {
            var self = this;
            if (this.providerDeferred.state() !== 'pending') {
                return this.providerDeferred.promise();
            }

            // Find and initialize geolocation provider
            try {
                // Check if navigator has geolocation API
                if (typeof(navigator.geolocation) !== 'undefined') {
                    // Firefox doesn't allow to use navigator.geolocation in background, so get in through Components
                    if (kango.browser.getName() === 'firefox') {
                        DGExt.utils.log('geoPosition: Use FireFox service provider');
                        // Check if user allows geolocation
                        this._firefox._prompt().done(function() {
                            // Get provider instance
                            self.provider = Components.classes["@mozilla.org/geolocation;1"].getService(Components.interfaces.nsISupports);
                            self.providerDeferred.resolve(self.provider);
                        }).fail(function() {
                            DGExt.utils.log('geoPosition: Use HTML5 provider rejected by firefox prompt');
                            self.provider = false;
                            self.providerDeferred.reject();
                        });
                    } else {
                        DGExt.utils.log('geoPosition: Use HTML5 provider');
                        self.provider = new DGExt.GeolocationWrapper(navigator.geolocation);
                        self.providerDeferred.resolve(self.provider);
                    }
                } else {
                    self.provider = false;
                    self.providerDeferred.reject();
                }
            } catch (e) {
                DGExt.utils.log(e);
                self.provider = false;
                self.providerDeferred.reject();
            }

            return self.providerDeferred.promise();
        },

        /**
         * Get current location
         *
         * @param success
         * @param error
         * @param opts
         */
        getCurrentPosition: function(success, error, opts) {
            var self = this;
            var providerDeferred = this.getProvider();

            providerDeferred.fail(function() {
                DGExt.utils.log('geoPosition: Use Self remote provider');
                self.getCurrentPositionFromExternalService(success, error);
            });

            providerDeferred.done(function(provider) {
                console.log(provider);
                provider.getCurrentPosition(success, (DGExt.allowSelfAPI ? function() {
                    // Call external geoip if allowed and html5 geolocation didn't work
                    self.getCurrentPositionFromExternalService(success, error);
                } : error), opts);
            });
        },

        /**
         * Get current location by external geoip service
         *
         * @param success
         * @param error
         */
        getCurrentPositionFromExternalService: function(success, error) {
            if (!DGExt.allowSelfAPI) {
                error.call(self, {code: 0, message: "Geolocation service is not accessible"});
                return;
            }

            var details = {
                method: 'GET',
                url: DGExt.geoLocationServiceUrl
            };

            kango.xhr.send(details, function(data) {
                if (+data.status === 200 && data.response) {
                    var lonlat = data.response.split(',');
                    if (data.response.length > 0 && lonlat.length === 2) {
                        success.call(self, {
                            longitude: lonlat[0],
                            latitude: lonlat[1]
                        });
                    } else {
                        if (typeof error === 'function') {
                            error.call(self, {code: 0, message: "Failed to get coords from geolocation service"});
                        }
                    }
                } else {
                    if (typeof error === 'function') {
                        error.call(self, {code: 0, message: "Geolocation service is not accessible"});
                    }
                }
            });
        },

        /**
         * Fetch current location coordinates into DGExt._location
         * @returns {DGExt.$.Deferred}
         */
        fetchGeoLocation: function() {
            var locationComplete = DGExt.$.Deferred();
            var self = this;

            this.getCurrentPosition(function(position) {
                self._onPositionReceived(position);
                locationComplete.resolve();
            }, function(positionError) {
                self._onPositionError(positionError);
                locationComplete.reject();
            }, {timeout: 5000});

            return locationComplete.promise();
        },

        /**
         * Get country code by coordinates
         *
         * @param location
         */
        getCountry: function(location) {
            var result = DGExt.$.Deferred();
            if (!location) {
                result.reject();
                return result.promise();
            }

            if (this._cachedLocation && DGExt.utils.calculateDistance(location.lat, location.lon, this._cachedLocation.lat, this._cachedLocation.lon) < DGExt.locationThreshold) {
                if (this._cachedCountryName) {
                    result.resolve(this._cachedCountryName);
                } else {
                    result.reject();
                }
                return result.promise();
            }

            var details = {
                method: 'GET',
                url: DGExt.reverseGeocodingUrl + location.lat + ',' + location.lon,
                contentType: 'json'
            };

            var self = this;

            self._cachedLocation = location;
            self._cachedCountryName = null;
            kango.xhr.send(details, function(data) {
                if (+data.status === 200 && data.response && data.response.results && data.response.results.length) {
                    var results = data.response.results;
                    if (results[0] && results[0].address_components) {
                        for (var i = 0; i < results[0].address_components.length; i++) {
                            if (-1 !== DGExt.$.inArray('country', results[0].address_components[i].types)) {
                                result.resolve(results[0].address_components[i].short_name);
                                self._cachedCountryName = results[0].address_components[i].short_name;
                                return;
                            }
                        }
                    }
                }
                result.reject();
            });

            return result.promise();
        }
    };
})();