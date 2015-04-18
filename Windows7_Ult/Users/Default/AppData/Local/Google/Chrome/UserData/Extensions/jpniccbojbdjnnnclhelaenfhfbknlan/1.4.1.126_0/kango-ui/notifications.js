kango.ui.Notification = function (a, b, d, c, e) {
    kango.oop.mixin(this, kango.EventTarget.prototype);
    kango.oop.mixin(this, new kango.EventTarget);
    this._manager = a;
    this._id = b;
    this._title = d;
    this._text = c;
    this._icon = e
};
kango.ui.Notification.prototype = kango.oop.extend(kango.ui.NotificationBase, {_title: null, _text: null, _icon: null, _manager: null, show: function () {
    chrome.notifications.create(this._id, {type: "basic", iconUrl: this._icon, title: this._title, message: this._text}, kango.func.bind(function () {
        this.fireEvent(this.event.SHOW)
    }, this))
}, close: function () {
    chrome.notifications.clear(this._id)
}, getTitle: function () {
    return this._title
}, getIcon: function () {
    return this._icon
}, getText: function () {
    return this._text
}});
kango.ui.Notifications = function () {
    this.superclass.apply(this, arguments);
    this._notifications = {};
    this._lastId = -1;
    "undefined" != typeof chrome.notifications && (chrome.notifications.onClosed.addListener(kango.func.bind(function (a) {
        this._fireNotificationEvent(a, kango.ui.NotificationBase.prototype.event.CLOSE)
    }, this)), chrome.notifications.onClicked.addListener(kango.func.bind(function (a) {
        this._fireNotificationEvent(a, kango.ui.NotificationBase.prototype.event.CLICK)
    }, this)))
};
kango.ui.Notifications.prototype = kango.oop.extend(kango.ui.NotificationsBase, {_notifications: null, _lastId: -1, _fireNotificationEvent: function (a, b) {
    return"undefined" != typeof this._notifications[a] ? (this._notifications[a].fireEvent(b), !0) : !1
}, _getNextId: function () {
    return(++this._lastId).toString()
}, createNotification: function (a, b, d) {
    var c = this._getNextId();
    a = new kango.ui.Notification(this, c, a, b, d);
    return this._notifications[c] = a
}});
kango.registerModule(function (a) {
    a.ui.notifications = new kango.ui.Notifications
});
