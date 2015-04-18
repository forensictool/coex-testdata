var DGExt = DGExt || {};

(function() {
    "use strict";

    DGExt.PopupController = function() {

    };

    DGExt.$.extend(DGExt.PopupController.prototype, {
        /**
         * Get content window of popup frame
         * @todo to framework
         *
         * @returns {*}
         */
        getPopupWindow: function() {
            var popupWindow = null;
            if (typeof chrome !== 'undefined') { // chrome, yandex, etc
                var windows = chrome.extension.getViews({
                    'type': "popup"
                });
                // identify popup by root element id
                for (var i = 0; i < windows.length; i++) {
                    if (windows[i].document.body.getAttribute('class').indexOf('_id_dgext-toolbar-popup-marker') !== -1) {
                        popupWindow = windows[i];
                        break;
                    }
                }
            } else if (typeof safari !== 'undefined') {
                for (var k = 0; k < safari.extension.popovers.length; k++) {
                    if (safari.extension.popovers[k].contentWindow.document.body.getAttribute('class').indexOf('_id_dgext-toolbar-popup-marker') !== -1) {
                        popupWindow = safari.extension.popovers[k].contentWindow;
                        break;
                    }
                }
            } else if (kango.browser.getName() === 'firefox') {
                var frame = kango.chromeWindows.getMostRecentChromeWindow().document.getElementById('kango-ui-popup-frame_' + kango.utils.getDomainFromId(kango.getExtensionInfo().id));
                if (frame) {
                    popupWindow = frame.contentWindow;
                }
            }

            return popupWindow;
        },

        getWaitingFunc: function() {
            var waitForProcessingFinished = function(waitForCallback, callback, timeoutCallback) {
                var attempts = 0;
                if (DGExt.$.isFunction(waitForCallback) && !waitForCallback()) {
                    if (attempts < 5) {
                        setTimeout(function() {
                            waitForProcessingFinished(callback);
                        }, 100);
                    } else {
                        if (DGExt.$.isFunction(timeoutCallback)) {
                            timeoutCallback();
                        }
                        return;
                    }
                    attempts++;
                } else {
                    if (DGExt.$.isFunction(callback)) {
                        callback();
                    }
                }
            };

            return waitForProcessingFinished;
        },

        /**
         * Send event to popup
         *
         * @param selector
         * @param event
         * @param [data]
         */
        triggerEvent: function(selector, event, data) {
            var self = this;
            var waitFor = this.getWaitingFunc();

            function sendEvent() {
                DGExt.utils.log('Sent event');
                DGExt.utils.log(data);
                var _window = self.getPopupWindow();
                if (_window) {
                    _window.DGExt.$(_window.document).find(selector).trigger(event, data ? [data] : []);
                } else {
                    DGExt.utils.log('[info] Failed to send event for popup: no window');
                }
            }

            function timeouted() {
                DGExt.utils.log('No popup frame! Cannot send event ' + event);
                DGExt.utils.log(data);
            }

            function checkWindow() {
                var _window = self.getPopupWindow();
                return _window && _window.DGExt;
            }

            waitFor(checkWindow, sendEvent, timeouted);

            /*
                Inside popup script:
                 DGExt.$(selector).on(event, function(e, data) {
                    // do something with data
                 })
             */
        },

        /**
         * Open tab with popup content
         *
         * Only for debug and test purposes only!
         */
        openPopupTab: function() {
            kango.browser.tabs.create({url: '/templates/toolbar-popup.html'});
        },

        /**
         * Programmatically close popup from background
         */
        closePopup: function() {
            var _window = this.getPopupWindow();
            if (_window && _window.DGExt) {
                _window.DGExt.$(function() {
                    if (_window.KangoAPI) {
                        _window.KangoAPI.onReady(function() {
                            _window.KangoAPI.closeWindow();
                        });
                    }
                });
            } else {
                DGExt.utils.log('No popup frame! Cannot close popup');
            }
        }
    });


})();