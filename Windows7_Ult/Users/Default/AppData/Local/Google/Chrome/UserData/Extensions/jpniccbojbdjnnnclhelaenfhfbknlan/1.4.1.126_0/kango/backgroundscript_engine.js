kango.BackgroundScriptEngine = function () {
};
kango.BackgroundScriptEngine.prototype = {_sandbox: null, _window: null, init: function (a) {
    this._sandbox = kango.lang.createHTMLSandbox("background.html", kango.func.bind(function (b, c) {
        this._initScripts(b, c || a)
    }, this))
}, getContext: function () {
    return this._window
}, dispose: function () {
    this._window = null;
    null != this._sandbox && (this._sandbox.dispose(), this._sandbox = null)
}, isLoaded: function () {
    var a = this.getContext();
    return null != a && "complete" == a.document.readyState && "undefined" != typeof a.kango
}, _initScripts: function (a, b) {
    this._window = a;
    a.kango = b;
    var c = a.document, d = kango.getExtensionInfo().background_scripts;
    if ("undefined" != typeof d && 0 < d.length) {
        var e = 0, f = function () {
            var a = c.createElement("script");
            a.setAttribute("type", "text/javascript");
            a.setAttribute("src", kango.io.getExtensionFileUrl(d[e]));
            var b = function () {
                e++;
                e < d.length && f()
            };
            "undefined" != typeof a.onreadystatechange ? a.onreadystatechange = function () {
                "complete" == a.readyState && b()
            } : a.onload = b;
            c.body.appendChild(a)
        };
        f()
    }
}};
kango.registerModule(function (a) {
    a.backgroundScript = new kango.BackgroundScriptEngine;
    a.addEventListener(a.event.READY, function () {
        a.backgroundScript.init(a)
    });
    this.dispose = function () {
        a.backgroundScript.dispose();
        a.backgroundScript = null
    }
});
