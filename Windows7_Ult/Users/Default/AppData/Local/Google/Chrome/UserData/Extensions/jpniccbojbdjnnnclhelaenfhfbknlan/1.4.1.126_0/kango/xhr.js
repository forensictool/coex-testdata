kango.XHRRequest = function () {
    this.method = "GET";
    this.url = "";
    this.params = {};
    this.headers = {};
    this.async = !0;
    this.mimeType = this.password = this.username = this.contentType = "";
    this.sanitizeData = !1
};
kango.XHRResult = function () {
    this.response = "";
    this.status = 0
};
kango.XHR = function () {
};
kango.XHR.prototype = {_paramsToString: function (a) {
    var b = "", c;
    for (c in a)a.hasOwnProperty(c) && ("" != b && (b += "&"), b += c + "=" + a[c]);
    return b
}, getXMLHttpRequest: function () {
    return new XMLHttpRequest
}, send: function (a, b) {
    var c = this.getXMLHttpRequest(), k = a.method || "GET", r = "undefined" != typeof a.async ? a.async : !0, d = a.params || null, g = a.contentType || "text", e = a.url, s = a.username || null, t = a.password || null, f = a.headers || {}, p = a.mimeType || null, u = a.sanitizeData || !1;
    kango.io.isLocalUrl(e) && (e = kango.io.getExtensionFileUrl(e));
    var q = function (a, c) {
        var b = {response: null, status: 0, abort: function () {
            a.abort()
        }};
        if (2 <= a.readyState && (b.status = a.status, 4 == a.readyState)) {
            if ("xml" == c)b.response = a.responseXML; else if ("json" == c)try {
                b.response = JSON.parse(a.responseText)
            } catch (d) {
            } else b.response = a.responseText;
            b.abort = function () {
            }
        }
        u && delete b.abort;
        return b
    }, h = function () {
        return{response: null, status: 0, abort: function () {
        }}
    };
    null != d && ("object" == typeof a.params && (d = this._paramsToString(d), "POST" == k && (f["Content-Type"] = "application/x-www-form-urlencoded")),
        "GET" == k && (e = e + "?" + d, d = null));
    try {
        c.open(k, e, r, s, t)
    } catch (v) {
        if (kango.func.isCallable(b))try {
            b(h())
        } catch (l) {
            if (l.stack) {
                kango.console.log(l.stack);
            }
            if (-2146828218 != l.number && -2146823277 != l.number)throw l;
        }
        return h()
    }
    "undefined" != typeof c.overrideMimeType && (null != p ? c.overrideMimeType(p) : "json" == g ? c.overrideMimeType("application/json") : "text" == g && c.overrideMimeType("text/plain"));
    c.onreadystatechange = function () {
        if (4 == c.readyState && kango.func.isCallable(b))try {
            b(q(c, g))
        } catch (a) {
            if (a.stack) {
                kango.console.log(a.stack);
            }
            if (-2146828218 != a.number && -2146823277 != a.number)throw a;
        }
    };
    if ("object" == typeof f)for (var m in f)f.hasOwnProperty(m) && c.setRequestHeader(m, f[m]);
    try {
        c.send(d)
    } catch (w) {
        if (kango.func.isCallable(b))try {
            b(h())
        } catch (n) {
            if (n.stack) {
                kango.console.log(n.stack);
            }
            if (-2146828218 != n.number && -2146823277 != n.number)throw n;
        }
        return h()
    }
    return q(c, g)
}};
kango.registerModule(kango.getDefaultModuleRegistrar("xhr", kango.XHR));
