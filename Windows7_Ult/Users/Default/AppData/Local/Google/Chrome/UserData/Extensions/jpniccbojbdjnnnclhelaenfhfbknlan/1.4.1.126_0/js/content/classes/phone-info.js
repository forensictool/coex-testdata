var DGExt = DGExt || {};

(function() {
    "use strict";

    /**
     * Phone nodes behavior controller
     * @param i18n
     * @constructor
     */
    DGExt.PhoneInfo = function(i18n) {
        var self = this;
        this.i18n = i18n;

        kango.xhr.send({url: 'templates/handlebars/phone-popup.hbs'}, function(data) {
            DGExt._phonePopupTemplateSource = data.response;
        });

        // parse static content
        this.parser.makePhoneLinks(document.body);
        DGExt.extend(self._phones, self.parser.resultPhones);

        kango.addMessageListener('resultComplete', this.proxy(this.onResultComplete));
        for (var id in this.parser.resultPhones) {
            if (!this.parser.resultPhones.hasOwnProperty(id)) {
                continue;
            }
            this.onPhoneFound(id);
        }
    };

    DGExt.extend(DGExt.PhoneInfo.prototype, {
        hoverTimer: [],

        overTimer: [],

        timeout: 4000,

        activeWrapper: null,
        activePopup: null,

        phoneWrappers: {},

        _phones: {},

        _info: {},

        parser: new DGExt.PhoneWrapper(),

        /**
         * Should we invoke the onclick event after data is received
         */
        _autoclick: {},

        /**
         * Add phones to collection
         * @param _phones
         */
        addPhones: function(_phones) {
            DGExt.extend(this._phones, _phones);
        },

        /**
         * Event handler called when we received proper data from server and ready to display them to user
         * @param id
         */
        onPhoneFound: function(id) {
            var wrapper = DGExt.$('.js_gis-phone-highlight-wrap-' + id);
            if (!wrapper.length) {
                return;
            }

            wrapper.addClass('_gis-phone-highlight-phone-wrap');
            this.phoneWrappers[id] = wrapper;

            var self = this;
            wrapper.on('mouseenter', function() {
                self._autoclick[id] = true;
                self.onPhoneInfoRequested(this, id);
            }).on('mouseleave', function() {
                self._autoclick[id] = false;
            }).on('click', function() {
                self._autoclick[id] = true;
            });
        },

        /**
         * Phone data is requested on hover, this is hover handler
         * @param wrapper
         * @param id
         */
        onPhoneInfoRequested: function(wrapper, id) {
            DGExt.utils.log(this._phones);
            if (this._info[id] === undefined) {
                if (!!this._phones[id].dirty) {
                    var args = {phone: this._phones[id].dirty, short: this._phones[id].short, id: id};
                    kango.invokeAsync('DGExt.services.gis.processFirmByPhone', args);
                }
            } else {
                this.onResultComplete(this._info[id]);
            }
        },

        /**
         * Called from DGExt.services.gis.processFirmByPhone as a result processing callback
         *
         * @param event
         */
        onResultComplete: function(event) {
            var id = event.data.id;
            var self = this;

            var wrapper = this.phoneWrappers[id];
            if (!wrapper || !wrapper.length) {
                return;
            }

            // phone not found
            if (!event.data.result) {
                event.data.result = {
                    _woResult: true, // if not found, this is undefined (falsy)

                    firmNameParts: {
                        brand: 'Push To Dial',
                        extension: self.i18n.getMessage('__phone_number_{phone}', {phone: event.data.phone})
                    },

                    firmContactGroups: [
                        {contacts: {phone: [event.data.phone]}}
                    ]
                };
            }

            wrapper.off('click').off('mouseenter').off('mouseleave')
                .on('click', function(e) {
                    var parent = this.parentNode;
                    if (parent.tagName !== 'A') {
                        e.stopImmediatePropagation();
                        clearTimeout(self.hoverTimer[id]);
                        clearTimeout(self.overTimer[id]);
                        self.initPhoneHighlightPopup(event.data.result, wrapper);
                        wrapper.addClass('_gis-by-click');
                    } else {
                        clearTimeout(self.hoverTimer[id]);
                        self.overTimer[id] = setTimeout(function() {
                            if (self.activeWrapper && self.activeWrapper === wrapper) {
                                DGExt.$(window).trigger('popup_remove');
                            }
                        }, 400);
                    }
                }).on('mouseenter', this.proxy(function(e) {
                    if (DGExt.$('._gis-phone-highlight-widget').length) {
                        return false;
                    }
                    clearTimeout(this.hoverTimer[id]);
                    clearTimeout(this.overTimer[id]);
                    this.hoverTimer[id] = setTimeout(this.proxy(function() {
                        this.initPhoneHighlightPopup(event.data.result, wrapper);
                    }), 400);
                })).on('mouseleave', this.proxy(function(e) {
                    if (wrapper.hasClass('_gis-by-click')) {
                        return false;
                    }
                    clearTimeout(this.hoverTimer[id]);
                    this.overTimer[id] = setTimeout(this.proxy(function() {
                        if (this.activeWrapper && this.activeWrapper === wrapper) {
                            DGExt.$(window).trigger('popup_remove');
                        }
                    }), 400);
                })).on('popup_active', this.proxy(function(e) {
                    clearTimeout(this.overTimer[id]);
                }));

            // todo: repeat click when data is received: looks like dirty workaround
            if (this._autoclick[id]) {
                wrapper.trigger('mouseenter'); // todo: potential bug: same behavior on click and on hover is wrong
                delete this._autoclick;
            }

            if (this._info[id] === undefined) {
                this._info[id] = event;
            }
        },

        proxy: function(f) {
            var self = this;
            return function() {
                f.apply(self, arguments);
            };
        },

        /**
         * Initialize phone popup
         * @param data
         * @param wrapper
         */
        initPhoneHighlightPopup: function(data, wrapper) {
            this.activeWrapper = wrapper;
            this.activePopup = new DGExt.PhonePopup(wrapper, data, this.i18n);
        }
    });
})();