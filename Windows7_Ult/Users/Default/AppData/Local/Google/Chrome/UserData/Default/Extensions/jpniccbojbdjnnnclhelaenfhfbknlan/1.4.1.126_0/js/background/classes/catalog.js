var DGExt = DGExt || {};

(function() {
    "use strict";

    /**
     * Adapter class for two different geo data sources
     */
    DGExt.Catalog = function() {
        this._googleApi = new DGExt.Datasource.GooglePlaces(this);
        this._dgisApi = new DGExt.Datasource.DGis(this);
    };

    /**
     * Прототип
     */
    DGExt.Catalog.prototype = {
        /**
         * 2gis wrapper instance
         */
        _dgisApi: null,

        /**
         * Google places wrapper instance
         */
        _googleApi: null,

        /**
         * Phones result set
         */
        phoneCollection: new DGExt.ResultCollection(),

        /**
         * Cities data
         */
        projects: {},

        /**
         * Cities coordinates
         */
        projectsCoords: [],

        /**
         * Current location's description
         */
        myAddressName: null,

        /**
         * Initialization
         * Should be done when both projects and current location data is ready
         */
        init: function() {
            DGExt.use2GisApi = this._checkApiAvailability();
        },

        /**
         * Check if we can use 2gis api
         */
        _checkApiAvailability: function() {
            if (!DGExt.regionFound) {
                return false;
            }

            for (var i = 0; i < this.projectsCoords.length; i++) {
                var projectCenter = this.projectsCoords[i];
                var distance = DGExt.utils.calculateDistance(
                    DGExt._location.lat,
                    DGExt._location.lon,
                    projectCenter.lat,
                    projectCenter.lon
                );

                if (distance < DGExt.projectRadius) {
                    return true;
                }
            }

            return false;
        },

        /**
         * Fetch cities list into member variables
         * @returns {DGExt.$.Deferred}
         */
        fetchProjectsList: function() {
            var self = this;
            return this._dgisApi.getProjectsList(function(v) {
                self.projectsCoords.push(v);
                self.projects[v.name] = v.code;
            });
        },

        /**
         * Fetch current city (region) id based on previously received user coordinates
         * @returns {DGExt.$.Deferred}
         */
        fetchRegionId: function() {
            var self = this;
            var result = DGExt.$.Deferred();

            this._dgisApi.getRegionId().done(function(regionId, regionName) {
                DGExt._location.regionId = regionId;
                DGExt._location.regionCode = self.projects[regionName];
                DGExt.utils.log('geoPosition: Found region. (' + DGExt._location.regionId + ')');
                result.resolve(regionId);
            }).fail(function() {
                DGExt.utils.log('geoPosition: Region not found.');
                result.reject();
            });

            return result.promise();
        },

        /**
         * Fetch current location description into member variable
         */
        fetchGeoAddress: function() {
            var self = this;
            this._dgisApi.getGeoAddress(function(v) {
                self.myAddressName = v;
            });
        },

        /**
         * Send reply to content script
         * @param result
         * @param [messageName]
         */
        sendResult: function(result, messageName) {
            messageName = messageName || 'resultComplete';
            kango.browser.windows.getAll(function(windows) {
                for (var j in windows) {
                    windows[j].getTabs(function(tabs) {
                        for (var i in tabs) {
                            tabs[i].dispatchMessage(messageName, result);
                        }
                    });
                }
            });
        },

        /**
         * Filter found business entries by coordinates.
         * Remove ones that are not inside an area of any known city
         * @todo unittest
         * @param placesResult
         * @returns {Array}
         * @private
         */
        _findItemsInsideProjects: function(placesResult) {
            var itemsInsideProjects = [];
            for (var j in placesResult) {
                for (var i = 0; i < this.projectsCoords.length; i++) {
                    var projectCenter = this.projectsCoords[i];
                    var distance = DGExt.utils.calculateDistance(
                        placesResult[j].geometry.location.lat(),
                        placesResult[j].geometry.location.lng(),
                        projectCenter.lat,
                        projectCenter.lon
                    );

                    if (distance < DGExt.projectRadius) {
                        itemsInsideProjects.push(placesResult[j]);
                    }
                }
            }
            return itemsInsideProjects;
        },

        /**
         * Select one item of a set by a simple rule
         * @param items
         * @returns {*}
         * @private
         */
        _selectSingleItem: function(items) {
            var selectedItem = null;

            // todo: check if we should select item by distance from current location
            //            var closestDistance = 100000000;
            //            for (var i in items) {
            //                var distance = DGExt.utils.calculateDistance(
            //                    DGExt._location.lat,
            //                    DGExt._location.lon,
            //                    items[i].geometry.location.lat(),
            //                    items[i].geometry.location.lng()
            //                );
            //                if (distance < closestDistance) {
            //                    closestDistance = distance;
            //                    selectedItem = items[i];
            //                }
            //            }

            if (items.length > 0) {
                selectedItem = items[0];
            }

            return selectedItem;
        },

        makeDeferredSearch: function() {
            if (DGExt.use2GisApi) {
                DGExt.utils.log('Got request');
                this._dgisApi.makeDeferredSearch(function() {
                    DGExt.utils.log('Got result');
                });
            }
        },

        /**
         * Get business data by domain
         *
         * @param domain
         * @returns {*|DGExt.$.Deferred}
         */
        processFirm: function(domain) {
            var completed = DGExt.$.Deferred();
            var self = this;

            function success(result) {
                kango.storage.setItem('result', result);
                DGExt.services.popupController.triggerEvent('body', 'dataReceived', result);
                DGExt.services.ga.setParam('rubric', result.firmPrimaryRubric);
                DGExt.utils.log('Saved result:');
                DGExt.utils.log(result);
            }

            function searchInGoogle() {
                self._googleApi.processFirm(domain).done(function(result) {
                    DGExt.utils.log('google:processFirm:success (' + domain + ')');
                    result.done(function(value) {
                        success(value);
                        completed.resolve(DGExt.STATUS_FOUND_IN_GOOGLE);
                    });
                }).fail(function() {
                    DGExt.utils.log('google:processFirm:fail (' + domain + ')');
                    DGExt._firmData.add(domain, null);
                    kango.storage.setItem('result', null);
                    completed.reject(DGExt.STATUS_NOT_FOUND);
                });
            }

            function searchIn2Gis() {
                self._dgisApi.processFirm(domain).done(function(result, status) {
                    kango.storage.setItem('result', null); // set to null to properly reinitialize on another tab
                    DGExt.utils.log('Searching for ' + domain);
                    self._dgisApi.applySearchCache(domain, DGExt._location.regionId);
                    DGExt.utils.log('dgis:processFirm:success (' + domain + ')');
                    result.done(success).fail(searchInGoogle);
                    completed.resolve(status);
                }).fail(searchInGoogle);
            }

            if (DGExt.use2GisApi) {
                searchIn2Gis();
            } else {
                searchInGoogle();
            }

            return completed.promise();
        },

        /**
         * Get business data by phone (for popups in content area)
         *
         * Use 2gis api if we can, else fallback to google places.
         * Also, if nothing found on 2gis, try google places.
         *
         * @param data
         * @returns {*}
         */
        processFirmByPhone: function(data) {
            var completed = DGExt.$.Deferred();
            var self = this;
            var phoneRaw = {
                'link': data.phone.replace(/[^0-9\+]+/g, ''),
                'alias': data.phone
            };

            function success(result) {
                self.phoneCollection.add(data.phone, result);
                self.sendResult({phone: phoneRaw, id: data.id, result: self.phoneCollection.get(data.phone)});
                completed.resolve();
            }

            function error() {
                self.sendResult({phone: phoneRaw, id: data.id, result: null});
                completed.reject();
            }

            ////////////////////////////////////////////////////////

            /**
             * Workaround, see ONLINE-3470
             * @param placesResult
             * @return deferred
             */
            function tryFindInOtherCities(placesResult) {
                var deferred = DGExt.$.Deferred();
                // - find items inside of projects
                // - take one with less distance
                // - get city of that one (belongs to which project?)
                // - try find in that city

                var items = self._findItemsInsideProjects(placesResult);
                var closestItem = self._selectSingleItem(items);

                if (!closestItem) {
                    deferred.reject();
                } else {
                    var location = {
                        lat: closestItem.geometry.location.lat(),
                        lon: closestItem.geometry.location.lng()
                    };
                    self._dgisApi.getRegionId(location).done(function(regionId) {
                        if (+regionId !== +DGExt._location.regionId) {
                            self._dgisApi.processFirmByPhone(data.phone, regionId).done(function(result) {
                                deferred.resolve(result);
                            }).fail(function() {
                                deferred.reject();
                            });
                        } else {
                            deferred.reject();
                        }
                    }).fail(function() {
                        deferred.reject();
                    });
                }

                return deferred.promise();
            }

            ////////////////////////////////////////////////////////

            var phoneDataFromDomain = this.findPhoneInDomainSearchResults(data.phone);
            if (phoneDataFromDomain) {
                success(phoneDataFromDomain);
                return completed.promise();
            }

            if (DGExt.use2GisApi) {
                this._dgisApi.processFirmByPhone(data.phone, DGExt._location.regionId, data.short).done(success).fail(function() {
                    if (data.short) { // do not search short phones on google
                        error();
                        return completed.promise();
                    }
                    self._googleApi.processFirmByPhoneStep1(data.phone).done(function(results, status) {
                        tryFindInOtherCities(results).done(success).fail(function() {
                            self._googleApi.processFirmByPhoneStep2(results, status, data.phone).done(success).fail(error);
                        });
                    }).fail(error);
                });
            } else {
                if (data.short) { // do not search short phones on google
                    error();
                    return completed.promise();
                }
                this._googleApi.processFirmByPhone(data.phone).done(success).fail(error);
            }

            return completed.promise();
        },

        /**
         * Try find phone data in dataset received by domain search
         *
         * @todo mock kango.storage
         * @todo unittest
         * @param phone
         * @returns {*}
         */
        findPhoneInDomainSearchResults: function(phone) {
            var results = kango.storage.getItem('result');
            if (!results || !results.firmContactGroups) {
                return false;
            }

            for (var i = 0; i < results.firmContactGroups.length; i++) {
                if (!results.firmContactGroups[i].contacts.phone) {
                    continue;
                }
                for (var j = 0; j < results.firmContactGroups[i].contacts.phone.length; j++) {
                    if (DGExt.utils.checkPhone(results.firmContactGroups[i].contacts.phone[j].link, phone)) {
                        return results;
                    }
                }
            }

            return false;
        },

        _flampReviewsCache: {},
        /**
         * Get cached reviews, received from flamp.ru previously
         *
         * @param firmId
         * @param count
         * @param _disableAnimation
         * @returns {boolean}
         */
        getCachedFlampReviews: function(firmId, count, _disableAnimation) {
            var cacheKey = firmId + '_' + count;
            if (this._flampReviewsCache[cacheKey]) {
                DGExt.services.popupController.triggerEvent('body', 'reviewsReceived', {reviews: this._flampReviewsCache[cacheKey], disableAnimation: _disableAnimation});
                return true;
            }
        },

        _setCachedFlampReviews: function(firmId, count, data) {
            var cacheKey = firmId + '_' + count;
            this._flampReviewsCache[cacheKey] = data;
        },

        /**
         * @todo mock kango.storage
         * @todo unittest
         * @param reviews
         * @returns {*}
         * @private
         */
        _filterFocusedReview: function(reviews) {
            var firmData = kango.storage.getItem('result');
            if (!firmData || !reviews || !firmData.reviews || !firmData.reviews.flampReviews || !firmData.reviews.flampReviews.length) {
                return reviews;
            }

            var focusedReviewId = firmData.reviews.flampReviews[0].id;
            if (!focusedReviewId) {
                return reviews;
            }

            var filteredReviews = [];
            for (var i = 0; i < reviews.length; i++) {
                if (+reviews[i].id !== +focusedReviewId) {
                    filteredReviews.push(reviews[i]);
                }
            }

            return filteredReviews;
        },

        /**
         * Receive reviews from flamp.ru
         *
         * @param firmId
         * @param count
         * @private
         */
        getFlampReviews: function(firmId, count) {
            var self = this;
            if (this.getCachedFlampReviews(firmId, count, false)) {
                return;
            }

            var details = {
                url: 'http://flamp.ru/api/2.0/filials/' + encodeURIComponent(firmId) + '/reviews',
                method: 'GET',
                contentType: 'json',
                async: true,
                params: {
                    access_token: 'de72ac5b902e0f0b982bbe185170037335f1dace',
                    limit: count
                },
                headers: {
                    'Accept': 'application/json;q=1;depth=1;scopes=user'
                }
            };

            kango.xhr.send(details, function(data) {
                if (data.response && data.response.code === 200 && data.response.reviews) {
                    var reviews = self._filterFocusedReview(data.response.reviews);
                    self._setCachedFlampReviews(firmId, count, reviews);
                    DGExt.services.popupController.triggerEvent('body', 'reviewsReceived', {reviews: reviews, disableAnimation: false});
                } else {
                    self._setCachedFlampReviews(firmId, count, []);
                    DGExt.services.popupController.triggerEvent('body', 'reviewsReceived', {reviews: [], disableAnimation: true});
                }
            });
        }
    };
})();