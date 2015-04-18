var DGExt = DGExt || {};

(function() {
    "use strict";

    DGExt.PopupView = function() {

    };

    DGExt.$.extend(DGExt.PopupView.prototype, {
        _scroller: null,

        /**
         * Bring jquery back to global scope temporarily
         * (workaround for baron.min.js)
         * @param callback
         */
        jQueryWrap: function(callback) {
            if (window.$) {
                window.__$ = window.$;
            }
            window.$ = window.jQuery = DGExt.$;
            callback();
            if (window.__$) {
                window.$ = window.jQuery = window.__$;
                window.__$ = undefined;
            } else {
                window.$ = window.jQuery = undefined;
            }
        },

        /**
         * Init baron scroller
         *
         * @param [reinit]
         */
        initPopupScroll: function(reinit) {
            if (DGExt.utils.getBrowserName() === 'Firefox' && DGExt.utils.getOS() === 'Mac') {
                // firefox under mac doubles scrollbar when using baron, so we disable it
                return;
            }

            if (reinit) {
                if (this._scroller !== null) {
                    this._scroller.update();
                }
            } else {
                var self = this;
                this.jQueryWrap(function() {
                    self._scroller = DGExt.$('.scroll-pane').baron({
                        bar: '.scroll-bar',
                        track: '.scroll-track',
                        barOnCls: 'show'
                    });
                });
            }
        },

        /**
         * Refresh popup size (calculate + apply)
         * @param popupId
         */
        refreshPopupHeight: function(popupId) {
            var popupHeight = DGExt.$('.header').outerHeight() + DGExt.$('.body').outerHeight() +
                DGExt.$('.ext-comments').outerHeight() + DGExt.$('.html-attributions').outerHeight() + 40; // 40px - поля
            if (popupHeight > DGExt._popupMaxHeight) {
                popupHeight = DGExt._popupMaxHeight;
            }

            this.applyPopupHeight(popupHeight, true);
            kango.invokeAsync('DGExt.utils.registerPopupHeight', popupId, popupHeight);
            DGExt._registeredPopupHeights[popupId] = popupHeight;
        },

        /**
         * Apply popup height
         * @param height
         * @param addDelay
         */
        applyPopupHeight: function(height, addDelay) {
            DGExt.$('html, body').attr('style', 'height: ' + height + 'px !important');

            if (addDelay) {
                window.setTimeout(function() { // sometimes chrome(mac) fails to render popup size instantly. Ugly fix.
                    DGExt.$('html, body').attr('style', 'height: ' + height + 'px !important');
                }, 500);
            }

            if (kango.ui.browserButton.resizePopup) {
                kango.ui.browserButton.resizePopup(DGExt._popupWidth, height);
            }
        },

        /**
         * Init popup
         * @param popupId
         */
        initPopup: function(popupId) {
            var self = this;
            if (!DGExt._registeredPopupHeights[popupId]) {
                this.refreshPopupHeight(popupId);
            }

            // Additional waiting for rendering
            setTimeout(function() {
                // Set scroll pane height
                DGExt.$('.scroll-pane').attr('style', 'height: ' +
                    (DGExt.$('body').outerHeight() - DGExt.$('.header').outerHeight() - 10) + 'px !important;');

                // Init scroll
                self.initPopupScroll();
            }, 10); // todo: fix this, looks very dirty
        }
    });
})();