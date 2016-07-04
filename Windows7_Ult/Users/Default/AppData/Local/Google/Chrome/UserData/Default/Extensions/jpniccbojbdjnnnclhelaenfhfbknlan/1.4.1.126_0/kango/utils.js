kango.oop = {extend: function (a, c) {
    var b = function () {
    };
    b.prototype = a.prototype;
    b = new b;
    b.superclass = a;
    this.mixin(b, c);
    return b
}, mixin: function (a, c) {
    for (var b in c)c.hasOwnProperty(b) && (a[b] = c[b]);
    return a
}, createProxy: function (a) {
    var c = function () {
    };
    c.prototype = a;
    c = new c;
    c.baseObject = a;
    for (var b in c)"function" == typeof c[b] && "_" != b.charAt(0) && (c[b] = function (a) {
        return function () {
            return this.baseObject[a].apply(this.baseObject, arguments)
        }
    }(b));
    return c
}};
kango.array = {map: function (a, c, b) {
    for (var e = a.length, f = Array(e), d = 0; d < e; d++)f[d] = c.call(b || null, a[d], d);
    return f
}, forEach: function (a, c, b) {
    for (var e = a.length, f = 0; f < e; f++)c.call(b || null, a[f], f)
}, filter: function (a, c, b) {
    for (var e = [], f = a.length, d = 0; d < f; d++)c.call(b || null, a[d], d) && e.push(a[d]);
    return e
}};
kango.string = {format: function (a, c) {
    if ("object" == typeof c && null != c)kango.array.forEach(kango.object.getKeys(c), function (b) {
        a = a.replace(RegExp("\\{" + b + "}", "g"), c[b])
    }); else for (var b = 1; b < arguments.length; b++)a = a.replace(RegExp("\\{" + (b - 1) + "}", "g"), arguments[b]);
    return a
}, isAlpha: function (a) {
    return"a" <= a && "z" >= a || "A" <= a && "Z" >= a
}, isDigit: function (a) {
    return"0" <= a && "9" >= a
}, parseUri: function (a) {
    a = a.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/);
    return{scheme: a[2], authority: a[4], path: a[5],
        query: a[7], fragment: a[9]}
}};
kango.object = {getKeys: function (a) {
    var c = [], b;
    for (b in a)a.hasOwnProperty(b) && c.push(b);
    return c
}, isArray: function (a) {
    return a instanceof Array || "[object Array]" == Object.prototype.toString.call(a)
}, isObject: function (a) {
    return"object" == typeof a || "[object Object]" == Object.prototype.toString.call(a)
}, isString: function (a) {
    return"string" == typeof a || a instanceof String
}, clone: function (a) {
    return JSON.parse(JSON.stringify(a))
}, sanitize: function (a) {
    return JSON.parse(JSON.stringify(a))
}, resolveName: function (a, c) {
    for (var b = a, e = c.split("."), f = e.pop(), d = 0; d < e.length; d++)b = b[e[d]];
    return{parent: b, terminalName: f}
}, resolveOrCreateName: function (a, c) {
    for (var b = a, e = c.split("."), f = e.pop(), d = 0; d < e.length; d++)b[e[d]] = b[e[d]] || {}, b = b[e[d]];
    return{parent: b, terminalName: f}
}};
kango.date = {diff: function (a, c) {
    return Math.ceil((a.getTime() - c.getTime()) / 1E3) || 0
}};
kango.func = {isCallable: function (a) {
    return"function" == typeof a || a && "undefined" != typeof a.call && "undefined" != typeof a.apply
}, bind: function (a, c) {
    var b = Array.prototype.slice.call(arguments, 2);
    return function () {
        return a.apply(c, b.concat(Array.prototype.slice.call(arguments, 0)))
    }
}, invoke: function (a, c, b) {
    a = kango.object.resolveName(a, c);
    c = a.parent;
    return c[a.terminalName].apply(c, b)
}, decorate: function (a, c) {
    return function () {
        return c.call(this, a, arguments)
    }
}};
kango.utils = {getDomainFromId: function (a) {
    for (var c = "", b = 0; b < a.length; b++)if (kango.string.isAlpha(a[b]) || kango.string.isDigit(a[b]) || "-" == a[b])c += a[b];
    return c.toLowerCase()
}};