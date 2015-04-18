kango.KangoBrowserCookie = function () {
    this.path = this.hostOnly = this.domain = this.value = this.name = "";
    this.session = this.httpOnly = this.secure = !1;
    this.expires = 0
};
kango.BrowserBase = function () {
    kango.oop.mixin(this, kango.EventTarget.prototype);
    kango.oop.mixin(this, new kango.EventTarget)
};
kango.BrowserBase.prototype = {event: {
    DOCUMENT_COMPLETE: "DocumentComplete",
    BEFORE_NAVIGATE: "BeforeNavigate",
    TAB_CHANGED: "TabChanged",
    TAB_LOCATION_CHANGED: "TabLocationChanged",
    TAB_CREATED: "TabCreated",
    TAB_REMOVED: "TabRemoved",
    WINDOW_CHANGED: "WindowChanged"
}, getName: function () {
    throw new kango.NotImplementedException;
}, cookies: {getCookies: function (a, b) {
    throw new kango.NotImplementedException;
}, getCookie: function (a, b, c) {
    throw new kango.NotImplementedException;
}, setCookie: function (a, b) {
    throw new kango.NotImplementedException;
}}, tabs: {getAll: function (a) {
    throw new kango.NotImplementedException;
}, getCurrent: function (a) {
    throw new kango.NotImplementedException;
}, create: function (a) {
    throw new kango.NotImplementedException;
}}, windows: {getAll: function (a) {
    throw new kango.NotImplementedException;
}, getCurrent: function (a) {
    throw new kango.NotImplementedException;
}, create: function (a) {
    throw new kango.NotImplementedException;
}}};
kango.IBrowserWindow = function () {
};
kango.IBrowserWindow.prototype = {getId: function () {
    throw new kango.NotImplementedException;
}, getTabs: function (a) {
    throw new kango.NotImplementedException;
}, getCurrentTab: function (a) {
    throw new kango.NotImplementedException;
}, isActive: function () {
    throw new kango.NotImplementedException;
}};
kango.IBrowserTab = function () {
};
kango.IBrowserTab.prototype = {getId: function () {
    throw new kango.NotImplementedException;
}, getUrl: function () {
    throw new kango.NotImplementedException;
}, getTitle: function () {
    throw new kango.NotImplementedException;
}, getDOMWindow: function () {
    throw new kango.NotImplementedException;
}, isActive: function () {
    throw new kango.NotImplementedException;
}, isPrivate: function () {
    throw new kango.NotImplementedException;
}, navigate: function (a) {
    throw new kango.NotImplementedException;
}, activate: function () {
    throw new kango.NotImplementedException;
}, dispatchMessage: function (a, b) {
    throw new kango.NotImplementedException;
}, close: function () {
    throw new kango.NotImplementedException;
}};
kango.Browser = function () {
    this.superclass.apply(this, arguments);
    chrome.tabs.onActivated.addListener(kango.func.bind(this._onTabChanged, this));
    chrome.tabs.onCreated.addListener(kango.func.bind(this._onTabCreated, this));
    chrome.tabs.onRemoved.addListener(kango.func.bind(this._onTabRemoved, this));
    chrome.tabs.onUpdated.addListener(kango.func.bind(this._onTabUpdated, this));
    chrome.windows.onFocusChanged.addListener(kango.func.bind(this._onWindowChanged, this));
    chrome.webNavigation.onBeforeNavigate.addListener(kango.func.bind(this._onBeforeNavigate, this));
    chrome.webNavigation.onCompleted.addListener(kango.func.bind(this._onNavigationCompleted,
        this))
};
kango.Browser.prototype = kango.oop.extend(kango.BrowserBase, {_onBeforeNavigate: function (a) {
    0 == a.frameId && 0 < a.tabId && chrome.tabs.get(a.tabId, kango.func.bind(function (b) {
        "undefined" != typeof b && (b = {url: a.url, target: new kango.BrowserTab(b)}, this.fireEvent(this.event.BEFORE_NAVIGATE, b))
    }, this))
}, _onNavigationCompleted: function (a) {
    0 == a.frameId && 0 < a.tabId && chrome.tabs.get(a.tabId, kango.func.bind(function (b) {
            "undefined" != typeof b && (b = {url: a.url, title: b.title, target: new kango.BrowserTab(b)}, this.fireEvent(this.event.DOCUMENT_COMPLETE, b))
        },
        this))
}, _onTabCreated: function (a) {
    this.fireEvent(this.event.TAB_CREATED, {tabId: a.id, target: new kango.BrowserTab(a)})
}, _onTabRemoved: function (a, b) {
    this.fireEvent(this.event.TAB_REMOVED, {tabId: a})
}, _onTabChanged: function (a) {
    0 < a.tabId && chrome.tabs.get(a.tabId, kango.func.bind(function (b) {
        "undefined" != typeof b && (b = {url: b.url, title: b.title, tabId: a.tabId, target: new kango.BrowserTab(b)}, this.fireEvent(this.event.TAB_CHANGED, b))
    }, this))
}, _currentUrlList: {
},_onTabUpdated: function (tabId, changeInfo, tab) {
    if (changeInfo.url && (!this._currentUrlList[tabId] || this._currentUrlList[tabId] != changeInfo.url)) {
        this._currentUrlList[tabId] = changeInfo.url;
        this.fireEvent(this.event.TAB_LOCATION_CHANGED, {tabId: tabId, url: changeInfo.url});
    }
}, _onWindowChanged: function (a) {
    0 < a && chrome.windows.get(a, kango.func.bind(function (b) {
        this.fireEvent(this.event.WINDOW_CHANGED,
            {target: new kango.BrowserWindow(b), windowId: a})
    }, this))
}, getName: function () {
    return"chrome"
}, cookies: {getCookies: function (a, b) {
    chrome.cookies.getAll({url: a}, function (a) {
        b(kango.array.map(a, function (a) {
            return{name: a.name, value: a.value, domain: a.domain, hostOnly: a.hostOnly, path: a.path, secure: a.secure, httpOnly: a.httpOnly, session: a.session, expires: a.expirationDate}
        }))
    })
}, getCookie: function (a, b, c) {
    chrome.cookies.get({url: a, name: b}, function (a) {
        var b = null;
        null != a && (b = {name: a.name, value: a.value, domain: a.domain,
            hostOnly: a.hostOnly, path: a.path, secure: a.secure, httpOnly: a.httpOnly, session: a.session, expires: a.expirationDate});
        c(b)
    })
}, setCookie: function (a, b) {
    var c = {url: a, name: b.name, value: b.value};
    void 0 != typeof b.expires && (c.expirationDate = b.expires);
    chrome.cookies.set(c)
}}, windows: {getAll: function (a) {
    chrome.windows.getAll({populate: !1}, function (b) {
        a(kango.array.map(b, function (a) {
            return new kango.BrowserWindow(a)
        }))
    })
}, getCurrent: function (a) {
    chrome.windows.getCurrent(function (b) {
        a(new kango.BrowserWindow(b))
    })
},
    create: function (a) {
        chrome.windows.create({url: a.url, type: a.type, width: a.width, height: a.height})
    },
    isNull: function() {
        return false;
    }}, tabs: {getAll: function (a) {
    chrome.tabs.query({windowType: "normal"}, function (b) {
        a(kango.array.map(b, function (a) {
            return new kango.BrowserTab(a)
        }))
    })
}, getCurrent: function (a) {
    chrome.tabs.query({currentWindow: !0, active: !0}, function (b) {
        a(new kango.BrowserTab(b[0]))
    })
}, create: function (a) {
    chrome.tabs.create({url: a.url, active: "undefined" != typeof a.focused ? a.focused : !0})
}}});
kango.BrowserWindow = function (a) {
    this._window = a
};
kango.BrowserWindow.prototype = kango.oop.extend(kango.IBrowserWindow, {_window: null, getId: function () {
    return this._window.id
}, getTabs: function (a) {
    chrome.tabs.query({windowId: this._window.id}, function (b) {
        a(kango.array.map(b, function (a) {
            return new kango.BrowserTab(a)
        }))
    })
}, getCurrentTab: function (a) {
    chrome.tabs.query({active: !0, windowId: this._window.id}, function (b) {
        a(new kango.BrowserTab(b[0]))
    })
}, isActive: function () {
    return this._window.focused
}});
kango.BrowserTab = function (a) {
    this._tab = a
};
kango.BrowserTab.prototype = kango.oop.extend(kango.IBrowserTab, {_tab: null, getId: function () {
    return this._tab.id
}, getUrl: function () {
    return this._tab.url
}, getTitle: function () {
    return this._tab.title
}, getDOMWindow: function () {
    return null
}, isActive: function () {
    return this._tab.active
}, isPrivate: function () {
    return this._tab.incognito
}, navigate: function (a) {
    chrome.tabs.update(this._tab.id, {url: a})
}, activate: function () {
    chrome.tabs.update(this._tab.id, {active: !0})
}, dispatchMessage: function (a, b) {
    if (0 != this.getUrl().indexOf("chrome://")) {
        var c =
        {name: a, data: b, origin: "background", target: null, source: null, tab: {id: this.getId(), isPrivate: this.isPrivate()}};
        chrome.tabs.sendMessage(this.getId(), c);
        return!0
    }
    return!1
}, close: function () {
    chrome.tabs.remove(this.getId())
}});
kango.registerModule(kango.getDefaultModuleRegistrar("browser", kango.Browser));
