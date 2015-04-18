var DGExt = DGExt || {};

(function() {
    "use strict";
    /**
     * Extension initializer background script
     */
    DGExt.init = function() {
        function updateAll() {
            DGExt.utils.setGeolocationSuccessStatus();
            DGExt.services.timeService.init();

            DGExt.services.gl.getCountry(DGExt._location).done(function(countryCode) {
                DGExt._location.countryCode = countryCode;
            }).fail(function() {
                DGExt._location.countryCode = 'RU';
            });

            var initStep2 = DGExt.services.gis.fetchRegionId();
            // Caution! there may be no region id! Case: user resides outside of all known cities
            initStep2.done(function() {
                DGExt.regionFound = true;
                DGExt.services.gis.init();
                DGExt.services.gis.fetchGeoAddress();
                DGExt.bindEvents();
            }).fail(function() {
                DGExt.regionFound = false;
                DGExt.services.gis.init();
                DGExt.bindEvents();
            });
        }

        /**
         * Initialize data providers and geolocation, bind events and set popup status
         */
        function init() {
            DGExt.utils.setGeolocationLoadingStatus();

            var geoLocationPromise = DGExt.services.gl.fetchGeoLocation();
            var projectsPromise = DGExt.services.gis.fetchProjectsList();

            DGExt.$.when(projectsPromise, geoLocationPromise).done(updateAll);

            projectsPromise.fail(function() {
                DGExt.utils.log('projects list failed :(');
            });

            geoLocationPromise.fail(function() {
                DGExt.utils.setGeolocationFailStatus();
            });
        }

        /**
         * Update data providers, bind events and set popup status
         */
        function update() {
            DGExt.utils.setGeolocationLoadingStatus();

            DGExt.services.gis.fetchProjectsList().done(updateAll).fail(function() {
                DGExt.utils.log('projects list failed :(');
            });
        }

        init(); // do initialization now
        DGExt.services.gl.initConnectionWatcher(init); // reinitialize on connection changes
        DGExt.services.gl.initLocationWatcher(update); // and also update on location changes

        var countryCodesJson = kango.io.getExtensionFileContents("js/trunk_codes.json");
        DGExt._countryPhoneCodes = JSON.parse(countryCodesJson);

        /**
         * Bind events on user interaction
         */
        DGExt.bindEvents = function() {
            if (DGExt._eventsBound) { // don't do this again anyway
                return;
            }

            DGExt._eventsBound = true;
            kango.browser.addEventListener(kango.browser.event.WINDOW_CHANGED, function(event) {
                DGExt.utils.log('EVENT: Window changed');
                try {
                    if (!kango.browser.windows.isNull()) {
                        kango.browser.tabs.getCurrent(function(tab) {
                            if (DGExt.activeTabId === tab.getId()) {
                                return;
                            }
                            DGExt.activeTabId = tab.getId();

                            if (DGExt.utils.eventsDisabledByUrl(event.url)) {
                                DGExt.utils.changeState(DGExt.STATE_DISABLE, true);
                                return;
                            }

                            onChange(tab.getUrl())();
                        });
                    }
                } catch (e) {
                    DGExt.utils.log(e);
                }
            });

            kango.browser.addEventListener(kango.browser.event.TAB_CHANGED, function(event) {
                DGExt.utils.log('EVENT: Tab changed');
                if (DGExt.activeTabId === event.target.getId()) {
                    return;
                }
                DGExt.activeTabId = event.target.getId();

                if (DGExt.utils.eventsDisabledByUrl(event.url)) {
                    DGExt.utils.log('Disabled for url: ' + event.url);
                    DGExt.utils.changeState(DGExt.STATE_DISABLE, true);
                    return;
                }

                onChange(event.url)();
            });

            kango.browser.addEventListener(kango.browser.event.DOCUMENT_COMPLETE, function(event) {
                DGExt.utils.log('EVENT: Document complete');
                if (!kango.browser.windows.isNull()) {
                    kango.browser.windows.getCurrent(function(win) {
                        win.getCurrentTab(function(tab) {
                            if (tab.getId() !== event.target.getId()) {
                                DGExt.utils.log('EVENT: Document complete; Event skipped');
                                return;
                            }
                            DGExt.activeTabId = event.target.getId();

                            if (DGExt.utils.eventsDisabledByUrl(event.url)) {
                                DGExt.utils.log('EVENT: Document complete; Event disabled');
                                DGExt.utils.changeState(DGExt.STATE_DISABLE, true);
                                return;
                            }

                            onChange(event.url)();
                        });
                    });
                }
            });

            kango.browser.addEventListener(kango.browser.event.TAB_LOCATION_CHANGED, function(event) {
                DGExt.utils.log('EVENT: Location changed');
                if (!kango.browser.windows.isNull()) {
                    kango.browser.windows.getCurrent(function(win) {
                        win.getCurrentTab(function(tab) {
                            if (tab.getId() !== event.tabId || typeof event.url === 'undefined') {
                                return;
                            }

                            if (DGExt.utils.eventsDisabledByUrl(event.url)) {
                                DGExt.utils.changeState(DGExt.STATE_DISABLE, true);
                                return;
                            }

                            onChange(event.url)();
                        });
                    });
                }
            });

            kango.browser.addEventListener(kango.browser.event.BEFORE_NAVIGATE, function(event) {
                DGExt.utils.log('EVENT: Before navigate');
                if (!kango.browser.windows.isNull()) {
                    kango.browser.windows.getCurrent(function(win) {
                        win.getCurrentTab(function(tab) {
                            if (tab.getId() !== event.tabId) {
                                return;
                            }

                            if (DGExt.utils.eventsDisabledByUrl(event.url)) {
                                DGExt.utils.changeState(DGExt.STATE_DISABLE, true);
                                return;
                            }

                            DGExt.utils.changeState(DGExt.STATE_LOAD, true);
                        });
                    });
                }
            });
        };

        /**
         * Event handler for change url events.
         * Perform checking active domain, getting results and setting it to storage.
         * This is the main method which starts all process.
         *
         * Returns deferred object to pass into critical section.
         * There is an event serialization issue because of several calls of onChange inside of short time interval
         * and race condition of same function calls. This is why we need critical section.
         */
        function onChange(url) {
            return function() {
                DGExt._dataFetchFinished = false;
                var complete = DGExt.$.Deferred();

                var domain = DGExt.utils.parseDomain(url);
                DGExt.utils.log("Parsed domain: " + domain);
                DGExt.currentDomain = domain;

                if (!domain) {
                    DGExt.utils.changeState(DGExt.STATE_DISABLE, true);
                    complete.resolve();
                    DGExt._dataFetchFinished = true;
                    return;
                }

                if (DGExt._firmData.hasValue(domain)) {
                    if (DGExt.activeDomain !== domain) {
                        var result = DGExt._firmData.get(domain);
                        kango.storage.setItem('result', result);
                        DGExt.services.ga.setParam('rubric', result.firmPrimaryRubric);
                        DGExt.activeDomain = domain;
                    }

                    DGExt.utils.changeState(DGExt.STATE_ENABLE, true);
                    complete.resolve();
                    DGExt._dataFetchFinished = true;
                    return;
                }

                if (DGExt.utils.searchByDomainIngored(domain)) {
                    DGExt.utils.changeState(DGExt.STATE_DISABLE, true);
                    complete.resolve();
                    DGExt._dataFetchFinished = true;
                    return;
                }

                DGExt.utils.changeState(DGExt.STATE_DISABLE);
                DGExt.activeDomain = null;

                if (DGExt._firmData.hasAttempt(domain)) {
                    DGExt.utils.changeState(DGExt.STATE_LOAD);
                    DGExt.services.gis.processFirm(domain).done(function(status) {
                        DGExt.utils.log('outer:gis:processFirm:success - ' + domain);
                        DGExt.activeDomain = domain;
                        DGExt.utils.changeState(DGExt.STATE_ENABLE, (status === DGExt.STATUS_FOUND_IN_LOCAL_CACHE));
                        DGExt._dataFetchFinished = true;
                        complete.resolve();
                    }).fail(function(status) {
                        DGExt.utils.log('outer:gis:processFirm:fail - ' + domain);
                        DGExt.utils.changeState(DGExt.STATE_DISABLE, (status === DGExt.STATUS_FOUND_IN_LOCAL_CACHE));
                        DGExt._dataFetchFinished = true;
                        complete.resolve();
                    });
                } else {
                    DGExt._dataFetchFinished = true;
                    complete.resolve();
                }

                return complete.promise();
            };
        }
    };
})();
