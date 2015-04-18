var DGExt = DGExt || {};

/**
 * Throttling queue
 * Executes functions with desired interval between executions
 */
(function() {
    "use strict";

    DGExt.TimeoutQueue = function() {};
    DGExt.TimeoutQueue.prototype.running = false;
    DGExt.TimeoutQueue.prototype.queue = [];
    DGExt.TimeoutQueue.prototype.timeout = 300;

    DGExt.TimeoutQueue.prototype.add = function(callback) {
        var self = this;
        DGExt.utils.log('added func');
        this.queue.push(function() {
            DGExt.utils.log('started func');
            var finished = callback();
            if (typeof finished === "undefined" || finished) {
                self.next();
            }
        });

        if (!this.running) {
            DGExt.utils.log('not running: next');
            this.next();
        }

        return this;
    };

    DGExt.TimeoutQueue.prototype.next = function(){
        this.running = false;
        var shift = this.queue.shift();
        if (shift) {
            DGExt.utils.log('queueing func');
            this.running = true;
            setTimeout(shift, this.timeout);
        }
    };
})();