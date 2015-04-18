var DGExt = DGExt || {};

(function() {
    "use strict";

    /**
     * Generic functions set
     * @type {{}|*|DGExt.utils}
     */
    DGExt.utils = DGExt.utils || {};

    // for nodejs autotests
    if (!DGExt.extend && typeof module !== 'undefined') {
        var ext = require('./extend.js');
        DGExt.extend = ext.extend;
    }

    DGExt.extend(DGExt.utils, {
        /**
         * Helper function to log error or debug messages
         * @param obj
         * @param [clone]
         * @param [iterate]
         */
        log: function(obj, clone, iterate) {
            if (clone === undefined) {
                clone = true;
            }
            if (iterate === undefined) {
                iterate = false;
            }

            if (DGExt._debug.log) {
                if (typeof obj === 'object' && clone) {
                    obj = JSON.parse(JSON.stringify(obj)); // clone
                }
                if (typeof obj === 'object' && iterate) {
                    var content = '';
                    for (var i in obj) {
                        content += 'obj[' + i + '] => ' + obj[i] + "\n";
                    }
                    kango.console.log(content);
                } else {
                    kango.console.log(obj);
                }
            }

            if (DGExt._debug.log && window) {
                window._log = DGExt.utils.log;
            }
        },

        /**
         * Get DOM node attribute
         *
         * @param node
         * @param attrName
         */
        getAttr: function(node, attrName) {
            for (var i in node.attributes) {
                if (node.attributes[i].name === attrName) {
                    return node.attributes[i].value;
                }
            }
            return null;
        },

        /**
         * Set DOM node attribute
         *
         * @param node
         * @param attrName
         * @param attrValue
         */
        setAttr: function(node, attrName, attrValue) {
            for (var i in node.attributes) {
                if (node.attributes[i].name === attrName) {
                    node.attributes[i].value = attrValue;
                }
            }
        },

        /**
         * Calculate distance in km between two points
         * lat1, lon1 - Source point latitude and longitude
         * lat2, lon2 - Target point latitude and longitude
         */
        calculateDistance: function(lat1, lon1, lat2, lon2) {

            function toRad(number) {
                return number * Math.PI / 180;
            }

            lat1 = parseFloat(lat1);
            lat2 = parseFloat(lat2);
            lon1 = parseFloat(lon1);
            lon2 = parseFloat(lon2);
            var R = 6371; // км.
            var dLat = toRad(lat2 - lat1);
            var dLon = toRad(lon2 - lon1);
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c;
            return parseFloat(d);
        },

        /**
         * Build short schedule array
         *
         * @todo упростить, декомпозировать, а то фарш какой-то
         * @todo unittest
         * @param schedule
         * @returns {*}
         */
        makeShortSchedule: function(schedule) {
            var dayName = {
                Sun: DGExt.services.i18n.getMessage('__sunday'),
                Mon: DGExt.services.i18n.getMessage('__monday'),
                Tue: DGExt.services.i18n.getMessage('__tuesday'),
                Wed: DGExt.services.i18n.getMessage('__wednesday'),
                Thu: DGExt.services.i18n.getMessage('__thursday'),
                Fri: DGExt.services.i18n.getMessage('__friday'),
                Sat: DGExt.services.i18n.getMessage('__saturday')
            };
            var order = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            var intervals = [];
            var lastDaySign;
            var lastValue;

            /**
             * @param i - day order
             */
            function setName(i) {
                var last = intervals[intervals.length - 1];

                if (!i || !last) {
                    return;
                }

                if (last.order === 0 && i === 4) {
                    last.name = DGExt.services.i18n.getMessage('__weekdays');
                } else if (last.order === 0 && i === 6) {
                    last.name = DGExt.services.i18n.getMessage('__everyday');
                } else if ((i - last.order) === 1) {
                    last.name = dayName[order[last.order]] + ', ' + dayName[order[i]];
                } else if ((i - last.order) > 1) {
                    last.name = dayName[order[last.order]] + ' — ' + dayName[order[i]];
                } else {
                    last.name = dayName[order[last.order]];
                }
            }

            for (var i = 0; i < order.length; i++) {
                var day = schedule[order[i]], sign;

                if (!day) {
                    sign = 'null';
                    lastValue = DGExt.services.i18n.getMessage('__day_off_embraced');
                } else if (day.round_the_clock) {
                    sign = 'round_the_clock';
                    lastValue = DGExt.services.i18n.getMessage('__twenty_four_seven_embraced');
                } else {
                    if (day.working_hours.length === 1) {
                        sign = day.working_hours[0].from + day.working_hours[0].to;
                        lastValue = DGExt.services.i18n.getMessage('__today_working_{fromTime}_{toTime}_embraced', {fromTime: day.working_hours[0].from, toTime: day.working_hours[0].to});
                    } else if (day.working_hours.length > 1) {
                        sign = day.working_hours[0].from + day.working_hours[1].to + day.working_hours[0].to +
                            day.working_hours[1].from;
                        lastValue = DGExt.services.i18n.getMessage("__today_working_{fromTime}_{toTime}_with_lunch_{lunchFromTime}_{lunchToTime}_embraced", {
                            fromTime: day.working_hours[0].from,
                            toTime: day.working_hours[1].to,
                            lunchFromTime: day.working_hours[0].to,
                            lunchToTime: day.working_hours[1].from
                        });
                    }
                }

                if (sign !== lastDaySign) {
                    intervals.push({
                        name: null,
                        order: i,
                        value: lastValue.replace(/\[(.*?)\]/gi, '<span>$1</span>')
                    });

                    var last = intervals[intervals.length - 1];
                    if (last && !last.name) {
                        setName(last.order);
                    }
                } else {
                    setName(i);
                }
                lastDaySign = sign;
            }

            return intervals;
        },

        /**
         * Build current state description string
         *
         * @todo упростить, декомпозировать, а то фарш какой-то
         * @todo unittest
         * @param schedule
         * @param timezoneOffset
         * @returns {{todayText: string, todayState: string, isOpen: boolean, allTime: boolean}}
         */
        makeScheduleDesc: function(schedule, timezoneOffset) {
            var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            var todayDate = DGExt.services.time.getTime();
            var currentTimezoneOffset = -todayDate.getTimezoneOffset();

            if (timezoneOffset && +timezoneOffset !== currentTimezoneOffset) {
                // Nonmatching timezones: need to convert current time
                todayDate = new Date(todayDate.getTime() - (currentTimezoneOffset * 60000) + (timezoneOffset * 60000));
                DGExt.utils.log('Converted current time to local: ' + todayDate.toString());
            }

            var result = {
                todayText: DGExt.services.i18n.getMessage('__today_day_off'),
                todayState: DGExt.services.i18n.getMessage('__now_closed'),
                isOpen: false,
                allTime: false
            };

            if (!schedule[days[todayDate.getDay()]]) {
                return result;
            }

            var todaySchedule = JSON.parse(JSON.stringify(schedule[days[todayDate.getDay()]]));

            if (!todaySchedule) {
                return result;
            }

            if (todaySchedule.round_the_clock) {
                result.todayText = DGExt.services.i18n.getMessage('__twenty_four_seven');
                result.todayState = DGExt.services.i18n.getMessage('__now_open');
                result.allTime = true;
                result.isOpen = true;
            } else {
                if (todaySchedule.working_hours.length === 1) {
                    result.todayText = DGExt.services.i18n.getMessage("__today_working_{fromTime}_{toTime}", {
                        fromTime: todaySchedule.working_hours[0].from,
                        toTime: todaySchedule.working_hours[0].to
                    });
                } else if (todaySchedule.working_hours.length > 1) {
                    result.todayText = DGExt.services.i18n.getMessage("__today_working_{fromTime}_{toTime}_with_lunch_{lunchFromTime}_{lunchToTime}", {
                        fromTime: todaySchedule.working_hours[0].from,
                        toTime: todaySchedule.working_hours[1].to,
                        lunchFromTime: todaySchedule.working_hours[0].to,
                        lunchToTime: todaySchedule.working_hours[1].from
                    });
                } else {
                    result.todayText = DGExt.services.i18n.getMessage('__today_day_off');
                }

                result.todayState = DGExt.services.i18n.getMessage('__now_closed');
                var today = (todayDate.getHours() >= 10 ? todayDate.getHours() : '0' + todayDate.getHours()) + ':' + todayDate.getMinutes();

                for (var i = 0; i < todaySchedule.working_hours.length; i++) {
                    if (todaySchedule.working_hours[i].to === '00:00') {
                        todaySchedule.working_hours[i].to = '23:59';
                    }

                    if (todaySchedule.working_hours[i].from > todaySchedule.working_hours[i].to) { // случай работы с 12:00 до 01:00 например
                        todaySchedule.working_hours.splice(i, 1, {from: todaySchedule.working_hours[i].from, to: '23:59'}, {from: '00:00', to: todaySchedule.working_hours[i].to});
                    }

                    if ((todaySchedule.working_hours[i].from <= today && todaySchedule.working_hours[i].to >= today) ||
                        today === '00:00') {
                        result.todayState = DGExt.services.i18n.getMessage('__now_open');
                        result.isOpen = true;
                    }

                    if (todaySchedule.working_hours[i].to === '23:59') {
                        todaySchedule.working_hours[i].to = '00:00';
                    }
                }
            }

            return result;
        },

        /**
         * Make proper plural form
         *
         * @param count
         * @param form1
         * @param form2_4
         * @param form5_0
         * @returns {string}
         */
        wordForm: function(count, form1, form2_4, form5_0) {
            form1 = form1 || '';
            form2_4 = form2_4 || '';
            form5_0 = form5_0 || "";

            var n100 = count % 100, n10 = count % 10;

            if ((n100 > 10) && (n100 < 21)) {
                return form5_0;
            } else if ((!n10) || (n10 >= 5)) {
                return form5_0;
            } else if (n10 === 1) {
                return form1;
            }
            return form2_4;
        },

        /**
         * Get domain part of url
         * @param url
         * @returns {*}
         */
        parseDomain: function(url) {
            if (!url) {
                return null;
            }
            var domain = url.match(/^(https?:\/\/)([^:/?]+)/i);
            return (domain ? domain[2] : null);
        },

        /**
         * Strip www. if needed
         * @param domain
         * @returns {XML|string|void}
         */
        parseRootDomain: function(domain) {
            domain = domain || '';
            domain = domain.replace(/(www\.)/g, "");
            return domain;
        },

        /**
         * Check if url has path component
         *
         * @param url
         * @param _domain for tests
         * @returns {boolean}
         */
        urlHasPath: function(url, _domain) {
            _domain = _domain || DGExt.currentDomain;

            if (!url) {
                return false;
            }

            if (this.parseDomain(url) !== _domain) {
                return false; // will fail on domain check
            }

            url = url.replace(/[\?#].*/, ''); // eliminate query string and hash
            url = url.replace(/\/$/, ''); // eliminate trailing slash

            return !!url.match(/^(https?:\/\/)?([^/?]+)/i) && !url.match(/^(https?:\/\/)?([^/?]+)$/i);
        },

        /**
         * Check if api phone search should be enabled for current domain
         *
         * @returns {boolean}
         */
        disableApiPhoneSearch: function() {
            if (!DGExt.currentDomain) {
                return false;
            }

            for (var i in DGExt.disableApiPhoneSearch) {
                if (DGExt.currentDomain.replace(/^(http:\/\/)?(www\.)?/, '').match(DGExt.disableApiPhoneSearch[i])) {
                    return true;
                }
            }

            return false;
        },

        /**
         * Check if current domain matches domain received from data source
         *
         * @param foundWebsite
         * @param originalWebsite
         * @returns {boolean}
         * @private
         */
        checkWebsite: function(foundWebsite, originalWebsite) {
            if (foundWebsite instanceof Array) {
                for (var i = 0; i < foundWebsite.length; i++) {
                    if (_check(foundWebsite[i], originalWebsite)) {
                        return true;
                    }
                }
                return false;
            } else {
                return _check(foundWebsite, originalWebsite);
            }

            function _check(foundWebsite, originalWebsite) {
                var regex = /^(https?:\/\/)?([^:/?]+)/i;
                foundWebsite = foundWebsite.match(regex);
                originalWebsite = originalWebsite.match(regex);
                return foundWebsite && originalWebsite && foundWebsite[2].replace(/^www\./, '') === originalWebsite[2].replace(/^www\./, '');
            }
        },

        /**
         * Check if requested phone matches phone received from data source
         *
         * @param foundPhone
         * @param originalPhone
         * @returns {boolean}
         */
        checkPhone: function(foundPhone, originalPhone) {
            if (foundPhone instanceof Array) {
                for (var i = 0; i < foundPhone.length; i++) {
                    if (_check(foundPhone[i], originalPhone)) {
                        return true;
                    }
                }
                return false;
            } else {
                return _check(foundPhone, originalPhone);
            }

            function _check(foundPhone, originalPhone) {
                foundPhone = foundPhone.replace(/^\+7/, '8').replace(/\D+/g, '');
                originalPhone = originalPhone.replace(/^\+7/, '8').replace(/\D+/g, '');

                if (foundPhone.length > originalPhone.length) {
                    return foundPhone.substr(foundPhone.length - originalPhone.length, originalPhone.length) === originalPhone;
                }
                if (originalPhone.length > foundPhone.length) {
                    return originalPhone.substr(originalPhone.length - foundPhone.length, foundPhone.length) === foundPhone;
                }
                return foundPhone === originalPhone;
            }
        },

        /**
         * Check if one of found short phones strictly matches the original short phone
         *
         * @param foundPhones
         * @param originalPhone
         * @returns {boolean}
         */
        checkShortPhoneSanity: function(foundPhones, originalPhone) {
            var matches;
            for (var i = 0; i < foundPhones.length; i++) {
                matches = foundPhones[i].match(/.*?\([^\)]+\)(.*)/); // discard city code
                if (matches) {
                    if (matches[1].replace(/\D+/g, '') === originalPhone.replace(/\D+/g, '')) {
                        return true;
                    }
                }
            }

            return false;
        },

        /**
         * Prepend country phone code to phone number if needed
         *
         * @todo отвязать от кучи зависимостей
         * @todo unittest
         * @param phone
         */
        addCountryCode: function(phone) {
            var addCode = (
                DGExt._countryPhoneCodes &&
                DGExt._location.countryCode &&
                DGExt._countryPhoneCodes[DGExt._location.countryCode] &&
                phone[0] !== '+' && (
                    (DGExt._location.countryCode === 'RU' && phone.replace(/\D+/g, '').length === 10) ||
                    DGExt._location.countryCode !== 'RU'
                ) &&
                phone.replace(/\D+/g).substr(0, DGExt._location.countryCode.length) !== DGExt._location.countryCode
            );

            if (addCode) {
                var countryCode = DGExt._countryPhoneCodes[DGExt._location.countryCode];
                if (phone.substr(0, countryCode.length) !== countryCode) {
                    phone = countryCode + phone;
                }
            }
            return phone;
        },

        /**
         * Proxy method to pass data to content scripts
         * @returns {DGExt._countryPhoneCodes|*}
         */
        getCountryCodes: function() {
            return DGExt._countryPhoneCodes;
        },

        /**
         * Proxy method to pass data to content scripts
         * @returns {DGExt._location.countryCode|*}
         */
        getCurrentCountryCode: function() {
            return DGExt._location.countryCode;
        },

        /**
         * Check if extension should perform search for current domain
         *
         * @todo unittest
         * @param domain
         * @returns {boolean}
         */
        searchByDomainIngored: function(domain) {
            var rootDomain = DGExt.utils.parseRootDomain(domain);
            for (var i = 0; i < DGExt.ignoreSearchByDomain.length; i++) {
                var condition = DGExt.ignoreSearchByDomain[i];
                if (typeof condition === 'object') {
                    if (rootDomain.match(condition)) {
                        return true;
                    }
                } else {
                    if (rootDomain === condition) {
                        return true;
                    }
                }
            }

            return false;
        },

        /**
         * Check if we should fully disable the extension background by passed URL
         *
         * @todo unittest
         * @param url
         * @returns {boolean}
         */
        eventsDisabledByUrl: function(url) {
            if (!url && url !== '') {
                return false;
            }
            var disabled = false;

            for (var i = 0; i < DGExt.disabledUrls.length; i++) {
                var condition = DGExt.disabledUrls[i];
                if (typeof condition === 'object') {
                    if (url.match(condition)) {
                        disabled = true;
                    }
                } else {
                    if (url === condition) {
                        disabled = true;
                    }
                }
            }

            return disabled;
        },

        /**
         * Get icon for toolbar
         * @param state
         * @returns {*}
         */
        getIconName: function(state) {
            var icon;

            var icons = DGExt.icons[kango.browser.getName()];
            if (!icons) {
                icons = DGExt.icons.default;
            }

            if (state === DGExt.STATE_DISABLE) {
                icon = icons.disable;
            } else if (state === DGExt.STATE_ENABLE) {
                icon = icons.enable;
            } else {
                icon = icons.loader;
            }

            return icon;
        },

        setGeolocationLoadingStatus: function() {
            var geolocationIcon = this.getIconName(DGExt.STATE_GEOLOCATION);
            kango.ui.browserButton.setIcon('icons/' + geolocationIcon);
            kango.ui.browserButton.setTooltipText(DGExt.services.i18n.getMessage('__getting_location'));
        },

        setGeolocationFailStatus: function() {
            var geolocationIcon = this.getIconName(DGExt.STATE_DISABLE);
            kango.ui.browserButton.setIcon('icons/' + geolocationIcon);
            kango.ui.browserButton.setTooltipText(DGExt.services.i18n.getMessage('__cant_get_location'));
        },

        setGeolocationSuccessStatus: function() {
            var geolocationIcon = this.getIconName(DGExt.STATE_DISABLE);
            kango.ui.browserButton.setIcon('icons/' + geolocationIcon);
            kango.ui.browserButton.setTooltipText('');
        },

        _setLoadingState: function() {
            if (this._stateTimer) {
                clearTimeout(this._stateTimer);
            }
            DGExt.utils.log('Changing state to LOADING');
            kango.ui.browserButton.setIcon('icons/' + DGExt.utils.getIconName(DGExt.STATE_LOAD));
            kango.ui.browserButton.setPopup(null);
            kango.ui.browserButton.setTooltipText(DGExt.services.i18n.getMessage('__loading_data'));
        },

        _setEnabledState: function() {
            if (this._stateTimer) {
                clearTimeout(this._stateTimer);
            }
            DGExt.utils.log('Changing state to ENABLE');
            kango.ui.browserButton.setIcon('icons/' + DGExt.utils.getIconName(DGExt.STATE_ENABLE));
            var popupHeight = DGExt._registeredPopupHeights[DGExt.utils.md5(JSON.stringify(kango.storage.getItem('result')))];
            if (!popupHeight) {
                popupHeight = DGExt._popupMaxHeight;
            }
            DGExt._popupHeight = popupHeight;
            kango.ui.browserButton.setPopup({url: 'templates/toolbar-popup.html', width: DGExt._popupWidth, height: DGExt._popupHeight});
            kango.ui.browserButton.setTooltipText(DGExt.services.i18n.getMessage('__click_for_details'));
        },

        _setDisabledState: function() {
            if (this._stateTimer) {
                clearTimeout(this._stateTimer);
            }
            DGExt.utils.log('Changing state to DISABLE');
            kango.ui.browserButton.setIcon('icons/' + DGExt.utils.getIconName(DGExt.STATE_DISABLE));
            kango.ui.browserButton.setPopup(null);
            kango.ui.browserButton.setTooltipText(DGExt.services.i18n.getMessage('__cant_find_business_data'));
        },

        _stateTimer: null,

        /**
         * Change button style and set popup
         * @param state
         * @param [_immediately]
         */
        changeState: function(state, _immediately) {
            state = state || DGExt.STATE_DISABLE;
            var self = this;

            if (_immediately) {
                if (state === DGExt.STATE_DISABLE) {
                    self._setDisabledState();
                } else if (state === DGExt.STATE_ENABLE) {
                    self._setEnabledState();
                } else {
                    self._setLoadingState();
                }
            } else {
                if (state === DGExt.STATE_DISABLE) {
                    this._stateTimer = setTimeout(function() {
                        self._setDisabledState();
                    }, 500);
                } else if (state === DGExt.STATE_ENABLE) {
                    this._stateTimer = setTimeout(function() { // setting timeout to remove flickering on redirects
                        self._setEnabledState();
                    }, 500);
                } else {
                    self._setLoadingState();
                }
            }
        },

        /**
         * Create popup frame for content area
         * @param frameClassName
         * @param wrapperClassName
         * @returns {*|jQuery}
         */
        createPopupFrame: function(frameClassName, wrapperClassName) {
            var div = document.createElement('DIV');
            if (wrapperClassName) {
                div.className = wrapperClassName;
            }
            if (DGExt.xhtmlStrictMode) {
                div.innerHTML = "<iframe scrolling='no' class='" + frameClassName + "'></iframe>";
                return DGExt.$(div).on('appendFrame', function() {
                    document.body.insertBefore(div, document.body.firstChild);
                });
            } else {
                var rawFrame = document.createElement('IFRAME');
                rawFrame.className = frameClassName;
                div.appendChild(rawFrame);
                return DGExt.$(div).on('appendFrame', function() {
                    document.body.insertBefore(div, document.body.firstChild);
                });
            }
        },

        appendContentToPopupFrame: function(frame, content) {
            if (DGExt.xhtmlStrictMode) {
                frame.contentWindow.document.body.innerHTML = content;
            } else {
                DGExt.$(frame.contentWindow.document.body).append(DGExt.$(content));
            }
        },

        /**
         * Register business connection
         * @param bcUrl
         */
        regBusinessConnection: function(bcUrl) {
            kango.xhr.send({
                method: 'GET',
                url: bcUrl
            }, function() {});
        },

        /**
         * Get browser title
         *
         * Conditions order matters!
         * @returns {string}
         */
        getBrowserName: function() {
            if (navigator.userAgent.indexOf('Opera') !== -1 || navigator.userAgent.indexOf('OPR') !== -1) {
                return 'Opera';
            }

            if (navigator.userAgent.indexOf('Firefox') !== -1) {
                return 'Firefox';
            }

            if (navigator.userAgent.indexOf('YaBrowser') !== -1) {
                return 'YandexBrowser';
            }

            if (navigator.userAgent.indexOf('Chrome') !== -1) {
                return 'Chrome';
            }

            if (navigator.userAgent.indexOf('Safari') !== -1) {
                return 'Safari';
            }
        },

        /**
         * Get OS running
         * @returns {string}
         */
        getOS: function() {
            if (navigator.platform.indexOf('Win') !== -1) {
                return 'Windows';
            }

            if (navigator.platform.indexOf('Linux') !== -1) {
                return 'Linux';
            }

            if (navigator.platform.indexOf('Mac') !== -1) {
                return 'Mac';
            }
        },

        /**
         * Get shared array of precalculated popup heights
         * @returns {DGExt._registeredPopupHeights|*}
         */
        getRegisteredPopupHeights: function() {
            return DGExt._registeredPopupHeights;
        },

        /**
         * Register precalculated popup height
         * @param popupId
         * @param popupHeight
         */
        registerPopupHeight: function(popupId, popupHeight) {
            DGExt._registeredPopupHeights[popupId] = popupHeight;
        },

        /**
         * Update variable used by popup on startup
         * @param popupId
         */
        updatePopupHeightVar: function(popupId) {
            var popupHeight = DGExt._registeredPopupHeights[popupId];
            if (!popupHeight) {
                popupHeight = DGExt._popupMaxHeight;
            }
            DGExt._popupHeight = popupHeight;
        }
    });
})();

// export for nodejs test
if (typeof module !== 'undefined' && module.exports) {
    exports.utils = DGExt.utils;
}
