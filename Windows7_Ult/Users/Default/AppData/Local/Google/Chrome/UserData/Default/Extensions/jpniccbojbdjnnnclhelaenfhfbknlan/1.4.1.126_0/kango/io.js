kango.IO = function () {
};
kango.IO.prototype = kango.oop.extend(kango.IOBase, {getExtensionFileUrl: function (a) {
    return chrome.extension.getURL(a)
}, getResourceUrl: function (a) {
    return this.getExtensionFileUrl(a)
}});
kango.registerModule(kango.getDefaultModuleRegistrar("io", kango.IO));
