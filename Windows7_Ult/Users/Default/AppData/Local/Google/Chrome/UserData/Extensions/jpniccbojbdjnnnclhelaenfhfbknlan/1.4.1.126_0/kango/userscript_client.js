kango.UserscriptEngineClient = function () {
};
kango.UserscriptEngineClient.prototype = {run: function (d, a, e) {
    kango.invokeAsync("kango.userscript.getScripts", d.document.URL, a, e, function (b) {
        var a = {kango: kango}, c;
        for (c in b)b.hasOwnProperty(c) && kango.lang.evalScriptsInSandbox(d, a, b[c])
    })
}};
