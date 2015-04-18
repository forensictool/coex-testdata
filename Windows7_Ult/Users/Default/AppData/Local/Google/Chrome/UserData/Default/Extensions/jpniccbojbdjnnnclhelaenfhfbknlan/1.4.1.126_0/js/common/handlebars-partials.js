(function() {
    "use strict";
    DGExt._loadPartial = function(name, path) {
        var promise = DGExt.$.Deferred();
        kango.xhr.send({url: path}, function(data) {
            Handlebars.registerPartial(name, data.response);
            promise.resolve();
        });
        return promise.promise();
    };

    /**
     * Receive partials source from background
     * @returns {*}
     */
    DGExt.receivePartialsSource = function() {
        var promises = [];

        for (var i in DGExt.templatePartials) {
            if (!DGExt.templatePartials.hasOwnProperty(i)) {
                continue;
            }

            promises.push(DGExt._loadPartial(i, DGExt.templatePartials[i]));
        }

        return DGExt.$.when.apply(DGExt.$, promises);
    };
})();
