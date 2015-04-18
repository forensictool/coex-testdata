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
