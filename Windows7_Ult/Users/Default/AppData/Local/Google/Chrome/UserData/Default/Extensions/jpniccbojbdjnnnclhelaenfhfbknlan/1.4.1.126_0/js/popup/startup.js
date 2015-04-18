if (typeof chrome !== 'undefined' && chrome.extension) {
    // chrome code
    var html = document.getElementsByTagName('html')[0];
    var body = document.body;
    var bgPage = chrome.extension.getBackgroundPage();
    var h = bgPage.DGExt._popupHeight + 'px !important';
    var w = bgPage.DGExt._popupWidth + 'px !important';
    var style = 'width: ' + w + '; height: ' + h;
    html.setAttribute('style', style);
    body.setAttribute('style', style);
} else if (typeof safari !== 'undefined' && safari.extension) {
    // safari code
    var html = document.getElementsByTagName('html')[0];
    var body = document.body;
    var bgPage = safari.extension.globalPage.contentWindow;
    var h = bgPage.DGExt._popupHeight + 'px !important';
    var w = bgPage.DGExt._popupWidth + 'px !important';
    safari.self.height = bgPage.DGExt._popupHeight;
    safari.self.width = bgPage.DGExt._popupWidth;
    var style = 'width: ' + w + '; height: ' + h;
    html.setAttribute('style', style);
    body.setAttribute('style', style);
} else {
    // firefox code
    var hiddenDOMWindow = Components.classes["@mozilla.org/appshell/appShellService;1"].getService(
        Components.interfaces.nsIAppShellService
    ).hiddenDOMWindow;

    var backgroundIframe = hiddenDOMWindow.document.querySelector('[id^=kango-background-script-host_]');
    if (backgroundIframe) {
        var bgPage = backgroundIframe.contentWindow;
        var popupFrame = window.parent.document.querySelector('[id^=kango-ui-popup-frame_]');
        if (popupFrame) {
            console.log('Got dims: ' + bgPage.DGExt._popupHeight + '/' + bgPage.DGExt._popupWidth);
            popupFrame.style.height = bgPage.DGExt._popupHeight + 'px';
            popupFrame.style.width = bgPage.DGExt._popupWidth + 'px';
        }
    }
}