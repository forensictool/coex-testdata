kango.ui.OptionsPage = function () {
};
kango.ui.OptionsPage.prototype = kango.oop.extend(kango.ui.IOptionsPage, {open: function (a) {
    var b = kango.getExtensionInfo();
    if ("undefined" != typeof b.options_page) {
        var c = kango.io.getExtensionFileUrl(b.options_page);
        "undefined" != typeof a && (c += "#" + a);
        kango.browser.tabs.getAll(function (a) {
            var b = !1;
            kango.array.forEach(a, function (a) {
                -1 != a.getUrl().indexOf(c) && (b = !0, a.activate())
            });
            b || kango.browser.tabs.create({url: c, focused: !0})
        });
        return!0
    }
    return!1
}});
kango.registerModule(kango.getDefaultModuleRegistrar("ui.optionsPage", kango.ui.OptionsPage));
