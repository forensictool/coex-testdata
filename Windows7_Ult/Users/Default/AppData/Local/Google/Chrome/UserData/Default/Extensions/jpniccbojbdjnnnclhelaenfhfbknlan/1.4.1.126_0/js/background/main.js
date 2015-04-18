(function() {
    "use strict";

    /**
     * Bootstrap and main entry point for background scripts
     */

    DGExt.utils.log('---------- START ----------');

    DGExt._runContext = 'background';

    // library classes
    DGExt.services = {};
    DGExt.services.ga = DGExt.GoogleAnalyticsService();
    DGExt.Errors();

    /**
     * On first launch, there is no "installed" flag in storage - set it and send installation event to analytics
     * @todo unittest
     * @private
     */
    function firstInstall() {
        setTimeout(function() {
            if (kango && kango.storage) {
                var info = kango.getExtensionInfo();
                var installed = kango.storage.getItem('_installed');
                if (!installed) {
                    kango.storage.setItem('_installed', true);
                    DGExt.services.ga._EVInstalled(info.version);
                    kango.browser.tabs.create({'url': DGExt.services.i18n.getMessage('__welcome_page_link')});
                } else {
                    if (!kango.storage.getItem('_ext_v_' + info.version)) {
                        kango.storage.setItem('_ext_v_' + info.version, true);
                        DGExt.services.ga._EVUpdated(info.version);
                    }
                }
            }
        }, 1000);
    }

    new DGExt.I18n(function(_i18n) {
        // i18n should be created before everything else, because of possible existence of localized text inside of object constructors.
        DGExt.services.i18n = _i18n;
        DGExt.services.p2d = DGExt.PushToDialService();
        DGExt.services.gis = new DGExt.Catalog();
        DGExt.services.loc = new DGExt.LocaleDetector();
        DGExt.services.gl = new DGExt.GeoLocation();
        DGExt.services.time = new DGExt.TimeServiceClient();
        DGExt.services.timeoutQueue = new DGExt.TimeoutQueue();
        DGExt.services.timeService = new DGExt.TimeService();
        DGExt.services.popupController = new DGExt.PopupController();

        DGExt.services.checkProcessingStatus = function() {
            return DGExt._dataFetchFinished;
        };

        // now init everything
        DGExt.init();
        firstInstall();
    });
})();