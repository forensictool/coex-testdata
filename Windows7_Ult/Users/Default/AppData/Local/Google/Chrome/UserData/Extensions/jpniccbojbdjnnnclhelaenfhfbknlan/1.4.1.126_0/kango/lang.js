kango.Lang = function () {
};
kango.Lang.prototype = kango.oop.extend(kango.LangBase, {createHTMLSandbox: function (a, b) {
    return b(window)
}, evalInSandbox: function (a, b, d) {
    a = "";
    for (var c in b)b.hasOwnProperty(c) && "window" != c && "document" != c && (a += "var " + c + '=api["' + c + '"];');
    try {
        (new Function("api", a + d))(b)
    } catch (e) {
        kango.console.reportError(e, "")
    }
}});
kango.registerModule(kango.getDefaultModuleRegistrar("lang", kango.Lang));
