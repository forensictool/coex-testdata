var kango = {event: {MESSAGE: "message"}, registerModule: function (b, d) {
}, lang: {evalInSandbox: function (b, d, c) {
    for (var a in d)d.hasOwnProperty(a) && (arguments.callee[a] = d[a]);
    (new Function("kango", c))(kango)
}, evalScriptsInSandbox: function (b, d, c) {
    for (var a = "", e = 0; e < c.length; e++) {
        for (var f = 0; f < c[e].requires.length; f++)a += c[e].requires[f].text + "\n\n";
        a += c[e].text + "\n\n"
    }
    return this.evalInSandbox(b, d, a)
}}, browser: {getName: function () {
    return null
}}, console: {log: function (b) {
    console.log(b)
}}, io: {}, tab: {_isPrivate: !1,
    isPrivate: function () {
        return this._isPrivate
    }}, xhr: {send: function (b, d) {
    var c = b.contentType;
    if ("xml" == c || "json" == c)b.contentType = "text";
    b.sanitizeData = !0;
    kango.invokeAsyncCallback("kango.xhr.send", b, function (a) {
        if ("" != a.response && null != a.response)if ("json" == c)try {
            a.response = JSON.parse(a.response)
        } catch (e) {
            a.response = null
        } else if ("xml" == c)try {
            var f = null, f = "undefined" != typeof DOMParser ? DOMParser : window.DOMParser, g = new f;
            a.response = g.parseFromString(a.response, "text/xml")
        } catch (h) {
            a.response = null
        }
        b.contentType =
            c;
        d(a)
    })
}}, _init: function (b) {
    "undefined" == typeof kango.dispatchMessage && this._initMessaging();
    (new kango.UserscriptEngineClient).run(window, b, window == window.top)
}};

kango.browser.getName = function () {
    return"chrome"
};
kango.io.getResourceUrl = function (a) {
    return chrome.extension.getURL(a)
};
kango._initMessaging = function () {
    var a = [];
    chrome.runtime.onMessage.addListener(function (b, d) {
        b.source = b.target = kango;
        "undefined" != typeof b.tab && (kango.tab._isPrivate = b.tab.isPrivate);
        for (var c = 0; c < a.length; c++)a[c](b)
    });
    kango.dispatchMessage = function (b, a) {
        try {
            chrome.runtime.sendMessage({name: b, data: a, origin: "tab", source: null, target: null});
        } catch (e) {
            // well, what we can do here?
            if (!kango._extensionDisconnected) {
                console.info('Extension was disabled or removed. Re-enable it and refresh the page.');
                kango._extensionDisconnected = true;
            }
        }
        return!0
    };
    kango.addEventListener = function (b, d) {
        if ("message" == b) {
            for (var c = 0; c < a.length; c++)if (a[c] == d)return;
            a.push(d)
        }
    };
    new kango.InvokeAsyncModule(kango);
    new kango.MessageTargetModule(kango)
};

kango.InvokeAsyncModule = function (e) {
    this.init(e)
};
kango.InvokeAsyncModule.prototype.init = function (e) {
    var g = {}, l = 0, h = function (a) {
        return"undefined" != typeof a.call && "undefined" != typeof a.apply
    }, m = function (a, b) {
        var c = {id: a.id, result: null, error: null};
        try {
            c.result = e.func.invoke(e.getBackgroundPage() || e.getContext(), a.method, a.params)
        } catch (d) {
            var f = d.message;
            d.stack && (f += "\nStack:\n" + d.stack);
            c.error = f;
            kango.console.log("Error during async call method " + a.method + ". Details: " + f)
        }
        null != a.id && b.dispatchMessage("KangoInvokeAsyncModule_result", c)
    }, n = function (a, b) {
        var c = {id: a.id, result: null, error: null};
        try {
            a.params.push(function (d) {
                c.result = d;
                null != a.id && b.dispatchMessage("KangoInvokeAsyncModule_result", c)
            }), e.func.invoke(e.getBackgroundPage() || e.getContext(), a.method, a.params)
        } catch (d) {
            c.error = d.toString(), null != a.id ? b.dispatchMessage("KangoInvokeAsyncModule_result", c) : kango.console.log("Error during async call method " + a.method + ". Details: " + c.error)
        }
    }, p = function (a, b) {
        if ("undefined" != typeof a.id && "undefined" != typeof g[a.id]) {
            var c = g[a.id];
            try {
                if (null ==
                    a.error && h(c.onSuccess))c.onSuccess(a.result); else if (h(c.onError))c.onError(a.error)
            } finally {
                delete g[a.id]
            }
        }
    };
    e.addEventListener("message", function (a) {
        var b = {};
        b.KangoInvokeAsyncModule_invoke = m;
        b.KangoInvokeAsyncModule_invokeCallback = n;
        b.KangoInvokeAsyncModule_result = p;
        var c = a.data, d;
        for (d in b)if (b.hasOwnProperty(d) && d == a.name) {
            b[d](c, a.source);
            break
        }
    });
    var k = function (a, b) {
        b = Array.prototype.slice.call(b, 0);
        var c = b[b.length - 1], d = {onSuccess: function () {
        }, onError: function (a) {
            kango.console.log("Error during async call method " +
                b[0] + ". Details: " + a)
        }, isCallbackInvoke: a, isNotifyInvoke: !1};
        null != c && h(c) ? (d.onSuccess = function (a) {
            c(a)
        }, b[b.length - 1] = d) : (d.isNotifyInvoke = !0, b.push(d));
        e.invokeAsyncEx.apply(e, b)
    };
    e.invokeAsyncEx = function (a) {
        var b = arguments[arguments.length - 1], c = b.isCallbackInvoke ? "KangoInvokeAsyncModule_invokeCallback" : "KangoInvokeAsyncModule_invoke", d = Array.prototype.slice.call(arguments, 1, arguments.length - 1), f = null;
        b.isNotifyInvoke || (f = (Math.random() + l++).toString(), g[f] = b);
        e.dispatchMessage(c, {id: f, method: a,
            params: d})
    };
    e.invokeAsync = function (a) {
        k(!1, arguments)
    };
    e.invokeAsyncCallback = function (a) {
        k(!0, arguments)
    }
};
kango.registerModule(kango.InvokeAsyncModule);

kango.MessageTargetModule = function (e) {
    this.init(e)
};
kango.MessageTargetModule.prototype.init = function (e) {
    var a = {};
    e.addMessageListener = function (c, d) {
        if ("undefined" != typeof d.call && "undefined" != typeof d.apply) {
            a[c] = a[c] || [];
            for (var b = 0; b < a[c].length; b++)if (a[c][b] == d)return!1;
            a[c].push(d);
            return!0
        }
        return!1
    };
    e.removeMessageListener = function (c, d) {
        if ("undefined" != typeof a[c])for (var b = 0; b < a[c].length; b++)if (a[c][b] == d)return a[c].splice(b, 1), !0;
        return!1
    };
    e.removeAllMessageListeners = function () {
        a = {}
    };
    e.addEventListener("message", function (c) {
        var d = c.name;
        if ("undefined" != typeof a[d])for (var b = 0; b < a[d].length; b++) {
            var e = !1;
            if ("unknown" == typeof a[d][b].call)e = !0; else try {
                a[d][b](c)
            } catch (f) {
                if (f.stack) {
                    kango.console.log(f.stack);
                }
                if (-2146828218 == f.number || -2146823277 == f.number)e = !0; else throw f;
            }
            e && (a[d].splice(b, 1), b--)
        }
    })
};
kango.registerModule(kango.MessageTargetModule);

kango.UserscriptEngineClient = function () {
};
kango.UserscriptEngineClient.prototype = {run: function (d, a, e) {
    kango.invokeAsync("kango.userscript.getScripts", d.document.URL, a, e, function (b) {
        var a = {kango: kango}, c;
        for (c in b)b.hasOwnProperty(c) && kango.lang.evalScriptsInSandbox(d, a, b[c])
    })
}};

window.addEventListener("DOMContentLoaded", function () {
    kango._init("document-end")
}, !1);
kango._init("document-start");
