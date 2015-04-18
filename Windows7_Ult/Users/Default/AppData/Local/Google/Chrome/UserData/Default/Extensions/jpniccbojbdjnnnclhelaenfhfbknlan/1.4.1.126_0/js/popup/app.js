var DGExt = DGExt || {};

(function() {
    "use strict";
    var _initDone = false;

    /**
     * Toolbar popup document entry point
     */
    KangoAPI.onReady(function() {
        DGExt.$('.preloader__spinner').animate({opacity: 1}, 1000);

        DGExt._runContext = 'popup';

        DGExt.services = DGExt.services || {};
        DGExt.services.time = new DGExt.TimeServiceClient();
        DGExt.services.ga = DGExt.GoogleAnalyticsService();
        DGExt.services.reviews = new DGExt.Reviews();
        DGExt.services.view = new DGExt.PopupView();
        DGExt._registeredPopupHeights = {};
        DGExt.Errors();

        kango.invokeAsync('DGExt.utils.getRegisteredPopupHeights', function(result) {
            DGExt.utils.log('Got precomputed heights:');
            DGExt.utils.log(result);
            DGExt._registeredPopupHeights = result;
        });

        DGExt.$('body').on('dataReceived', function(e, data) {
            init(); // or do something with data
        });

        // todo: messy initialization, wtf
        new DGExt.I18n(function(_i18n) { // created i18n object is passed onto callback as a parameter
            DGExt.services.i18n = _i18n;
            DGExt.receivePartialsSource().done(function() {
                waitForProcessingFinished(function() {
                    DGExt.utils.log('Sending request');
                    kango.invokeAsync('DGExt.services.gis.makeDeferredSearch');
                    init();
                });
            });
        });

        var attempts = 0;

        function waitForProcessingFinished(callback) {
            kango.invokeAsync('DGExt.services.checkProcessingStatus', function(result) {
                if (!result) {
                    if (attempts < 5) {
                        setTimeout(function() {
                            waitForProcessingFinished(callback);
                        }, 200);
                    }
                    attempts++;
                } else {
                    callback();
                }
            });
        }

        /**
         * Render popup template and return html
         *
         * @param data
         * @param todayDesc
         * @param shortSchedule
         * @param use2Gis
         * @returns {*}
         */
        function getPopupContent(data, todayDesc, shortSchedule, use2Gis) {
            var result = DGExt.$.Deferred();
            kango.invokeAsync('kango.io.getExtensionFileContents', "templates/handlebars/toolbar-popup.hbs", function(source) {
                var template = Handlebars.compile(source);
                var context = {
                    data: data,
                    use2Gis: use2Gis,
                    todayDesc: todayDesc,
                    shortSchedule: shortSchedule,
                    showMoreCommentsButton: (data.reviews && data.reviews.flampReviews.length < data.reviews.flampReviewsCount),
                    reviewsString: data.reviews ? DGExt.services.i18n.getMessage('__total_{reviews}', {reviews: data.reviews.flampReviewsCount}) : '',
                    reviewsStringDetailed: data.reviews ? (data.reviews.flampReviews.length === data.reviews.flampReviewsCount ? DGExt.services.i18n.getMessage('__total_{reviews}', {reviews: data.reviews.flampReviews.length}) : DGExt.services.i18n.getMessage(DGExt.utils.wordForm(data.reviews.flampReviews.length, '__shown_{reviews}_of_{reviewsTotal}_singular', '__shown_{reviews}_of_{reviewsTotal}_plural', '__shown_{reviews}_of_{reviewsTotal}_plural'), {reviews: data.reviews.flampReviews.length, reviewsTotal: data.reviews.flampReviewsCount})) : '',
                    recommendationString: data.firmFlampRecommendationCount ? DGExt.services.i18n.getMessage(DGExt.utils.wordForm(data.firmFlampRecommendationCount, '__{recommendations}_singular', '__{recommendations}_plural_1', '__{recommendations}_plural_2'), {recommendations: data.firmFlampRecommendationCount}) : '',
                    filialsString: data.firmFilialsCount ? DGExt.services.i18n.getMessage(DGExt.utils.wordForm(data.firmFilialsCount - 1, '__more_{filials}_singular', '__more_{filials}_plural_1', '__more_{filials}_plural_2'), {filials: data.firmFilialsCount - 1}) : '',
                    otherOrganizationsString: data.firmsInRubric ? DGExt.services.i18n.getMessage(DGExt.utils.wordForm(data.firmsInRubric - 1, '__other_{firms}_in_{rubric}_singular', '__other_{firms}_in_{rubric}_plural_1', '__other_{firms}_in_{rubric}_plural_2'), {firms: data.firmsInRubric - 1, rubric: data.firmPrimaryRubric}) : ''
                };
                result.resolve(template(context, {
                    data: {firmName: context.data.firmName} // ugly: local template @firmName variable to pass it into nested loop
                }));
            });
            return result.promise();
        }

        /**
         * Init custom analytics and business connections attributes handler
         */
        function initGoogleAnalyticsHandlers() {
            DGExt.$('a').on('click', function(e) {
                e.preventDefault();
                var target = DGExt.$(e.currentTarget);

                var gaInvoke = target.data('ga-invoke');
                if (gaInvoke) {
                    kango.invokeAsync('DGExt.services.ga.' + gaInvoke);
                }

                var bcUrl = target.data('reg-bc-url');
                if (bcUrl) {
                    kango.invokeAsync('DGExt.utils.regBusinessConnection', bcUrl);
                }
            });
        }

        /**
         * Open links in new tab by creating new tab,
         * cause in different browsers different behavior for open links in popup window.
         */
        function initOpenLinksInNewTab() {
            DGExt.$('a').on('click', function(e) {
                e.preventDefault();
                var target = DGExt.$(e.currentTarget);
                if (!/^javascript/.test(target.attr('href'))) {
                    KangoAPI.closeWindow();
                    kango.invokeAsync('kango.browser.tabs.create', {url: target.attr('href')});
                }
            });
        }

        /**
         * Init schedule small popup
         */
        function initSchedulePopups() {
            DGExt.$('body').on('click', function() {
                var el = DGExt.$('.js-schedule-link');
                if (!el.hasClass('opened')) {
                    el.toggleClass('opened');
                    el.nextAll('.js-schedule-popup').toggle();
                }
            });

            // Init schedule caller and popup
            DGExt.$('.js-schedule-link').on('click', function(e) {
                e.stopImmediatePropagation();
                kango.invokeAsync('DGExt.services.ga._TBScheduleClick');
                DGExt.$(this).toggleClass('opened');
                DGExt.$(this).nextAll('.js-schedule-popup').toggle();
            });
        }

        /**
         * Инициализация виджета js api
         *
         * @param lat
         * @param lon
         */
        function initJsApiMap(lat, lon, mapLink) {
            if (DGExt.$('#_jsapi-widget-map').length === 0 || !lat || !lon) {
                return;
            }

            DG.then(function() {
                var myMap, myMarker;

                // Создаем объект карты, связанный с контейнером:
                myMap = DG.map('_jsapi-widget-map', {
                    center: DG.latLng(lat, lon),
                    zoom: 16,
                    geoclicker: false,
                    worldCopyJump: true,
                    dragging: false,
                    zoomControl: false,
                    fullscreenControl: false,
                    doubleClickZoom: false,
                    scrollWheelZoom: false
                });
                // Локализуем
                myMap.setLang(DGExt.services.i18n.getMessage('__lang__'));
                // Создаем маркер, указав ему местоположение на карте:
                myMarker = DG.marker([lat, lon]);
                // Добавляем маркер на карту:
                myMarker.addTo(myMap);
            });

            DGExt.$('#_jsapi-widget-map').click(function() {
                kango.invokeAsync('kango.browser.tabs.create', {url: mapLink});
                kango.invokeAsync('DGExt.services.ga._TBMapClick');
                KangoAPI.closeWindow();
            });
        }

        /**
         * Main entry point
         */
        function init() {
            var data = kango.storage.getItem('result');

            if (!data || _initDone) {
                return;
            }

            var p2dInvokers = [];

            var popupId = DGExt.utils.md5(JSON.stringify(data));
            kango.invokeAsync('DGExt.services.ga._TBPopupOpened');

            if (data.reg_bc_url) {
                DGExt.utils.regBusinessConnection(data.reg_bc_url);
            }

            var todayDesc, shortSchedule;
            if (data.firmSchedule) {
                todayDesc = DGExt.utils.makeScheduleDesc(data.firmSchedule, data.firmTimezoneOffset);
                shortSchedule = DGExt.utils.makeShortSchedule(data.firmSchedule);
            }

            getPopupContent(data, todayDesc, shortSchedule, data.source === '2gis').done(function(html) {
                DGExt.$('body').html(html);
                DGExt.services.reviews.initComments(data.id, data.reviews ? data.reviews.flampReviewsCount : 0);
                initSchedulePopups();
                initOpenLinksInNewTab();
                initGoogleAnalyticsHandlers();
                initJsApiMap(data.targetPoint.lat, data.targetPoint.lon, data.firmBigMapLink);

                DGExt.$('.js_gis-phone').each(function() {
                    p2dInvokers.push(new DGExt.PhoneP2dInvoker(this, KangoAPI));
                });

                DGExt.$('.js-tooltip').click(function(e) {
                    e.preventDefault();
                }).tooltipster({
                    theme: 'tooltipster-shadow',
                    maxWidth: 300
                });

                DGExt.$('.work-mode a').click(function(e) {
                    e.preventDefault();
                });

                DGExt.services.view.initPopup(popupId);
                kango.invokeAsync('DGExt.utils.updatePopupHeightVar', popupId);
            });

            DGExt.$('body').on('click', '.js-widget-close', function() {
                kango.invokeAsync('DGExt.services.ga._TBCloseClick');
                KangoAPI.closeWindow();
            });

            _initDone = true;
        }
    });
})();