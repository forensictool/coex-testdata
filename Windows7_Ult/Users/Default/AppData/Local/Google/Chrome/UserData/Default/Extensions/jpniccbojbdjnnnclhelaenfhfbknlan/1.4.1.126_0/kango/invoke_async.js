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
