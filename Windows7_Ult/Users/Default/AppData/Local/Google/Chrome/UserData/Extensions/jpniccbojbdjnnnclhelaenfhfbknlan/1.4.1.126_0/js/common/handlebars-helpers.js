(function() {
    "use strict";

    /**
     * @todo unittest
     * @param v1
     * @param operator
     * @param v2
     * @param options
     * @param _thisContext
     * @returns {*}
     */
    function conditionalExpression(v1, operator, v2, options, _thisContext) {
        switch (operator) {
            case '==':
            case '===':
                return (v1 === v2) ? options.fn(_thisContext) : options.inverse(_thisContext);
            case '!=':
            case '!==':
                return (v1 !== v2) ? options.fn(_thisContext) : options.inverse(_thisContext);
            case '<':
                return (v1 < v2) ? options.fn(_thisContext) : options.inverse(_thisContext);
            case '<=':
                return (v1 <= v2) ? options.fn(_thisContext) : options.inverse(_thisContext);
            case '>':
                return (v1 > v2) ? options.fn(_thisContext) : options.inverse(_thisContext);
            case '>=':
                return (v1 >= v2) ? options.fn(_thisContext) : options.inverse(_thisContext);
            case '&&':
                return (v1 && v2) ? options.fn(_thisContext) : options.inverse(_thisContext);
            case '||':
                return (v1 || v2) ? options.fn(_thisContext) : options.inverse(_thisContext);
            case 'in':
                v2 = v2.split(',');
                return (v2.indexOf(v1) !== -1) ? options.fn(_thisContext) : options.inverse(_thisContext);
            default:
                throw new SyntaxError('Conditional expression: operator is wrong or undefined');
        }
    }

    Handlebars.registerHelper('ifCond', function(v1, operator, v2, options) {
        return conditionalExpression(v1, operator, v2, options, this);
    });

    /**
     * simple arithmetic
     * @todo unittest
     */
    Handlebars.registerHelper('ar', function(v1, operator, v2) {
        switch (operator) {
            case '+':
                return parseFloat(v1) + parseFloat(v2);
            case '-':
                return parseFloat(v1) - parseFloat(v2);
            case '*':
                return parseFloat(v1) * parseFloat(v2);
            case '/':
                return parseFloat(v1) / parseFloat(v2);
            case '.':
                return v1.toString() + v2.toString();
            default: return '';
        }
    });

    /**
     * @todo unittest
     */
    Handlebars.registerHelper('repeat', function(count, options) {
        var output = '';
        for (var i = 0; i < count; i++) {
            output += options.fn(this).toString();
        }
        return output;
    });

    /**
     * @todo unittest
     */
    Handlebars.registerHelper('ifAny', function() {
        var options = arguments[arguments.length - 1];
        for (var i = 0; i < arguments.length - 1; i++) {
            if (arguments[i]) {
                return options.fn(this);
            }
        }
        return options.inverse(this);
    });

    /**
     * @todo unittest
     */
    Handlebars.registerHelper('ifAll', function() {
        var options = arguments[arguments.length - 1];
        for (var i = 0; i < arguments.length - 1; i++) {
            if (!arguments[i]) {
                return options.inverse(this);
            }
        }
        return options.fn(this);
    });

    Handlebars.registerHelper('loc', function() {
        var locString = arguments[0];
        var args = Array.prototype.slice.call(arguments);
        args.splice(0, 1);
        args.splice(args.length - 1, 1);
        return new Handlebars.SafeString(DGExt.services.i18n.getMessage(locString, args, true));
    });

    // test locale values by simple condition
    Handlebars.registerHelper('locCond', function(locKey, operator, value, options) {
        var locValue = DGExt.services.i18n.getMessage(locKey);
        return conditionalExpression(locValue, operator, value, options, this);
    });

    /**
     * @todo unittest
     */
    Handlebars.registerHelper('distanceFormat', function(distance) {
        return distance.toFixed(1).toString().replace('.', ',').replace(',0', '');
    });

    Handlebars.registerHelper('addCountryCode', function(phone) {
        return DGExt.utils.addCountryCode(phone);
    });
})();


