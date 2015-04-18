var DGExt = DGExt || {};

(function() {
    "use strict";

    DGExt.Datasource = DGExt.Datasource || {};

    /**
     * Service class for 2gis api
     */
    DGExt.Datasource.DGis = function(catalog) {
        this._catalog = catalog;
    };

    DGExt.Datasource.DGis.prototype = {
        /**
         * parent catalog
         */
        _catalog: null,

        _geoAddressCache: {
            location: null,
            data: null
        },

        _regionIdCache: {
            location: null,
            data: null
        },

        _domainCache: {},
        _domainApiCache: {},
        _searchConditionsCache: {},

        _searchConditions: {
            regionId: null,
            deferred: null
        },

        linksFormatter: function(regionId, domain, firmName, firmProject, firmId, firmAddress, branchId, point, rubrics, myAddressName) {
            var reply = {};
            reply.firmFilialsLink = 'http://' + domain + '/' + encodeURIComponent(firmProject) + '/branches/' +
                encodeURIComponent(firmId) + '/' +
                '?utm_source=toolbar&utm_medium=branches&utm_campaign=extension';

            if (point && point.lat && point.lon) {
                reply.firmBigMapLink = 'http://' + domain + '/' + encodeURIComponent(firmProject) + '/firm/' +
                    encodeURIComponent(branchId) + '/center/' + encodeURIComponent(point.lon) + ',' +
                    encodeURIComponent(point.lat) + '/zoom/16/' +
                    '?utm_source=toolbar&utm_medium=address_map&utm_campaign=extension';

                if (rubrics && rubrics.length > 0) {
                    reply.rubricsLink = 'http://' + domain + '/' + encodeURIComponent(firmProject) +
                        '/search/rubricId/' + encodeURIComponent(rubrics[0].id) + '/center/' +
                        encodeURIComponent(point.lon) + ',' + encodeURIComponent(point.lat) + '/zoom/11/' +
                        '?utm_source=toolbar&utm_medium=rubric&utm_campaign=extension';
                }

                if (DGExt._location.lat && DGExt._location.lon && DGExt._location.regionCode === firmProject) {
                    reply.firmTransToLink = 'http://' + domain + '/' + encodeURIComponent(DGExt._location.regionCode) +
                        '/routeSearch/center/' + encodeURIComponent(DGExt._location.lon) + ',' +
                        encodeURIComponent(DGExt._location.lat) + '/zoom/14/routeTab/rsType/car' + '/from/' +
                        encodeURIComponent(DGExt._location.lon) + ',' + encodeURIComponent(DGExt._location.lat) +
                        '%E2%95%8E' +
                        encodeURIComponent(myAddressName || 'Мое местоположение').replace('%2F', "%C2%A6") +
                        '/to/' + encodeURIComponent(point.lon) + ',' + encodeURIComponent(point.lat) +
                        '%E2%95%8E' + encodeURIComponent(firmName).replace('%2F', "%C2%A6") +
                        '?utm_source=toolbar&utm_medium=route_to&utm_campaign=extension';

                    reply.firmTransFromLink = 'http://' + domain + '/' + encodeURIComponent(DGExt._location.regionCode) +
                        '/center/' + encodeURIComponent(point.lon) + ',' + encodeURIComponent(point.lat) +
                        '/zoom/14/routeTab/from/' + encodeURIComponent(point.lon) + ',' +
                        encodeURIComponent(point.lat) + '%E2%95%8E' +
                        encodeURIComponent(firmName).replace('%2F', "%C2%A6") +
                        '?utm_source=toolbar&utm_medium=route_from&utm_campaign=extension';
                }
            }

            return reply;
        },

        /**
         * Compiling all data getting from api to pretty form for pass to view
         *
         * @param branchId
         * @param main
         * @param card
         * @param firmsInRubric
         * @param regionId
         * @returns {Object} - described in resultData variable
         */
        _getResultData: function(branchId, main, card, firmsInRubric, regionId) {
            var resultData = {
                id: null,
                firmId: null,
                firmName: null,
                firmAddress: null,
                firmAddressDescription: null,
                firmProject: null,
                firmDistance: null,
                firmContactGroups: [],
                firmPayments: [],
                firmStaticMapSrc: null,
                firmBigMapLink: null,
                firmSchedule: null,
                firmFilialsLink: 'barnaul',
                firmFilialsCount: null,
                firmPrimaryRubric: null,
                firmFlampRecommendationCount: null,
                firmFlampRating: null,
                firmsInRubric: null,
                rubricsLink: null,
                reviews: null,
                firmTimezoneOffset: null,
                myAddressName: '',
                htmlAttributions: '',
                source: '2gis',
                reg_bc_url: null,
                targetPoint: {
                    lon: card.point ? card.point.lon : null,
                    lat: card.point ? card.point.lat : null
                }
            };

            var i;
            var domain = '2gis.ru';

            if (this._catalog.myAddressName) {
                resultData.myAddressName = this._catalog.myAddressName;
            }

            resultData.id = branchId;
            resultData.firmName = main.name;

            for (var n = 0; n < this._catalog.projectsCoords.length; n++) {
                if (+this._catalog.projectsCoords[n].id === +regionId) {
                    domain = '2gis.' + this._catalog.projectsCoords[n].domain;
                    resultData.firmProject = this._catalog.projectsCoords[n].code;
                    resultData.firmProjectTitle = this._catalog.projectsCoords[n].name;
                    resultData.firmTimezoneOffset = this._catalog.projectsCoords[n].timezone;
                    break;
                }
            }

            if (main.address_name) {
                var projectTitle = '';
                if (+resultData.firmProject !== +DGExt._location.regionId) {
                    projectTitle = ', ' + resultData.firmProjectTitle;
                }
                resultData.firmAddress = main.address_name + projectTitle;
            }

            if (main.address_comment) {
                resultData.firmAddressDescription = main.address_comment;
            }

            resultData.htmlAttributions = DGExt.services.i18n.getMessage('__source_2gis_{rootdomain}', {'rootdomain': domain});

            if (card.point) {
                resultData.firmDistance = DGExt.utils.calculateDistance(DGExt._location.lat, DGExt._location.lon, card.point.lat, card.point.lon);
            } else {
                DGExt.services.ga._TBCoordinatesAbsent('2GIS');
            }

            if (card.reg_bc_url) {
                resultData.reg_bc_url = card.reg_bc_url;
            }

            var foundWebsites = [];

            if (card.contact_groups) {
                for (i = 0; i < card.contact_groups.length; i++) {
                    var contactGroup = card.contact_groups[i];

                    var contacts = {};
                    for (var j = 0; j < contactGroup.contacts.length; j++) {
                        var contactType = contactGroup.contacts[j].type;
                        if (-1 !== DGExt.$.inArray(contactType, ['phone', 'fax', 'email'])) {
                            if (!contacts[contactType]) {
                                contacts[contactType] = [];
                            }
                            contacts[contactType].push({
                                type: contactType,
                                link: contactGroup.contacts[j].value,
                                alias: contactGroup.contacts[j].text || contactGroup.contacts[j].value,
                                comment: contactGroup.contacts[j].comment || '',
                                reg_bc_url: contactGroup.contacts[j].reg_bc_url || undefined
                            });
                        } else if (contactType === 'website') {
                            foundWebsites.push(contactGroup.contacts[j].text ||
                                contactGroup.contacts[j].value.replace(/http:\/\/link\.2gis\.ru.*https?:\/\//, ''));
                        }
                    }

                    resultData.firmContactGroups[i] = {};

                    if (contactGroup.name) {
                        resultData.firmContactGroups[i].name = contactGroup.name;
                    }
                    resultData.firmContactGroups[i].contacts = contacts;
                }
            }

            for (i = 0; i < foundWebsites.length; i++) {
                if (DGExt.utils.urlHasPath(foundWebsites[i])) {
                    // don't trust the source if any single address contains path.
                    return null;
                }
            }

            if (card.schedule) {
                resultData.firmSchedule = this._formatSchedule(card.schedule);
            }

            if (card.reviews && card.reviews.rating) {
                resultData.firmFlampRating = (card.reviews.rating / (5 / 100));
            }

            if (card.reviews && card.reviews.recommendation_count) {
                resultData.firmFlampRecommendationCount = card.reviews.recommendation_count;
            }

            resultData.firmId = card.org.id;
            resultData.firmFilialsCount = card.org.branch_count;

            if (card.rubrics && card.rubrics.length > 0 && firmsInRubric.items[0] && firmsInRubric.items[0].branch_count) {
                resultData.firmPrimaryRubric = card.rubrics[0].name; // todo: decided to take the first rubric of a set, fix this when possible
                resultData.firmsInRubric = firmsInRubric.items[0].branch_count;
            } else {
                resultData.firmPrimaryRubric = '';
                resultData.firmsInRubric = 0;
            }

            DGExt.$.extend(resultData, this.linksFormatter(
                regionId, domain,
                resultData.firmName, resultData.firmProject, resultData.firmId, resultData.firmAddress, resultData.id,
                card.point, card.rubrics, resultData.myAddressName
            ));

            if (card.reviews && card.reviews.focused_review) {
                var regBcUrl;
                if (card.reviews && card.reviews.reg_bc_url) {
                    regBcUrl = card.reviews.reg_bc_url;
                }

                var flampReviews = [{
                    id: card.reviews.focused_review.flamp_id,
                    reviewAuthor: card.reviews.focused_review.user.name,
                    reviewAuthorProfileUrl: 'http://flamp.ru/user' + card.reviews.focused_review.user.flamp_id + '?utm_source=toolbar&utm_medium=reviews_author&utm_campaign=extension',
                    reviewDateTime: new Date(Date.parse(card.reviews.focused_review.created_at)).format(DGExt.services.i18n.getMessage('__DATETIME_FORMAT__')),
                    reviewRating: parseInt(card.reviews.focused_review.rating),
                    reviewText: card.reviews.focused_review.text
                }];

                var reviewsCount = card.reviews.review_count || flampReviews.length;
                if (parseInt(reviewsCount) > 0) {
                    resultData.reviews = {
                        reg_bc_url: regBcUrl,
                        flampReviewsCount: reviewsCount,
                        flampRating: parseInt(card.reviews.rating),
                        flampReviews: flampReviews,
                        flampReviewsLink: 'http://flamp.ru/r/' + encodeURIComponent(resultData.id) + '?utm_source=toolbar&utm_medium=reviews&utm_campaign=extension'
                    };
                }
            }

            return resultData;
        },

        /**
         * Reformat schedule array
         *
         * @param schedule
         * @returns {*}
         * @private
         */
        _formatSchedule: function(schedule) {
            if (!schedule) {
                return null;
            }

            for (var i in schedule) {
                if (-1 === ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].indexOf(i)) {
                    continue;
                }
                if (schedule.is_24x7) {
                    schedule[i].round_the_clock = true;
                }

                if (!schedule[i].working_hours) {
                    schedule[i].working_hours = [];
                }
            }

            return schedule;
        },

        /**
         * Compiling all data getting from api BY PHONE to pretty form for pass to view
         * @param branchId
         * @param main
         * @param card
         * @param _origPhone
         * @param _regionId
         * @returns {Object} - described in resultData variable
         */
        _getResultDataByPhone: function(branchId, main, card, _origPhone, _regionId) {
            var resultData = {
                id: null,
                firmId: null,
                firmName: null,
                firmNameParts: null,
                firmAddress: null,
                firmAddressDescription: null,
                firmProject: null,
                firmDistance: null,
                firmContactGroups: [],
                firmPayments: [],
                firmStaticMapSrc: null,
                firmBigMapLink: null,
                firmSchedule: null,
                firmFilialsLink: 'barnaul',
                firmFilialsCount: null,
                myAddressName: '',
                reviews: null,
                firmTimezoneOffset: null,
                firmFlampRecommendationCount: null,
                firmFlampRating: null,
                source: '2gis',
                reg_bc_url: null
            };

            var i;
            var domain = '2gis.ru';

            if (this._catalog.myAddressName) {
                resultData.myAddressName = this._catalog.myAddressName;
            }

            resultData.id = branchId;
            resultData.firmName = main.name;
            resultData.firmNameParts = card.name_ex;

            if (main.address_name) {
                resultData.firmAddress = main.address_name;
            }

            if (main.address_comment) {
                resultData.firmAddressDescription = main.address_comment;
            }

            for (var n = 0; n < this._catalog.projectsCoords.length; n++) {
                if (+this._catalog.projectsCoords[n].id === +_regionId) {
                    domain = '2gis.' + this._catalog.projectsCoords[n].domain;
                    resultData.firmProject = this._catalog.projectsCoords[n].code;
                    resultData.firmTimezoneOffset = this._catalog.projectsCoords[n].timezone;
                    break;
                }
            }

            if (card.point) {
                resultData.firmDistance = DGExt.utils.calculateDistance(DGExt._location.lat, DGExt._location.lon, card.point.lat, card.point.lon);
            }

            if (card.reg_bc_url) {
                resultData.reg_bc_url = card.reg_bc_url;
            }

            if (card.contact_groups) {
                for (i = 0; i < card.contact_groups.length; i++) {
                    var contactGroup = card.contact_groups[i];

                    var contacts = {};
                    for (var j = 0; j < contactGroup.contacts.length; j++) {
                        var contactType = contactGroup.contacts[j].type;
                        if (-1 !== DGExt.$.inArray(contactType, ['phone', 'fax', 'email', 'website'])) {
                            if (!contacts[contactType]) {
                                contacts[contactType] = [];
                            }

                            contacts[contactType].push({
                                type: contactType,
                                link: contactGroup.contacts[j].value,
                                alias: contactGroup.contacts[j].text || contactGroup.contacts[j].value,
                                comment: contactGroup.contacts[j].comment || '',
                                reg_bc_url: contactGroup.contacts[j].reg_bc_url || undefined
                            });
                        }
                    }

                    resultData.firmContactGroups[i] = {};

                    if (contactGroup.name) {
                        resultData.firmContactGroups[i].name = contactGroup.name;
                    }
                    resultData.firmContactGroups[i].contacts = contacts;
                }
            }

            if (card.schedule) {
                resultData.firmSchedule = this._formatSchedule(card.schedule);
            }

            if (card.reviews && card.reviews.rating) {
                resultData.firmFlampRating = (card.reviews.rating / (5 / 100));
            }

            if (card.reviews && card.reviews.recommendation_count) {
                resultData.firmFlampRecommendationCount = card.reviews.recommendation_count;
            }

            resultData.firmId = card.org.id;
            resultData.firmFilialsCount = card.org.branch_count;

            DGExt.$.extend(resultData, this.linksFormatter(
                _regionId, domain,
                resultData.firmName, resultData.firmProject, resultData.firmId, resultData.firmAddress, resultData.id,
                card.point, card.rubrics, resultData.myAddressName
            ));

            if (card.reviews && card.reviews.review_count > 0) {
                var regBcUrl;
                if (card.reviews.reg_bc_url) {
                    regBcUrl = card.reviews.reg_bc_url;
                }
                resultData.reviews = {
                    reg_bc_url: regBcUrl,
                    flampReviewsCount: card.reviews.review_count,
                    flampRating: parseInt(card.reviews.rating),
                    flampReviewsLink: 'http://flamp.ru/r/' + encodeURIComponent(resultData.id) +
                        '?utm_source=phone&utm_medium=reviews&utm_campaign=extension'
                };
            }

            return resultData;
        },

        /**
         * Search other businesses in current rubric
         *
         * @param rubric
         * @param callback
         * @param error
         * @returns {DGExt.$.Deferred}
         * @private
         */
        _searchFirmsInRubric: function(rubric, callback, error) {
            return this._apiRequest('catalog/rubric/get', {
                output: 'json',
                id: rubric,
                fields: 'items.rubrics',
                key: DGExt.webApiKey
            }, callback, error);
        },

        /**
         * Search business by domain, api request
         *
         * @param domain
         * @param regionId
         * @param callback
         * @param error
         * @returns {DGExt.$.Deferred}
         * @private
         */
        _searchFirmByDomain: function(domain, regionId, callback, error) {
            return this._apiRequest('catalog/branch/search', {
                output: 'json',
                q: domain,
                region_id: regionId,
                sort: 'distance',
                sort_point: DGExt._location.lon + ',' + DGExt._location.lat,
                page_size: 50,
                has_site: true,
                fields: 'items.contact_groups,items.point',
                key: DGExt.webApiKey
            }, callback, error);
        },

        /**
         * Search business by phone, api request
         *
         * @param phone
         * @param regionId
         * @param callback
         * @param error
         * @returns {DGExt.$.Deferred}
         * @private
         */
        _searchFirmByPhone: function(phone, regionId, callback, error) {
            return this._apiRequest('catalog/branch/search', {
                output: 'json',
                q: phone,
                region_id: regionId,
                sort: 'relevance',
                page_size: 1,
                key: DGExt.webApiKey
            }, callback, error);
        },

        /**
         * Make addiitional request to count card views
         *
         * @param id
         * @param callback
         * @returns {DGExt.$.Deferred}
         * @private
         */
        _searchFirmCard: function(id, callback) {
            var params = {
                output: 'json',
                id: id,
                fields: [
                    'items.name_ex', 'items.adm_div', 'items.point', 'items.reviews', 'items.org'
                ].join(','),
                key: DGExt.webApiKey
            };
            return this._apiRequest('catalog/branch/get', params, callback);
        },

        /**
         * Request to 2gis api
         *
         * @param method - 2.0 api method
         * @param params - api request params
         * @param callback
         * @param [error]
         * @returns {DGExt.$.Deferred}
         */
        _apiRequest: function(method, params, callback, error) {
            var self = this;
            var deferred = DGExt.$.Deferred();
            var details = {
                url: 'http://catalog.api.2gis.ru/2.0/' + encodeURIComponent(method),
                method: 'GET',
                async: true,
                contentType: 'json',
                params: params
            };

            kango.xhr.send(details, function(data) {
                if (+data.status === 200 && data.response && +data.response.meta.code === 200) {
                    if (DGExt.$.isFunction(callback)) {
                        callback.call(self, data.response.result);
                    }
                } else {
                    if (DGExt.$.isFunction(error)) {
                        error.call(self, data);
                    }
                }
                deferred.resolve(data);
            });

            return deferred.promise();
        },

        /**
         * Format cities array element
         *
         * @param projectData
         * @private
         */
        _makeProjectDataset: function(projectData) {
            var lon = null, lat = null;
            if (projectData.default_pos) {
                lon = projectData.default_pos.lon;
                lat = projectData.default_pos.lat;
            }

            return {
                lon: lon,
                lat: lat,
                name: projectData.name || null,
                code: projectData.code || null,
                id: projectData.id || null,
                domain: projectData.domain || '.ru',
                timezone: projectData.time_zone.offset || null
            };
        },

        /**
         * Get websites from contact groups array
         *
         * @param contactGroups
         * @private
         */
        _getWebsites: function(contactGroups) {
            var foundWebsites = [];
            for (var i = 0; i < contactGroups.length; i++) {
                var contactGroup = contactGroups[i];
                for (var j = 0; j < contactGroup.contacts.length; j++) {
                    var contactType = contactGroup.contacts[j].type;
                    if (contactType === 'website') {
                        var siteAddr = contactGroup.contacts[j].text || contactGroup.contacts[j].value.replace(/http:\/\/link\.2gis\.ru.*https?:\/\//, '');
                        if (!DGExt.utils.urlHasPath(siteAddr)) {
                            foundWebsites.push(siteAddr);
                        }
                    }
                }
            }

            return foundWebsites;
        },

        /**
         * Find closest branch that has site matching current domain
         *
         * @param items
         * @private
         */
        _findClosestBranchWithMatchingSite: function(items) {
            var closestBranchIndex = -1;
            var closestBranchDistance = 100000000;
            for (var i = 0; i < items.length; i++) {
                if (!items[i].point) {
                    continue;
                }

                var sites = this._getWebsites(items[i].contact_groups);
                if (sites.length === 0) {
                    continue;
                }

                var dist = DGExt.utils.calculateDistance(DGExt._location.lat, DGExt._location.lon, items[i].point.lat, items[i].point.lon);
                if (dist < closestBranchDistance) {
                    closestBranchDistance = dist;
                    closestBranchIndex = i;
                }
            }

            if (closestBranchIndex === -1) { // no good branch found
                closestBranchIndex = 0;
            }

            return items[closestBranchIndex];
        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /**
         * Perform request to 2.0 version api to get all projects
         * @returns {DGExt.$.Deferred}
         */
        getProjectsList: function(addCallback) {
            var self = this;
            var complete = DGExt.$.Deferred();
            var cachedData = kango.storage.getItem('_cached_projectList');
            var CACHE_TIME = 1000 * 60 * 60 * 24 * 7; // 1 week
            if (cachedData && (new Date().getTime() - cachedData.lastUpdate) < CACHE_TIME) {
                for (var i = 0; i < cachedData.result.length; i++) {
                    if (DGExt.$.isFunction(addCallback)) {
                        addCallback(self._makeProjectDataset(cachedData.result[i]));
                    }
                }
                complete.resolve();
            } else {
                var params = {
                    key: DGExt.webApiKey,
                    fields: 'items.default_pos,items.code,items.domain,items.time_zone'
                };
                this._apiRequest('region/list', params, function(result) {
                    kango.storage.setItem('_cached_projectList', {
                        lastUpdate: new Date().getTime(),
                        result: result.items
                    });
                    for (var i = 0; i < result.items.length; i++) {
                        if (DGExt.$.isFunction(addCallback)) {
                            addCallback(self._makeProjectDataset(result.items[i]));
                        }
                    }
                    complete.resolve();
                }, function() {
                    complete.resolve();
                });
            }

            return complete.promise();
        },

        /**
         * Get address by coordinates for small navigation popup
         */
        getGeoAddress: function(successCallback) {
            var location = this._geoAddressCache.location;
            if (location && DGExt.utils.calculateDistance(location.lat, location.lon,  DGExt._location.lat, DGExt._location.lon) < DGExt.locationThreshold) {
                if (this._geoAddressCache.data) {
                    successCallback(this._geoAddressCache.data);
                }
                return;
            }

            var self = this;
            this._geoAddressCache.location = DGExt._location;
            this._geoAddressCache.data = null;

            var params = {
                point: DGExt._location.lon + ',' + DGExt._location.lat,
                radius: 30,
                type: 'building,street,adm_div.city,adm_div.place',
                key: DGExt.webApiKey
            };

            this._apiRequest('geo/search', params, function(result) {
                var priority = { // set priorities as object size, we should take the smallest one
                    'adm_div.city': 1,
                    'adm_div.place': 2, // place (ex. left bank)
                    'street': 3,
                    'building': 4
                };
                var maxPriority = 0;
                var value = null;
                for (var i = 0; i < result.items.length; i++) {
                    var key = result.items[i].type +
                        (result.items[i].subtype ? '.' + result.items[i].subtype : '');
                    if (priority[key] > maxPriority) {
                        maxPriority = priority[key];
                        value = result.items[i].full_name;
                    }
                }

                if (value) {
                    self._geoAddressCache.data = value;
                    successCallback(value);
                }
            });
        },

        /**
         * Get city id by provided location
         * @param _location
         * @returns {*}
         */
        getRegionId: function(_location) {
            var self = this;
            var deferred = DGExt.$.Deferred();
            var location = _location || DGExt._location;

            if (!location.lat || !location.lon) {
                deferred.reject();
                return deferred.promise();
            }

            if (this._regionIdCache.location && DGExt.utils.calculateDistance(location.lat, location.lon,  this._regionIdCache.location.lat, this._regionIdCache.location.lon) < DGExt.locationThreshold) {
                if (this._regionIdCache.data) {
                    deferred.resolve(this._regionIdCache.data.id, this._regionIdCache.data.name);
                } else {
                    deferred.reject();
                }
                return deferred.promise();
            }

            this._regionIdCache.location = location;
            this._regionIdCache.data = null;

            var params = {
                q: location.lon + ',' + location.lat,
                'key': DGExt.webApiKey
            };

            this._apiRequest('region/search', params, function(result) {
                if (result && result.items && result.items[0]) {
                    self._regionIdCache.data = result.items[0];
                    deferred.resolve(result.items[0].id, result.items[0].name);
                } else {
                    deferred.reject();
                }
            }, function() {
                deferred.reject();
            });

            return deferred.promise();
        },

        /**
         * Search firm by domain service
         * @param domain
         * @param success
         * @param fail
         * @returns {*}
         * @private
         */
        _searchFirmByDomainBasic: function(domain, success, fail) {
            success = DGExt.$.isFunction(success) ? success : function() {};
            fail = DGExt.$.isFunction(fail) ? fail : function() {};

            if (this._domainCache[domain] !== undefined) {
                if (this._domainCache[domain]) {
                    success.call(this, this._domainCache[domain], DGExt.STATUS_FOUND_IN_LOCAL_CACHE);
                } else {
                    fail.call(this, this._domainCache[domain], DGExt.STATUS_FOUND_IN_LOCAL_CACHE);
                }
                return;
            }

            var self = this;
            var details = {
                url: 'http://extension.2gis.ru/' + encodeURIComponent(domain),
                method: 'GET',
                async: true
            };

            kango.xhr.send(details, function(data) {
                if (+data.status === 200 && data.response) {
                    var resp = data.response.split(',');
                    for (var i in resp) {
                        resp[i] = {
                            id: resp[i].split(':')[0],
                            region: resp[i].split(':')[1]
                        };
                    }
                    self._domainCache[domain] = resp;
                    success.call(self, resp, DGExt.STATUS_FOUND_IN_2GIS);
                } else {
                    self._domainCache[domain] = null;
                    fail.call(self, self._domainCache[domain], DGExt.STATUS_FOUND_IN_2GIS);
                }
            });
        },

        _saveSearchCondition: function() {
            var cacheKey = this._searchConditions.domain + this._searchConditions.regionId;
            this._searchConditionsCache[cacheKey] = DGExt.$.extend({}, this._searchConditions); // need shallow clone here
        },

        /**
         * Apply saved cache to current search conditions
         * Should be made on tab|window change - will work, because deferred is resolved externally
         *
         * @param domain
         * @param regionId
         */
        applySearchCache: function(domain, regionId) {
            var cacheKey = domain + regionId;
            if (this._searchConditionsCache[cacheKey]) {
                this._searchConditions = DGExt.$.extend({}, this._searchConditionsCache[cacheKey]); // need shallow clone here
                return true;
            }

            return false;
        },

        /**
         * Init search with firm by region id
         * @param domain
         * @param firmList
         * @param currentRegionId
         * @private
         */
        _initSearchByFirmList: function(domain, firmList, currentRegionId) {
            if (this.applySearchCache(domain, currentRegionId)) {
                return this._searchConditions.deferred;
            }

            // First we find region with max priority
            var regionPriority = {
                32: 5,
                38: 4,
                1: 3,
                7: 2
            };
            regionPriority[currentRegionId] = 6;

            var maxPriority = 0, maxPriorityRegion = null, firmId = null;
            for (var i in firmList) {
                if (!regionPriority[firmList[i].region] && maxPriority < 1) { // priority = 1 for all other regions
                    maxPriorityRegion = firmList[i].region;
                    firmId = firmList[i].id;
                    maxPriority = 1;
                } else if (regionPriority[firmList[i].region] > maxPriority) {
                    maxPriorityRegion = firmList[i].region;
                    firmId = firmList[i].id;
                    maxPriority = regionPriority[maxPriorityRegion];
                }
            }

            // Then init search conditions

            this._searchConditions.regionId = maxPriorityRegion;
            this._searchConditions.firmId = firmId;
            this._searchConditions.domain = domain;
            this._searchConditions.deferred = DGExt.$.Deferred(); // should be resolved on popup init!
            this._saveSearchCondition();

            return this._searchConditions.deferred;
        },

        /**
         * Make search with predefined parameters
         * Should be done on popup init
         */
        makeDeferredSearch: function(onResolve) {
            this._searchConditions.deferred.done(onResolve);
            var self = this;

            var cacheKey = this._searchConditions.domain + this._searchConditions.regionId;

            if (this._domainApiCache[cacheKey] !== undefined) {
                if (this._domainApiCache[cacheKey]) {
                    self._searchConditions.deferred.resolve(this._domainApiCache[cacheKey]);
                } else {
                    self._searchConditions.deferred.reject();
                }

                return;
            }

            this._searchFirmByDomain(this._searchConditions.domain, this._searchConditions.regionId, function(result) {
                DGExt.utils.log('Got result in search');
                result._searchConditions = self._searchConditions;
                self._searchConditions.deferred.resolve(result);
                this._domainApiCache[cacheKey] = result;
            }, function() {
                DGExt.utils.log('Got error in search');
                self._searchConditions.deferred.reject();
                this._domainApiCache[cacheKey] = null;
            });
        },

        /**
         * Get business data by domain (for toolbar button popup)
         *
         * @param {String} domain
         * @returns {DGExt.$.Deferred}
         */
        processFirm: function(domain) {
            var self = this;
            var searchComplete = DGExt.$.Deferred(); // deferred: search by external service completed
            var valueComplete = DGExt.$.Deferred(); // deferred: data ready
            var regionId = DGExt._location.regionId;
            this._searchFirmByDomainBasic(domain, function(firmList, status) {
                self._initSearchByFirmList(domain, firmList, regionId);
                self._searchConditions.deferred.done(function(data) { // should be resolved on popup init!
                    var main = self._findClosestBranchWithMatchingSite(data.items);
                    var card;
                    var firmId = main.id.split('_')[0];
                    var regionOfSearch = data._searchConditions.regionId;

                    function makeResult(firmsInRubric) {
                        var result = self._getResultData(firmId, main, card, firmsInRubric, regionOfSearch);
                        if (result) {
                            DGExt._firmData.add(domain, result);
                            DGExt.services.ga._TBSiteFound('2GIS');
                            valueComplete.resolve(DGExt._firmData.get(domain));
                        } else {
                            valueComplete.reject();
                        }
                    }

                    self._searchFirmCard(main.id, function(data) {
                        card = data.items[0];
                    }).done(function() {
                        if (card.rubrics && card.rubrics.length > 0) {
                            // todo: decided to take the first rubric of a set, fix this when possible
                            self._searchFirmsInRubric(card.rubrics[0].id, makeResult, function() {
                                makeResult([]);
                            });
                        } else { // also, there may be no rubrics at all (see ONLINE-3331)
                            makeResult([]);
                        }
                    }).fail(function() {
                        valueComplete.reject();
                    });
                }).fail(function() {
                    valueComplete.reject();
                });

                searchComplete.resolve(valueComplete, status);

            }, function(data, status) {
                self._initSearchByFirmList(domain, [], regionId);
                searchComplete.reject(status);
            });

            return searchComplete.promise();
        },

        /**
         * Get business data by domain (for content area popups)
         *
         * @param {Object} phone
         * @param _regionId
         * @param [isShort]
         * @returns {DGExt.$.Deferred}
         */
        processFirmByPhone: function(phone, _regionId, isShort) {
            var self = this;
            var completed = DGExt.$.Deferred();
            var regionId = _regionId || DGExt._location.regionId;

            if (DGExt.utils.disableApiPhoneSearch()) {
                completed.reject();
            } else {
                self._searchFirmByPhone(phone, regionId, function(data) {
                    DGExt.services.ga._PHPhoneFound('2GIS');
                    var main = data.items[0];
                    var card, cards;
                    var firmId = main.id.split('_')[0];

                    self._searchFirmCard(main.id, function(data) {
                        cards = data.items;
                    }).done(function() {
                        // if isShort, find in data.items single item where phone is sane. If not short, take 1st item.
                        if (isShort) {
                            card = self._findItemByPhone(phone, cards);
                            if (!card) {
                                completed.reject();
                            }
                        } else {
                            card = cards[0];
                        }

                        if (card) {
                            var result = self._getResultDataByPhone(firmId, main, card, phone, regionId);
                            if (result) {
                                completed.resolve(result);
                            } else {
                                completed.reject();
                            }
                        }
                    });
                }, function(data) {
                    if (data.response && data.response.meta && +data.response.meta.code === 404) {
                        DGExt.services.ga._PHPhoneNotFound('2GIS');
                    }
                    completed.reject();
                });
            }

            return completed.promise();
        },

        /**
         * Find firm that has a phone, strictly matching the original short phone
         *
         * @param phone
         * @param items
         * @returns {*}
         * @private
         */
        _findItemByPhone: function(phone, items) {
            for (var i = 0; i < items.length; i++) {
                var card = items[i];
                if (card.contact_groups) {
                    for (var j = 0; j < card.contact_groups.length; j++) {
                        var contactGroup = card.contact_groups[j];
                        for (var k = 0; k < contactGroup.contacts.length; k++) {
                            var contactType = contactGroup.contacts[k].type;
                            if (-1 !== DGExt.$.inArray(contactType, ['phone', 'fax'])) {
                                if (DGExt.utils.checkShortPhoneSanity([contactGroup.contacts[k].text], phone)) {
                                    return card;
                                }
                            }
                        }
                    }
                }
            }

            return null;
        }
    };
})();