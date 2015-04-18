var DGExt = DGExt || {};

(function() {
    "use strict";

    /**
     * Small management class to emit events for push2dial service
     * @param phoneNode
     * @param _KangoAPI
     * @constructor
     */
    DGExt.PhoneP2dInvoker = function(phoneNode, _KangoAPI) {
        if (typeof KangoAPI !== 'undefined') {
            this._kango = KangoAPI;
        } else {
            this._kango = _KangoAPI || null;
        }
        this._phoneNode = DGExt.$(phoneNode);
        this._phoneLink = this._phoneNode.find('.js_gis-p2d-link');
        this._phoneError = this._phoneNode.find('.js_gis-p2d-error');
        this._active = false;
        this._eventNamespace = '.ev_' + (1000000000 + Math.floor(Math.random() * (2147483647 - 1000000000)));

        var self = this;
        this._phoneLink.on('click', function(e) {
            e.preventDefault();
            self.onPhoneLinkClick(e);
            return false;
        });
        DGExt.$(window).on('p2d_done' + this._eventNamespace, function(e, result) {
            self.onP2dDone(e, result);
        });
    };

    DGExt.extend(DGExt.PhoneP2dInvoker.prototype, {
        _kango: null,
        _phoneNode: null,
        _phoneLink: null,
        _phoneError: null,
        _active: false,
        _eventNamespace: '',

        /**
         * Clicked phone link _inside_ of popup - make call, or show "Link your phone" popup
         * @param e
         */
        onPhoneLinkClick: function(e) {
            e.preventDefault();

            var self = this;
            DGExt.$('._gis-phone-loading').removeClass('_gis-phone-loading');
            this._phoneNode.trigger('loading.start');
            this._phoneNode.addClass('_gis-phone-loading');
            this._active = true;

            kango.invokeAsync('DGExt.services.p2d.push2dial',
                this._phoneLink.data('value'),
                this._phoneLink.data('description') || DGExt.services.i18n.getMessage('__dialing'),
                function(result) {
                    if (!self._active) {
                        return;
                    }
                    if (result && result.error && self._kango) {
                        self._kango.closeWindow();
                    } else {
                        self._active = false;
                    }
                },
                (DGExt._runContext === 'content')
            );

            setTimeout(function() { // todo: temporary workaround, remove when possible
                self._phoneNode.removeClass('_gis-phone-loading');
                self._phoneNode.trigger('loading.end');
            }, 4000);
        },

        /**
         * Call or event handling is over, reset visual state.
         * @param event
         * @param result
         */
        onP2dDone: function(event, result) {
            if (!this._active) {
                return;
            }
            this._phoneNode.removeClass('_gis-phone-loading');
            this._phoneNode.trigger('loading.end');

            if (result.error) { // todo: removed error message because it doesnt fit in block, get it back in future
                // this._phoneNode.addClass('_gis-phone-highlight-error');
                // this._phoneError.text(result.message);
                //
                // var self = this;
                // setTimeout(function() {
                //     if (!self._destroyed) {
                //         self._phoneNode.removeClass('_gis-phone-highlight-error');
                //         self._active = false;
                //     }
                // }), 4000);
            } else {
                this._active = false;
            }
        },

        /**
         * Unbind events on destroy
         */
        destroy: function() {
            this._phoneLink.off('click');
            DGExt.$(window).off('p2d_done' + this._eventNamespace);
        }
    });
})();