var DGExt = DGExt || {};

(function() {
    "use strict";
    DGExt.Datasource = DGExt.Datasource || {};

    /**
     * Google Places api wrapper
     */
    DGExt.Datasource.GooglePlaces = function(catalog) {
        this._catalog = catalog;
        this._loadScripts();
    };

    DGExt.Datasource.GooglePlaces.prototype = {
        /**
         * parent catalog object
         */
        _catalog: null,

        /**
         * True if all scripts are loaded and we're ready to work with api
         */
        isReady: false,

        /**
         * How much times will we try to load places api
         */
        attempts: 0,
        maxAttempts: 150,

        /**
         * Current location
         */
        mapLocation: null,

        /**
         * Google places api object
         */
        service: null,

        /**
         * Loading scripts from google maps / google places
         * @private
         */
        _loadScripts: function() {
            /* jshint ignore:start */
            // monkey-patch document.write to allow google places api to be loaded correctly into background script
            var _write = document.write;
            document.write = function(el) {
                var src = /^<script.+?src="(.+?)"/ig.exec(el);
                if (src) {
                    var fileref = document.createElement('script');
                    fileref.setAttribute("type", "text/javascript");
                    fileref.setAttribute("src", src[1]);
                    document.getElementsByTagName("head")[0].appendChild(fileref);
                    return null;
                }
                return _write.apply(this, arguments);
            };

            // load places api
            var fileref = document.createElement('script');
            fileref.setAttribute("type", "text/javascript");
            fileref.setAttribute("src", 'https://maps.googleapis.com/maps/api/js?libraries=places&sensor=true');
            document.getElementsByTagName("head")[0].appendChild(fileref);

            // return old handler when everything is loaded
            DGExt.$.ready(function() {
                document.write = _write;
            });
            /* jshint ignore:end */

            this._readyListener();
        },

        /**
         * Querying for api object readiness
         * @private
         */
        _readyListener: function() {
            if (this.attempts > this.maxAttempts) {
                return; // не удалось загрузить сервис
            }

            var resourcesReady = window.google && window.google.maps && google.maps.LatLng &&
                window.google.maps.places && google.maps.places.PlacesService && DGExt._location && DGExt._location.lat;

            if (resourcesReady) {
                this.mapLocation = new google.maps.LatLng(DGExt._location.lat, DGExt._location.lon, true);
                this.service = new google.maps.places.PlacesService(document.createElement('div'));
                this.isReady = true;
                return;
            }

            var self = this;
            setTimeout(function() {
                self.attempts++;
                self._readyListener();
            }, 200);
        },

        /**
         * Get detailed data from received link
         * @param query    link from search response
         * @returns {*}
         */
        _getDetails: function(query) {
            var deferred = DGExt.$.Deferred();
            var request = {
                reference: query.reference,
                __refresh: new Date().getTime()
            };

            this.service.getDetails(request, function(place, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    deferred.resolve({
                        data: place,
                        foundResultsCount: query.foundResultsCount
                    });
                } else {
                    deferred.reject(place);
                }
            });

            return deferred.promise();
        },

        /**
         * Reformat schedule array
         *
         * @param schedule
         * @returns {*}
         * @private
         */
        _formatSchedule: function(schedule) {
            if (!schedule || !schedule.periods) {
                return null;
            }

            var result = {};
            var dayMap = { 0: 'Sun', 1: 'Mon', 2: 'Tue', 3: 'Wed', 4: 'Thu', 5: 'Fri', 6: 'Sat' };
            var roundTheClock = false;

            for (var i = 0; i < schedule.periods.length; i++) {
                var period = schedule.periods[i];
                if (!result[dayMap[period.open.day]]) {
                    result[dayMap[period.open.day]] = {
                        working_hours: [],
                        round_the_clock: false
                    };
                    if (!period.close) {
                        roundTheClock = true;
                        break;
                    }
                }

                if (!result[dayMap[period.open.day]].round_the_clock) {
                    result[dayMap[period.open.day]].working_hours.push({
                        from: period.open.time.substr(0, 2) + ':' + period.open.time.substr(2, 2),
                        to: period.close.time.substr(0, 2) + ':' + period.close.time.substr(2, 2)
                    });
                }
            }

            if (roundTheClock) {
                result = {};
                for (var j = 0; j <= 6; j++) {
                    result[dayMap[j]] = {
                        working_hours: [],
                        round_the_clock: true
                    };
                }
            }

            return result;
        },

        /**
         * Making address from address components
         *
         * @param addressComponents
         * @returns {string}
         * @private
         */
        _formatAddress: function(addressComponents) {
            var streetNumber = '';
            var street = '';
            var city = '';
            var country = '';
            var countryShort = '';

            for (var j = 0; j < addressComponents.length; j++) {
                if (-1 !== DGExt.$.inArray('street_number', addressComponents[j].types)) {
                    streetNumber = addressComponents[j].long_name;
                }
                if (-1 !== DGExt.$.inArray('route', addressComponents[j].types)) {
                    street = addressComponents[j].long_name;
                }
                if (-1 !== DGExt.$.inArray('locality', addressComponents[j].types)) {
                    city = addressComponents[j].long_name;
                }
                if (-1 !== DGExt.$.inArray('country', addressComponents[j].types)) {
                    country = addressComponents[j].long_name;
                    countryShort = addressComponents[j].short_name;
                }
            }

            if (!DGExt._addressFormats[countryShort]) {
                countryShort = 'DEFAULT';
            }

            // single comma deletion hack
            if (!street) {
                street = '###';
            }
            if (!streetNumber) {
                streetNumber = '###';
            }
            if (!city) {
                city = '###';
            }

            var format = DGExt._addressFormats[countryShort];
            return format
                .split('{country}').join(country)
                .split('{city}').join(city)
                .split('{street}').join(street)
                .split('{number}').join(streetNumber)
                .split(', ###').join('')
                .split('###,').join('')
                .split('###').join('');
        },

        /**
         * Get city title from address components
         *
         * @param addressComponents
         * @returns {*}
         * @private
         */
        _getCityName: function(addressComponents) {
            for (var j = 0; j < addressComponents.length; j++) {
                if (-1 !== DGExt.$.inArray('locality', addressComponents[j].types)) {
                    return addressComponents[j].long_name;
                }
            }

            return '';
        },

        /**
         * Get link to static map image
         *
         * @param lat
         * @param lon
         * @param _zoom
         * @param _size
         * @returns {string}
         * @private
         */
        _getMapSrcUrl: function(lat, lon, _zoom, _size) {
            var zoom = _zoom || 15;
            var size = _size || '352x170';
            return 'http://maps.googleapis.com/maps/api/staticmap' + '?center=' + encodeURIComponent(lat) + ',' +
                encodeURIComponent(lon) + '&zoom=' + encodeURIComponent(zoom) + '&size=' + encodeURIComponent(size) +
                '&maptype=roadmap%20' + '&markers=color:green%7C' + encodeURIComponent(lat) + ',' +
                encodeURIComponent(lon) + '&sensor=false';
        },

        /**
         * Get link to external google maps page
         *
         * @param lat
         * @param lon
         * @param firmName
         * @returns {string}
         * @private
         */
        _getMapExternalLink: function(lat, lon, firmName) {
            return 'https://maps.google.com/maps?q=' + encodeURIComponent(firmName) + '&sll=' +
                encodeURIComponent(lat) + ',' + encodeURIComponent(lon) + '&ll=' + encodeURIComponent(lat) + ',' +
                encodeURIComponent(lon);
        },

        /**
         * Get distance in miles
         *
         * @param kmDistance
         * @returns {*}
         * @private
         */
        _getDistanceInMiles: function(kmDistance) {
            if (-1 !== DGExt.$.inArray(DGExt._location.countryCode, DGExt._milesCountries)) {
                return kmDistance * 0.621371192;
            }

            return null;
        },

        /**
         * Compiling all data getting from api to pretty form for pass to view (for toolbar popup)
         * @param firmData
         * @param branchesCount
         * @param _origDomain
         * @returns {Object} - described in resultData variable
         */
        _getResultData: function(firmData, branchesCount, _origDomain) {
            var resultData = {
                id: null,
                firmId: null,
                firmName: null,
                firmAddress: null,
                firmAddressDescription: null,
                firmProject: null,
                firmDistance: null,
                firmDistanceMiles: null,
                firmContactGroups: [],
                firmPayments: [],
                firmStaticMapSrc: null,
                firmBigMapLink: null,
                firmSchedule: null,
                firmFilialsLink: null,
                firmFilialsCount: null,
                firmPrimaryRubric: null,
                firmFlampRecommendationCount: null,
                firmFlampRating: null,
                firmsInRubric: null,
                firmTimezoneOffset: null,
                rubricsLink: null,
                reviews: null,
                myAddressName: null,
                htmlAttributions: DGExt.services.i18n.getMessage('__source_google'),
                source: 'google',
                provider: 'gmaps',
                targetPoint: {
                    lon: null,
                    lat: null
                }
            };

            if (firmData && firmData.website) {
                if (!DGExt.utils.checkWebsite(firmData.website, _origDomain) ||
                    DGExt.utils.urlHasPath(firmData.website)) {
                    DGExt.services.ga._TBSiteNotMatched('Google Places');
                    return null; // domain not matched or there is a path component - don't trust this result set.
                }
            }

            if (firmData && !firmData.website) {
                DGExt.services.ga._TBNoSiteFound('Google Places (' + _origDomain + ')');
                return null;
            }

            if (firmData.utc_offset) {
                resultData.firmTimezoneOffset = firmData.utc_offset;
            }

            if (this._catalog.myAddressName) {
                resultData.myAddressName = this._catalog.myAddressName;
            }

            resultData.id = firmData.id;
            resultData.firmName = firmData.name;
            resultData.firmAddress = this._formatAddress(firmData.address_components);
            resultData.firmProject = this._getCityName(firmData.address_components);

            if (firmData.international_phone_number) {
                resultData.firmContactGroups.push({'contacts': {'phone': [
                    {
                        type: 'phone',
                        link: firmData.international_phone_number,
                        alias: firmData.international_phone_number
                    }
                ]}});
            }

            if (firmData.opening_hours) {
                resultData.firmSchedule = this._formatSchedule(firmData.opening_hours);
            }

            if (firmData.geometry && firmData.geometry.location) {
                var lat = firmData.geometry.location.lat();
                var lon = firmData.geometry.location.lng();

                resultData.targetPoint.lat = lat;
                resultData.targetPoint.lon = lon;

                resultData.firmDistance = DGExt.utils.calculateDistance(DGExt._location.lat, DGExt._location.lon, lat, lon);
                resultData.firmDistanceMiles = this._getDistanceInMiles(resultData.firmDistance);
                resultData.firmStaticMapSrc = this._getMapSrcUrl(lat, lon, null, null);
                resultData.firmBigMapLink = this._getMapExternalLink(lat, lon, firmData.name);
                if (DGExt._location.lat && DGExt._location.lon) {
                    resultData.firmTransToLink = 'https://maps.google.com/maps?daddr=' + encodeURIComponent(lat) + ',' +
                        encodeURIComponent(lon) + '&saddr=' + encodeURIComponent(DGExt._location.lat) + ',' +
                        encodeURIComponent(DGExt._location.lon);
                    resultData.firmTransFromLink = 'https://maps.google.com/maps?daddr=&saddr=' +
                        encodeURIComponent(lat) + ',' + encodeURIComponent(lon);
                }

                resultData.firmFilialsLink = 'https://www.google.com/maps/search/' + encodeURIComponent(_origDomain) +
                    '/@' + encodeURIComponent(lat) + ',' + encodeURIComponent(lon) + ',14z/am=t';
                resultData.firmFilialsCount = /*branchesCount || */0; // todo: disabled google branches count temporarily: search results incompatibility
            }

            var tmpDiv = DGExt.$('<div />');
            var cumulativeRating = 0;

            if (firmData.reviews) {
                var flampReviews = [];

                for (var i = 0; i < firmData.reviews.length; i++) {
                    flampReviews[i] = {};
                    flampReviews[i].reviewAuthor = firmData.reviews[i].author_name;
                    flampReviews[i].reviewAuthorProfileUrl = firmData.reviews[i].author_url;
                    flampReviews[i].reviewDateTime = new Date(firmData.reviews[i].time * 1000).format(DGExt.services.i18n.getMessage('__DATETIME_FORMAT__'));
                    flampReviews[i].reviewCompanyId = firmData.id;
                    flampReviews[i].reviewText = tmpDiv.html(firmData.reviews[i].text).text();
                    flampReviews[i].reviewRating = parseInt(firmData.reviews[i].rating);
                    cumulativeRating += flampReviews[i].reviewRating;
                }

                resultData.reviews = {
                    flampReviewsCount: firmData.user_ratings_total || firmData.reviews.length,
                    flampRating: parseInt(firmData.rating) || (cumulativeRating * 1.0 / firmData.reviews.length),
                    flampReviews: flampReviews,
                    flampReviewsLink: firmData.url
                };
            }

            if (firmData.rating) {
                resultData.firmFlampRating = (firmData.rating / (5 / 100));
            } else if (firmData.reviews) {
                resultData.firmFlampRating = ((cumulativeRating * 1.0 / firmData.reviews.length) / (5 / 100));
            }

            if (firmData.html_attributions &&
                firmData.html_attributions.toString().replace(/^\s+|\s+$/g, '').length > 0) {
                resultData.htmlAttributions = firmData.html_attributions.toString().replace(/^\s+|\s+$/g, '');
            }

            return resultData;
        },

        /**
         * Compiling all data getting from api to pretty form for pass to view (for content area popups)
         * @param data
         * @param _origPhone
         * @returns {*}
         * @private
         */
        _getResultDataByPhone: function(data, _origPhone) {
            if (data.international_phone_number &&
                !DGExt.utils.checkPhone(data.international_phone_number, _origPhone)) {
                DGExt.services.ga._PHPhoneNotMatched('Google Places');
                return null;
            }

            var result = {
                id: data.id,
                firmId: data.id,
                firmName: data.name,
                firmNameParts: {brand: data.name, extension: null},
                firmAddress: data.vicinity,
                firmAddressDescription: data.formatted_address,
                firmProject: null,
                firmDistance: null,
                firmContactGroups: [
                    {
                        'contacts': {
                            'phone': [],
                            'website': []
                        }
                    }
                ],
                firmPayments: [],
                firmStaticMapSrc: null,
                firmTimezoneOffset: null,
                firmBigMapLink: data.url,
                firmSchedule: typeof data.opening_hours !== 'undefined' ? this._getSchedule(data.opening_hours) : null,
                firmFilialsLink: 'barnaul',
                firmFilialsCount: null,
                myAddressName: null,
                reviews: null,
                firmFlampRating: null,
                provider: 'gmaps',
                source: 'google'
            };

            if (data.international_phone_number) {
                result.firmContactGroups[0].contacts.phone.push({
                    type: 'phone',
                    link: data.international_phone_number,
                    alias: data.international_phone_number
                });
            } else {
                return null;
            }

            if (data.utc_offset) {
                result.firmTimezoneOffset = data.utc_offset;
            }

            if (data.website) {
                result.firmContactGroups[0].contacts.website.push({type: 'website', alias: data.website, link: data.website});
            }

            if (data.reviews && data.reviews.length > 0) {
                result.reviews = {
                    flampReviewsCount: data.user_ratings_total || data.reviews.length,
                    flampRating: parseInt(data.rating),
                    flampReviewsLink: data.url
                };
            }

            if (data.rating) {
                result.firmFlampRating = (data.rating / (5 / 100));
            } else if (data.reviews && data.reviews.length > 0) {
                var cumulativeRating = 0;
                for (var i = 0; i < data.reviews.length; i++) {
                    cumulativeRating += parseInt(data.reviews[i].rating);
                }
                result.firmFlampRating = ((cumulativeRating * 1.0 / data.reviews.length) / (5 / 100));
            }

            return result;
        },

        /**
         * Format schedule array
         * @param data
         * @returns {{Sun: null, Mon: null, Tue: null, Wed: null, Thu: null, Fri: null, Sat: null}}
         * @private
         */
        _getSchedule: function(data) {
            var resultData = {
                'Sun': null,
                'Mon': null,
                'Tue': null,
                'Wed': null,
                'Thu': null,
                'Fri': null,
                'Sat': null
            };
            var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            var periods = data.periods;
            var i;

            if (periods.length === 1 && typeof periods[0].close === 'undefined') {
                // 24/7
                for (i in resultData) {
                    resultData[i] = {
                        'round_the_clock': true,
                        'working_hours': []
                    };
                }
            } else {
                for (i in periods) {
                    var day = periods[i];
                    resultData[days[day.open.day]] = {
                        'round_the_clock': false,
                        'working_hours': [
                            {
                                'from': (day.open.hours > 9 ? day.open.hours : '0' + day.open.hours) + ':' +
                                    (day.open.minutes > 9 ? day.open.minutes : '0' + day.open.minutes),
                                'to': (day.close.hours > 9 ? day.close.hours : '0' + day.close.hours) + ':' +
                                    (day.close.minutes > 9 ? day.close.minutes : '0' + day.close.minutes)
                            }
                        ]
                    };
                }
            }

            return resultData;
        },

        ///////////////////////////////////////////////////////////////////////////////////

        /**
         * Get business data by domain (for toolbar button popup)
         *
         * @param domain
         * @returns {DGExt.$.Deferred}
         */
        processFirm: function(domain) {
            var processComplete = DGExt.$.Deferred();
            var dataDeferred = DGExt.$.Deferred();
            var self = this;

            this.processFirmStep1(domain).done(function(results, status) {
                self.processFirmStep2(results, status, domain).done(function(firmData) {
                    dataDeferred.resolve(firmData);
                    processComplete.resolve(dataDeferred);
                }).fail(function() {
                    processComplete.reject();
                });
            }).fail(function() {
                processComplete.reject();
            });

            return processComplete.promise();
        },

        /**
         * Get business data by domain: step 1, search businesses by provided criteria
         *
         * @param domain
         * @returns {*}
         */
        processFirmStep1: function(domain) {
            var processComplete = DGExt.$.Deferred();

            if (!this.isReady) {
                processComplete.reject();
            } else {
                var searchDomain = domain.replace(/^www\./, '');
                searchDomain = searchDomain + ' www.' + searchDomain; // search both www.site.com and site.com
                var request = {
                    location: this.mapLocation,
                    radius: DGExt.firmSearchRadius,
                    query: searchDomain,
                    types: ['establishment'],
                    __refresh: new Date().getTime()
                };

                this.service.textSearch(request, function(results, status) {
                    processComplete.resolve(results, status);
                });
            }

            return processComplete.promise();
        },

        /**
         * Get business data by domain: step 2, select single most satisfactory result and get detailed data
         *
         * @param placesResults
         * @param status
         * @param domain
         * @returns {*}
         */
        processFirmStep2: function(placesResults, status, domain) {
            var self = this;
            var processComplete = DGExt.$.Deferred();
            if (status === google.maps.places.PlacesServiceStatus.OK && placesResults[0].reference) {
                // todo: taking first result, fix it when possible
                self._getDetails({reference: placesResults[0].reference, foundResultsCount: placesResults.length}).done(function(info) {
                    var result = self._getResultData(info.data, info.foundResultsCount, domain);
                    if (result) {
                        DGExt._firmData.add(domain, result);
                        DGExt.services.ga._TBSiteFound('Google Places');
                        processComplete.resolve(DGExt._firmData.get(domain));
                    } else {
                        processComplete.reject();
                    }
                }).fail(function() {
                    processComplete.reject();
                });
            } else {
                processComplete.reject(null);
            }

            return processComplete.promise();
        },

        //////////////////////////////////////////////////////////////////////////////////

        /**
         * Get business data by phone (for content area popups)
         *
         * @param phone
         * @returns {DGExt.$.Deferred}
         */
        processFirmByPhone: function(phone) {
            var processComplete = DGExt.$.Deferred();
            var self = this;

            this.processFirmByPhoneStep1(phone).done(function(results, status) {
                self.processFirmByPhoneStep2(results, status, phone).done(function(firmData) {
                    processComplete.resolve(firmData);
                }).fail(function() {
                    processComplete.reject();
                });
            }).fail(function() {
                processComplete.reject();
            });

            return processComplete.promise();
        },

        /**
         * Get business data by phone: step 1, search businesses by provided criteria
         *
         * @param phone
         * @returns {*}
         */
        processFirmByPhoneStep1: function(phone) {
            var processComplete = DGExt.$.Deferred();
            var request = {
                location: this.mapLocation,
                radius: DGExt.firmSearchRadius,
                query: phone,
                types: ['establishment'],
                __refresh: new Date().getTime()
            };

            if (!this.isReady || DGExt.utils.disableApiPhoneSearch()) {
                processComplete.reject();
            } else {
                this.service.textSearch(request, function(results, status) {
                    processComplete.resolve(results, status);
                });
            }

            return processComplete.promise();
        },

        /**
         * Get business data by phone: step 2, select single most satisfactory result and get detailed data
         *
         * @param placesResults
         * @param status
         * @param phone
         */
        processFirmByPhoneStep2: function(placesResults, status, phone) {
            var self = this;
            var processComplete = DGExt.$.Deferred();

            var success = function(place) {
                var result = self._getResultDataByPhone(place.data, phone);
                if (result) {
                    DGExt.services.ga._PHPhoneFound('Google Places');
                    processComplete.resolve(result);
                } else {
                    DGExt.services.ga._PHPhoneNotFound('Google Places');
                    processComplete.reject();
                }
            };

            var error = function() {
                processComplete.reject();
            };

            if (status === google.maps.places.PlacesServiceStatus.OK &&
                placesResults[0].reference) { // todo: taking first result, fix it when possible
                self._getDetails({reference: placesResults[0].reference, foundResultsCount: placesResults.length}).done(success).fail(error);
            } else {
                error();
            }

            return processComplete.promise();
        }
    };
})();
