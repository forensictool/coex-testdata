var DGExt = DGExt || {};

(function() {
    "use strict";

    /**
     * Content area push2dial popup request handler
     */
    DGExt.PushToDialPopup = function(i18n) {
        this.i18n = i18n;

        kango.xhr.send({url: 'templates/handlebars/p2d-popup.hbs'}, function(data) {
            DGExt._p2dPopupTemplateSource = data.response;
        });

        kango.addMessageListener('p2d_push2dialDone', this.proxy(this.onPush2DialDone));
        kango.addMessageListener('p2d_bindDone', this.proxy(this.onPush2DialBind));
    };

    DGExt.extend(DGExt.PushToDialPopup.prototype, {
        p2dPopupFrame: null,
        p2dPopup: null,

        proxy: function(f) {
            var self = this;
            return function() {
                f.apply(self, arguments);
            };
        },

        /**
         * Show push2dial popup for case when phone is not linked
         *
         * @param phone
         * @param desc
         */
        initP2DPopup: function(phone, desc) {
            if (DGExt.$('._gis-p2d-form-iframe').length) {
                return;
            }

            var self = this;

            kango.invokeAsync('DGExt.services.ga._P2DPopupOpened');

            var popupFrameWrapper = DGExt.utils.createPopupFrame('_gis-p2d-form-iframe', '');
            this.p2dPopupFrame = popupFrameWrapper.find('iframe')[0];
            popupFrameWrapper.find('iframe').on('load', function() {
                var template = Handlebars.compile(DGExt._p2dPopupTemplateSource);
                var content = template({});
                DGExt.utils.appendContentToPopupFrame(self.p2dPopupFrame, content);

                DGExt.$('<style/>').appendTo(DGExt.$(self.p2dPopupFrame.contentWindow.document.head)).html(DGExt.$('#_gis-main-content-normalize-css').html());
                DGExt.$('<style/>').appendTo(DGExt.$(self.p2dPopupFrame.contentWindow.document.head)).html("html {background-color: transparent;}");
                DGExt.$('<style/>').appendTo(DGExt.$(self.p2dPopupFrame.contentWindow.document.head)).html(DGExt.$('#_gis-main-content-css').html());

                self.p2dPopup = DGExt.$(self.p2dPopupFrame.contentWindow.document.body).find('.js_gis-p2d-form');

                DGExt.$('body').on('click', function() {
                    self.closeP2DPopup();
                });

                self.p2dPopup.find('form input:first').focus();

                self.p2dPopup.find('.js_gis-button-p2d').click(function() {
                    var gaInvoke = DGExt.$(self).attr('data-ga-invoke');
                    if (gaInvoke) {
                        kango.invokeAsync('DGExt.services.ga.' + gaInvoke);
                    }
                });

                DGExt.$('form', self.p2dPopup).gisForm();

                DGExt.$('.js_gis-p2d-close', self.p2dPopup).on('click', function(e) {
                    e.stopImmediatePropagation();
                    self.closeP2DPopup();
                });

                DGExt.$('form', self.p2dPopup).on('submit', function() {
                    var pin = '', value = DGExt.$(this).serializeArray();

                    for (var i in value) {
                        pin += value[i].value;
                    }

                    kango.invokeAsync('DGExt.services.p2d.bind', pin, phone);
                    return false;
                });

                self.p2dPopup.on('click', function(e) {
                    e.stopImmediatePropagation();
                });

                DGExt.$('.js_gis-p2d-call', self.p2dPopup).on('click', function(e) {
                    var el = DGExt.$(self);
                    e.stopImmediatePropagation();

                    DGExt.$(self).hide();
                    DGExt.$(self).next().show();

                    kango.invokeAsync('DGExt.services.p2d.push2dial', phone, desc, function() {
                        setTimeout(function() {
                            self.closeP2DPopup();
                        }, 1000);
                    }, false);
                });
            });
            popupFrameWrapper.trigger('appendFrame');
        },

        closeP2DPopup: function() {
            if (this.p2dPopupFrame) {
                DGExt.$(this.p2dPopupFrame).remove();
                this.p2dPopupFrame = null;
            }

            DGExt.$('.js_gis-phone-active').removeClass('_gis-phone-highlight-error');
        },

        /**
         * Handle response from push2dial service and open dialog if phone is not linked
         * @param result
         */
        onPush2DialDone: function(result) {
            DGExt.$(window).trigger('p2d_done', result.data);
            var self = this;

            if (result.data.error && result.data.type === 'badToken') {
                this.initP2DPopup(result.data.phone, result.data.desc);
            } else {
                setTimeout(function() {
                    self.closeP2DPopup();
                }, 2000);
            }
        },

        /**
         * Handle reply from push2dial service when binding phone to browser
         * @param result
         */
        onPush2DialBind: function(result) {
            this.p2dPopup.removeClass('_gis-p2d-form-success _gis-p2d-form-error');

            if (result.data.error) {
                this.p2dPopup.addClass('_gis-p2d-form-error');
                DGExt.$('._gis-p2d-form-info', this.p2dPopup).text(result.data.message);
            } else {
                this.p2dPopup.addClass('_gis-p2d-form-success');
            }
        }
    });
})();