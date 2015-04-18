var DGExt = DGExt || {};

(function() {
    "use strict";
    /**
     * Content area popup window
     *
     * @param phoneNode
     * @param firmData
     * @param i18n
     * @constructor
     */
    DGExt.PhonePopup = function(phoneNode, firmData, i18n) {
        var self = this;
        this._i18n = i18n;
        this._phoneNode = DGExt.$(phoneNode);
        var popupFrameWrapper = DGExt.utils.createPopupFrame('_gis-phone-iframe', '_gis-phone-iframe-wrapper');
        this._popupFrame = popupFrameWrapper.find('iframe')[0];

        if (firmData._woResult) {
            popupFrameWrapper.addClass('_gis-iframe-wrapper-simple-widget');
        }

        popupFrameWrapper.find('iframe').on('load', function() {
            DGExt.utils.appendContentToPopupFrame(self._popupFrame, self._createPopup(firmData));

            DGExt.$('<style/>').appendTo(DGExt.$(self._popupFrame.contentWindow.document.head)).html(DGExt.$('#_gis-main-content-normalize-css').html());
            DGExt.$('<style/>').appendTo(DGExt.$(self._popupFrame.contentWindow.document.head)).html("html {background-color: transparent;}");
            DGExt.$('<style/>').appendTo(DGExt.$(self._popupFrame.contentWindow.document.head)).html(DGExt.$('#_gis-main-content-css').html());

            self._popup = DGExt.$(self._popupFrame.contentWindow.document.body).find('._gis-phone-highlight-widget');
            if (DGExt.utils.getBrowserName() === 'Firefox') { // ugly scrollbars hack for firefox
                DGExt.$(self._popupFrame).add(self._popupFrame.parentNode).css({
                    height: self._popup.outerHeight(true) + 2,
                    width: self._popup.outerWidth(true) + 2
                });
                setTimeout(function() {
                    DGExt.$(self._popupFrame).add(self._popupFrame.parentNode).css({width: self._popup.outerWidth(true), height: self._popup.outerHeight(true)});
                }, 0);
            } else {
                DGExt.$(self._popupFrame).add(self._popupFrame.parentNode).css({
                    height: self._popup.outerHeight(true),
                    width: self._popup.outerWidth(true)
                });
            }


            self._scheduleLink = self._popup.find('.js_gis-phone-highlight-schedule-link');
            self._schedulePopup = self._popup.find('.js_gis-phone-highlight-schedule-popup');
            if (self._phoneNode.data('id')) {
                self._popup.addClass('_gis-phone-highlight-widget-' + self._phoneNode.data('id'));
                self._eventNamespace = '.ev_' + self._phoneNode.data('id');
            } else {
                self._eventNamespace = '.ev_' + (1000000000 + Math.floor(Math.random() * (2147483647 - 1000000000)));
            }
            self._popup.find('.js_gis-phone').each(function() {
                self._p2dInvokers.push(new DGExt.PhoneP2dInvoker(this));
                if (firmData._woResult) { // need to enlarge iframe for small popup without data
                    DGExt.$(this).on('loading.start', function() {
                        self._popupFrame._enlarged = true;
                        DGExt.$(self._popupFrame).css('width', parseInt(DGExt.$(self._popupFrame).css('width')) + 50);
                    }).on('loading.end', function() {
                        if (self._popupFrame._enlarged === true) {
                            DGExt.$(self._popupFrame).css('width', parseInt(DGExt.$(self._popupFrame).css('width')) - 50);
                            self._popupFrame._enlarged = false;
                        }
                    });
                }
            });

            self.toPosition();
            kango.invokeAsync('DGExt.services.ga._PHPopupOpened');
            if (firmData.reg_bc_url) {
                DGExt.utils.regBusinessConnection(firmData.reg_bc_url);
            }

            DGExt.$(window).on('popup_remove' + self._eventNamespace, function() {
                self.onPopupRemove();
            });
            DGExt.$(window).on('resize' + self._eventNamespace, function() {
                self.onResize();
            });
            DGExt.$('body').on('click' + self._eventNamespace, function() {
                self.onBodyClick();
            });

            self._popup.find('.js_gis-phone-highlight-close').on('click', function() {
                self.onCloseClick();
            });
            self._popup.find('a').on('click', self.onAnchorClick);
            self._popup.on('click', function(e) {
                self.onPopupClick(e);
            });

            self._scheduleLink.on('click', function(e) {
                self.onScheduleClick(e);
            });
            self._popup.on('mouseenter', function() {
                self.onMouseEnter();
            });
            self._popup.on('mouseleave', function() {
                self.onMouseLeave();
            });
        });
        popupFrameWrapper.trigger('appendFrame');
    };

    DGExt.extend(DGExt.PhonePopup.prototype, {
        /**
         * If this is clicked, popup is shown
         */
        _phoneNode: null,
        /**
         * Popup root DOM node
         */
        _popup: null,
        _popupFrame: null,
        _i18n: null,
        /**
         * Schedule small popup node
         */
        _schedulePopup: null,
        /**
         * Instances of P2dInvoker to manage push2dial requests for each phone
         */
        _p2dInvokers: [],
        /**
         * Event namespace to unbind carefully if destroyed
         */
        _eventNamespace: '',

        /**
         * Get popup html
         *
         * @param data
         * @returns {*}
         * @private
         */
        _createPopup: function(data) {
            var self = this;
            DGExt.$(window).trigger('popup_remove');
            var template = Handlebars.compile(DGExt._phonePopupTemplateSource);
            var context = {
                firmData: DGExt.extend(false, data, {currDomain: DGExt.currentDomain}),
                todayDesc: data.firmSchedule && DGExt.utils.makeScheduleDesc(data.firmSchedule, data.firmTimezoneOffset),
                shortSchedule: data.firmSchedule && DGExt.utils.makeShortSchedule(data.firmSchedule),
                reviewsString: data.reviews ? self._i18n.getMessage(
                    '__total_{reviews}',
                    {reviews: data.reviews.flampReviewsCount}
                ) : '',
                recommendationString: self._i18n.getMessage(
                    DGExt.utils.wordForm(data.firmFlampRecommendationCount,
                        '__{recommendations}_singular',
                        '__{recommendations}_plural_1',
                        '__{recommendations}_plural_2'
                    ),
                    {recommendations: data.firmFlampRecommendationCount}
                )
            };
            return template(context, {
                data: {firmData: context.firmData} // ugly: local template @firmData variable to pass it into nested loop
            });
        },

        /**
         * Reposition popup to match phone node position
         */
        toPosition: function() {
            if (this._fitsIntoViewport()) {
                this._toPositionRelativeToViewport();
            } else {
                this._toPositionRelativeToDocument();
            }
        },

        /**
         * Check if popup fits into viewport relatively to root phone node
         *
         * @todo unittest
         * @returns {boolean}
         * @private
         */
        _fitsIntoViewport: function() {
            var boundingRect = this._phoneNode[0].getBoundingClientRect();
            var upperSpace = boundingRect.top;
            var lowerSpace = window.innerHeight - boundingRect.bottom;

            return (this._popup.width() <= window.innerWidth && (this._popup.height() <= upperSpace || this._popup.height() <= lowerSpace));
        },

        _toPositionRelativeToViewport: function() {
            DGExt.utils.log('Positioning relative to viewport');
            var boundingRect = this._phoneNode[0].getBoundingClientRect();

            var posClass = ['_gis-top', '_gis-left'];
            var top = boundingRect.bottom + 6;
            var left = boundingRect.right - this._popup.width() + 10;

            var overTop = boundingRect.top - this._popup.height() - 10 < 0;
            var overBottom = top + this._popup.height() > window.innerHeight;
            var overLeft = left < 0;

            if (overBottom && !overTop) {
                posClass[0] = '_gis-bottom';
                top = boundingRect.top - this._popup.height() - 10;
            }
            if (overLeft) {
                posClass[1] = '_gis-right';
                left = left + this._popup.width() - 29;
            }

            DGExt.$(this._popupFrame.parentNode) // reposition wrapper
                .addClass(posClass.join(' '))
                .css(this._viewportToDocument({left: left, top: top})).show();
        },

        _toPositionRelativeToDocument: function() {
            DGExt.utils.log('Positioning relative to document');
            var pointOffset = this._phoneNode.offset();

            var posClass = ['_gis-top', '_gis-left'];
            var top = pointOffset.top + this._phoneNode.height() + 6;
            var left = pointOffset.left + this._phoneNode.width() - this._popup.width() + 10;

            var overTop = pointOffset.top - this._popup.height() - 10 < 0;
            var overBottom = top + this._popup.height() + 10 > DGExt._documentHeight;
            var overLeft = left < 0;

            if (overBottom && !overTop) {
                posClass[0] = '_gis-bottom';
                top = pointOffset.top - this._popup.height() - 10;
            }
            if (overLeft) {
                posClass[1] = '_gis-right';
                left = left + this._popup.width() - 29;
            }

            DGExt.$(this._popupFrame.parentNode) // reposition wrapper
                .addClass(posClass.join(' '))
                .css({left: left, top: top}).show();
        },

        /**
         * Translate viewport coords to document coords
         *
         * @param coords
         * @private
         */
        _viewportToDocument: function(coords) {
            return {
                left: coords.left + DGExt.$(window).scrollLeft(),
                top: coords.top + DGExt.$(window).scrollTop()
            };
        },

        /// events reaction

        onResize: function() {
            this.toPosition();
        },

        onCloseClick: function() {
            kango.invokeAsync('DGExt.services.ga._PHCloseClick');
            DGExt.$(window).trigger('popup_remove');
        },

        onScheduleClick: function(e) {
            e.stopImmediatePropagation();
            this._scheduleLink.toggleClass('_gis-phone-highlight-opened');
            this._schedulePopup.toggle();
        },

        onPopupClick: function(e) {
            e.stopImmediatePropagation();
            if (!this._scheduleLink.hasClass('_gis-phone-highlight-opened')) {
                this._scheduleLink.addClass('_gis-phone-highlight-opened');
                this._schedulePopup.toggle();
            }
        },

        /**
         * <a> click handler
         * This one should be passed directly as event handler
         */
        onAnchorClick: function() {
            var gaInvoke = DGExt.$(this).data('ga-invoke');
            if (gaInvoke) {
                kango.invokeAsync('DGExt.services.ga.' + gaInvoke);
            }

            var bcUrl = DGExt.$(this).data('reg-bc-url');
            if (bcUrl) {
                kango.invokeAsync('DGExt.utils.regBusinessConnection', bcUrl);
            }
        },

        onBodyClick: function() {
            DGExt.$(window).trigger('popup_remove' + this._eventNamespace);
        },

        onMouseEnter: function() {
            if (!this._phoneNode) {
                return;
            }
            this._phoneNode.trigger('popup_active');
        },

        onMouseLeave: function() {
            if (!this._phoneNode) {
                return;
            }
            if (DGExt.$('.js_gis-p2d-form').length) {
                return;
            }
            this._phoneNode.trigger('mouseleave');
        },

        onPopupRemove: function() {
            if (!this._phoneNode) {
                return;
            }

            this._phoneNode.removeClass('_gis-by-click');
            DGExt.$(this._popupFrame.parentNode).remove();
            for (var i = 0; i < this._p2dInvokers.length; i ++) {
                this._p2dInvokers[i].destroy();
            }
            this._p2dInvokers = [];

            DGExt.$(window).off('popup_remove' + this._eventNamespace);
            DGExt.$(window).off('resize' + this._eventNamespace);
            DGExt.$('body').off('click' + this._eventNamespace);
        }
    });
})();