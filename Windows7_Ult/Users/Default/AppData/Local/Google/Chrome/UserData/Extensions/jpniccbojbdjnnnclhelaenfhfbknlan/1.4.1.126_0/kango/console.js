kango.Console = function () {
};
kango.Console.prototype = kango.oop.extend(kango.IConsole, {log: function (a) {
    1 < arguments.length && (a = kango.string.format.apply(kango.string, arguments));
    console.log(a)
}, reportError: function (a, b) {
    console.warn("Error in script " + b + ": " + a.message + "\n" + a.stack || "")
}});
kango.console = new kango.Console;
