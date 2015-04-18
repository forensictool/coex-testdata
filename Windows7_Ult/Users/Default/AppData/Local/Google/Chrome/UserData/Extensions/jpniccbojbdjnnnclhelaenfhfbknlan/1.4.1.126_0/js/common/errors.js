var DGExt = DGExt || {};

(function() {
    "use strict";

    /**
     * @todo unittest
     */
    function ourError(url, line) {
        if (DGExt._runContext !== 'content') { // bg and popup errors are from us
            return true;
        }

        var externalError = (
            url.match(/^https?:\/\//) || // disable error logging for target site errors, resources and files
            url.match(/^resource:\/\//) ||
            url.match(/^file:\/\//) ||
            !url || // empty url or error on line zero = external script error
            !line ||
            !url.match(/.*?:\/\/.*/) // no proto or path - don't log it
        );

        return !externalError;
    }

    DGExt.Errors = DGExt.Errors || function() {
        window.onerror = function(message, url, line) {
            if (!ourError(url, line)) {
                return false;
            }

            if (DGExt.services.ga) {
                var ver = '1.4.1.126';
                var cleanUrl = url.replace(/^chrome-extension:\/\/[a-z0-9]+/i, '[chrome]').replace(/^safari-extension:\/\/[a-z0-9\-\.]+/i, '[safari]').replace(/^chrome:\/\/[a-z0-9\-]+/i, '[firefox]');
                var msg = '[v' + ver + ' ' + cleanUrl + ':' + line + '] ' + message;
                DGExt.services.ga._JSError(msg);
            }

            return DGExt._debug.preventDefaultErrorHandler; // return false = use standard handler too
        };
    };
})();
