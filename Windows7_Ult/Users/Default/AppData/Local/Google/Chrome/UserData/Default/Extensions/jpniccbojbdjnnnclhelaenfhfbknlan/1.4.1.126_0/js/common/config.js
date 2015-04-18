var DGExt = DGExt || {};

(function() {
    "use strict";

    DGExt.extend(DGExt, {
        // constants
        _debug: {log: false, useAnalytics: true, preventDefaultErrorHandler: true},

        xhtmlStrictMode: false,
        firefoxGeolocationPromptEnabled: false, // set to true when submitting to firefox store

        projectRadius: 100.0, // city radius; only user inside of this radius may use 2gis api
        firmSearchRadius: 100000000, // max distance for businesses search

        locationThreshold: 10, // km, threshold for location-related data updates

        webApiKey: 'ruldgy0789',

        allowSelfAPI: true,
        geoLocationServiceUrl: 'https://ip2geo.2gis.ru/',
        reverseGeocodingUrl: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=',

        timeServerApiKey: 'OWPHTV0999KB',
        timeServerApiUrl: 'http://api.timezonedb.com/',

        _popupWidth: 402,
        _popupMaxHeight: 600,

        _flampReviewsLoadCount: 5,

        STATE_ENABLE: 'enable',
        STATE_DISABLE: 'disable',
        STATE_LOAD: 'load',
        STATE_GEOLOCATION: 'load',

        STATUS_FOUND_IN_GOOGLE: 'google_found',
        STATUS_FOUND_IN_2GIS: '2gis_found',
        STATUS_FOUND_IN_LOCAL_CACHE: 'cache_found',
        STATUS_NOT_FOUND: 'not_found',

        // ignore these when searching by domain for toolbar popup
        ignoreSearchByDomain: [
            /.*vk.com$/,
            /.*youtube.com$/,
            /.*youtu.be$/,
            /.*twitter.com$/,
            /.*odnoklassniki.ru$/,
            /.*ok.ru$/,
            /.*instagram.com$/,
            /.*facebook.com$/,
            /.*google(\.co|\.com|\.org)?\.[a-z]+$/,
            /.*\.local/,
            /.*\.localdomain/,
            /^[^\.]+$/
        ],
        // do not search by phone on these domains
        disableApiPhoneSearch: [
            /plus\.google\.(?!ru)[a-z]+/, /maps\.google\.(?!ru)[a-z]+/, /^2gis\.[a-z]+(\.[a-z]+)?/,
            /^maps.2gis\.[a-z]+(\.[a-z]+)?/
        ],

        // fully disable extensions background for these url patterns
        disabledUrls: [
            /^chrome:\/\//,
            /^chrome-extension:\/\//,
            /^about:/,
            /^https?:\/\/(www.)?google\.[a-z]{2,3}\/.*?chrome\/newtab/,
            '' // empty url
        ],

        templatePartials: {
            'reviews_list': 'templates/handlebars/reviews/list.hbs',
            'reviews_2gis': 'templates/handlebars/reviews/2gis.hbs',
            'reviews_google': 'templates/handlebars/reviews/google.hbs'
        },

        icons: {
            safari: {
                enable: 'button_enable_safari.png',
                disable: 'button_disable_safari.png',
                loader: 'loader_safari.png'
            },
            default: {
                enable: 'button_enable.png',
                disable: 'button_disable.png',
                loader: 'loader.png'
            }
        },

        // countries where we should show distance in miles
        _milesCountries: [
            "US", "UK", "LR",
            "MM", "AS", "BS",
            "BZ", "VG", "KY",
            "DM", "GB", "FK",
            "GD", "GU", "MP",
            "WS", "LC", "VC",
            "SH", "KN", "TC",
            "VI"
        ],

        _addressFormats: {
            "DEFAULT": "{street}, {number}, {city}",
            "AR": "{street} {number}, {city}",
            "AU": "{number} {street}, {city}",
            "AT": "{street} {number}, {city}",
            "BY": "{street}, {number}, {city}",
            "BE": "{street} {number}, {city}",
            "BR": "{street}, {number}, {city}",
            "CA": "{street} {number}, {city}",
            "CN": "{city}, {street}, {number}",
            "HR": "{street} {number}, {city}",
            "CZ": "{street} {number}, {city}",
            "DK": "{street} {number}, {city}",
            "FI": "{street} {number}, {city}",
            "FR": "{number} {street}, {city}",
            "DE": "{street} {number}, {city}",
            "HK": "{number} {street}, {country}",
            "HU": "{city}, {street} {number}",
            "IS": "{street} {number}, {city}",
            "IN": "{number}, {street}, {city}",
            "ID": "{street} {number}, {city}",
            "IR": "{number}, {street}, {city}",
            "IQ": "{street} {number}, {city}",
            "IE": "{number} {street}, {city}",
            "IL": "{street} {number}, {city}",
            "IT": "{street} {number}, {city}",
            "JP": "{city}, {street}, {number}",
            "LV": "{street}, {number}, {city}",
            "MO": "{street}, {number}, {country}",
            "MY": "{number}, {street}, {city}",
            "MX": "{street} {number}, {city}",
            "NL": "{street} {number}, {city}",
            "NZ": "{number} {street}, {city}",
            "NO": "{street} {number}, {city}",
            "OM": "{street} {number}, {city}",
            "PK": "{number}, {street}, {city}",
            "PE": "{street} {number}, {city}",
            "PH": "{number} {street}, {city}",
            "PL": "{number} {street}, {city}",
            "RO": "{street}, {number}, {city}",
            "RU": "{street}, {number}, {city}",
            "SG": "{number} {street}, {country}",
            "SK": "{street} {number}, {city}",
            "SI": "{street} {number}, {city}",
            "KR": "{number}, {street}, {city}",
            "ES": "{street}, {number}, {city}",
            "LK": "{number} {street}, {city}",
            "SE": "{street} {number}, {city}",
            "CH": "{street} {number}, {city}",
            "TW": "{number}, {street}, {city}",
            "TH": "{number} {street}, {city}",
            "TR": "{street} {number}, {city}",
            "UA": "{street}, {number}, {city}",
            "UK": "{number} {street}, {city}",
            "US": "{number} {street}, {city}"
        },

        // global vars
        _runContext: null,
        _dataFetchFinished: true,
        _firmData: DGExt.ResultCollection ? new DGExt.ResultCollection() : null,
        activeTabId: null,
        activeDomain: null, // exists only when business is found by domain
        currentDomain: null, // exists always
        _location: {},
        use2GisApi: false,
        regionFound: false,
        _p2dPopupTemplateSource: '',
        _phonePopupTemplateSource: '',
        _registeredPopupHeights: {}
    });
})();
