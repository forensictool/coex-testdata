var RemotePopupHost = {_container: null, _frame: null, _initMessaging: function (b) {
    var a = [];
    window.addEventListener("message", function (b) {
        for (var c = JSON.parse(b.data), c = {name: c.name, data: c.data, origin: b.origin, source: {dispatchMessage: function (a, c) {
            b.source.postMessage(JSON.stringify({name: a, data: c}), "*")
        }}, target: kango}, d = 0; d < a.length; d++)a[d](c)
    }, !1);
    this.dispatchMessage = function (a, c) {
        b.postMessage(JSON.stringify({name: a, data: c}), "*")
    };
    this.addEventListener = function (b, c) {
        if ("message" == b) {
            for (var d = 0; d <
                a.length; d++)if (a[d] == c)return;
            a.push(c)
        }
    };
    (new kango.InvokeAsyncModule).init(this);
    (new kango.MessageTargetModule).init(this);
    this.addMessageListener("ClosePopup", function () {
        KangoAPI.closeWindow()
    })
}, _createFrame: function (b) {
    var a = document.createElement("iframe");
    a.width = "100%";
    a.height = "100%";
    a.src = b;
    this._frame = a;
    this._initMessaging(a);
    this._container.appendChild(a)
}, init: function () {
    this._container = document.getElementById("container");
    var b = kango.ui.browserButton.getPopupDetails();
    "number" == typeof b.width &&
    (this._container.style.width = b.width + "px");
    "number" == typeof b.height && (this._container.style.height = b.height + "px");
    var a = this;
    window.setTimeout(function () {
        a._createFrame(b.url)
    }, 50)
}, getContext: function () {
    return kango.getContext()
}, "function": {invoke: function (b, a, e) {
    a = a.split(".");
    for (var c = a.pop(), d = 0; d < a.length; d++)b = b[a[d]];
    return b[c].apply(b, e)
}}};
KangoAPI.onReady(function () {
    RemotePopupHost.init()
});
