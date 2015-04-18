var DGExt = DGExt || {};


(function() {
    "use strict";
    /**
     * Simple document changes observer using mutationSummary library
     * For parsing phones in dynamically loaded content
     */
    DGExt.DocumentObserver = function() {
        this.init();
    };

    DGExt.extend(DGExt.DocumentObserver.prototype, {
        parser: null,
        timeout: 100, // ms
        timeoutId: null,
        pieces: [],

        attemptStart: function() {
            if (this.timeoutId) {
                clearTimeout(this.timeoutId);
            }

            var self = this;
            this.timeoutId = setTimeout(function() {
                self.start();
            }, this.timeout);
        },

        start: function() {
            if (this.timeoutId) {
                clearTimeout(this.timeoutId);
            }
            var self = this;
            while (this.pieces.length) {
                var piece = this.pieces.splice(0, 1)[0];
                setTimeout(function() { // don't run right now, place to internal queue to avoid page freeze
                    for (var i in piece) {
                        if (piece[i] && piece[i].parentNode && self.parser.nodeNeedsParsing(piece[i])) {
                            if (DGExt.utils.getAttr(piece[i].parentNode, 'data-ph-parsed')) {
                                DGExt.utils.setAttr(piece[i].parentNode, 'data-ph-parsed', false);
                            }
                            self.parser.makePhoneLinks(piece[i].parentNode);
                            DGExt.services.phoneInfo.addPhones(self.parser.resultPhones);
                            for (var id in self.parser.resultPhones) {
                                if (!self.parser.resultPhones.hasOwnProperty(id)) {
                                    continue;
                                }
                                DGExt.services.phoneInfo.onPhoneFound(id);
                            }
                        }
                    }
                }, 0);
            }
        },

        init: function() {
            if (!window.MutationObserver) {
                return; // safari for windows - NIY
            }

            this.parser = new DGExt.PhoneWrapper();

            // Use document to listen to all events on the page (you might want to be more specific)
            var $observerSummaryRoot = DGExt.$(document);
            var self = this;

            function callback(summaries) {
                $observerSummaryRoot.mutationSummary("pause");
                if (summaries[0] && summaries[0].added) {
                    self.pieces.push(summaries[0].added);
                }
                $observerSummaryRoot.mutationSummary("resume");
                self.attemptStart();
            }

            $observerSummaryRoot.mutationSummary("connect", callback, [
                { characterData: true }
            ]);
        }
    });
})();