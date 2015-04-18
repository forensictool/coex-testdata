var DGExt = DGExt || {};

(function() {
    "use strict";

    /**
     * Phones detector
     * @constructor
     */
    DGExt.PhoneParser = function() {

    };

    /*
     Special characters in regexps:

     \u00AD - soft hyphen
     \u2011 - non-breaking hyphen
     \u00A0 - &nbsp;
     \u200B - zero-width space
     */

    DGExt.PhoneParser.prototype = {
        _sequenceRegex: /[\s\u00A0\u200B]*[\-–\d\u00AD\u2011\+\.\s\u00A0\u200B\(\):]{5,}[\s\u00A0\u200B\.,;:!]*/g,
        _trimSeparators: /^[\-–\u00AD\u2011\.\s\u00A0\u200B\),;:]+|[\-–\u00AD\u2011\.\s\u00A0\u200B\(\),:;]+$/g,
        _decision: '',
        _maxDigitsCount: 15,
        _minDigitsCount: 8,
        _minShortDigitsCount: 5,

        /**
         * Find digit sequences that look like a phone or a set of phones
         *
         * @param str
         * @returns {*|Array|{index: number, input: string}}
         */
        findSequences: function(str) {
            var matches;
            var shortMatches = [];
            var currentMatch, slices, j, leftContext, rightContext;

            if (str.length >= this._minShortDigitsCount) {
                matches = str.match(this._sequenceRegex);
            }
            if (matches) {
                for (var i = 0; i < matches.length; i++) {
                    matches[i] = matches[i].toString().replace(this._trimSeparators, '');
                    var matchOnlyDigits = matches[i].replace(/\D+/g, '');

                    if (matches[i][0] === '(' && matches[i].indexOf(')') === -1) { // first brace without closing brace - remove it
                        matches[i] = matches[i].replace(/^\(/, '');
                    }

                    if (!matches[i] || matchOnlyDigits.length < this._minShortDigitsCount) {
                        matches.splice(i, 1);
                        i--;
                    } else if (matchOnlyDigits.length >= this._minShortDigitsCount && matchOnlyDigits.length < this._minDigitsCount) {
                        leftContext = str[str.indexOf(matches[i]) - 1]; // first letter before match
                        rightContext = str[str.indexOf(matches[i]) + matches[i].length]; // first letter before match
                        var validLeftContext = (!leftContext || !!leftContext.match(/[\s\u00A0\u200B;:,\('"`\.]/));
                        var validRightContext = (!rightContext || !!rightContext.match(/[\s\u00A0\u200B;:,\)'"`\.*!?]/));
                        var shortMatch = matches.splice(i, 1);
                        if (validLeftContext && validRightContext) {
                            shortMatches.push(shortMatch);
                        }
                        i--;
                    } else if (matches[i].match(/[\-–\u00AD\u2011\.\s\u00A0]{2,}/)) { // attention: this regex must be more strict that (2), otherwise endless loop may occur!
                        // split string by more than one separator, if there are any
                        currentMatch = matches.splice(i, 1)[0].toString();
                        i--;
                        slices = currentMatch.split(/[\-–\u00AD\u2011\.\s\u00A0\u200B;,]{2,}/); // (2)
                        for (j = 0; j < slices.length; j++) {
                            if (slices[j].toString().length >= this._minDigitsCount) {
                                matches.push(slices[j].toString());
                            }
                        }
                    } else if (matchOnlyDigits.length > this._maxDigitsCount) {
                        currentMatch = matches.splice(i, 1)[0].toString();
                        i--;
                        slices = currentMatch.split(/[\s\u00A0\u200B;,]+/);
                        for (j = 0; j < slices.length; j++) {
                            if (slices[j].toString().length >= this._minDigitsCount &&
                                slices[j].toString().length <= this._maxDigitsCount) {
                                matches.push(slices[j].toString());
                            }
                        }
                    } else {
                        leftContext = str[str.indexOf(matches[i]) - 1]; // first letter before match
                        rightContext = str[str.indexOf(matches[i]) + matches[i].length]; // first letter after match
                        var leftContextForbidden = leftContext && leftContext.match(/[^\s\u00A0\u200B;:,\(]/); // do not allow letters before match
                        var rightContextForbidden = rightContext && rightContext.match(/[^\s\u00A0\u200B\s"”'`\.,;)\*!\?]/);
                        var regex, subMatch;

                        if (leftContextForbidden) {
                            // if left context is not allowed, try to get a submatch with good left context
                            var firstPiece = matches[i].toString().split(/[\s\u00A0\u200B;:,]+/)[0];
                            try {
                                if (firstPiece && firstPiece !== matches[i]) {
                                    regex = new RegExp('^' + firstPiece.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") + '[\\s\\u00A0\\u200B;\\:,\\(]+', 'ig');
                                    subMatch = matches[i].toString().replace(regex, '');
                                    matches.splice(i, 1, subMatch);
                                } else {
                                    matches.splice(i, 1);
                                }
                                i--;
                            } catch (ex) { /* bad regex, do nothing */ }
                        } else if (rightContextForbidden) {
                            // if right context is not allowed, try to get a submatch with good right context
                            var lastPiece = matches[i].toString().split(/[\s\u00A0\u200B;:,]+/).pop();
                            try {
                                if (lastPiece && lastPiece !== matches[i]) {
                                    regex = new RegExp('[\\s\\u00A0\\u200B;\\:,\\(]+' + lastPiece.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") + '$', 'ig');
                                    subMatch = matches[i].toString().replace(regex, '');
                                    matches.splice(i, 1, subMatch);
                                } else {
                                    matches.splice(i, 1);
                                }
                                i--;
                            } catch (ex) { /* bad regex, do nothing */ }
                        }
                    }
                }

                matches = {
                    full: matches,
                    short: shortMatches
                };
            } else {
                matches = {
                    full: '',
                    short: ''
                };
            }

            return matches;
        },

        findPhone: function(str, short) {
            if (short) {
                return this._parseShort(str);
            }

            return this._parse(str);
        },

        /**
         * Set of exceptional regexps, being applied to source sequence
         */
        _exceptions: {
            negative: [
                // wtf
                function(str) {
                    return str.substr(0, 2) === '+0';
                }, function(str) {
                    return str.substr(0, 3) === '000';
                },
                // dates
                function(str) {
                    return !!str.match(/(((19|20)([2468][048]|[13579][26]|0[48])|2000)[/-]02[/-]29|((19|20)[0-9]{2}[/-](0[4678]|1[02])[/-](0[1-9]|[12][0-9]|30)|(19|20)[0-9]{2}[/-](0[1359]|11)[/-](0[1-9]|[12][0-9]|3[01])|(19|20)[0-9]{2}[/-]02[/-](0[1-9]|1[0-9]|2[0-8])))/);
                }, function(str) {
                    return !!str.match(/(?:(?:(?:0?[13578]|1[02])(\/|-|\.)31)\1|(?:(?:0?[1,3-9]|1[0-2])(\/|-|\.)(?:29|30)\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:0?2(\/|-|\.)29\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:(?:0?[1-9])|(?:1[0-2]))(\/|-|\.)(?:0?[1-9]|1\d|2[0-8])\4(?:(?:1[6-9]|[2-9]\d)?\d{2})/);
                },
                // dd mm yyyy
                function(str) {
                    return !!str.match(/(0[1-9]|1[0-2])\s(0[1-9]|1[0-2])\s[12]\d{3}/);
                },
                // IP (+ port)
                function(str) {
                    return !!str.match(/^[\s\u00A0\u200B\.,;:!\(\)]*\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(\:\d+)?[\s\u00A0\u200B\.,;:!\(\)]*$/);
                },
                // ICQ
                function(str) {
                    return !!str.match(/^[\s\u00A0\u200B\.,;:!]*\d{1,3}[\-–\u00AD\u2011]\d{3}[\-–\u00AD\u2011]\d{3}[\s\u00A0\u200B\.,;:!]*$/);
                },
                // dates range
                function(str) {
                    return !!str.match(/^[12]\d{3}[\s\u00A0\u200B]*[\-–\u00AD\u2011]+[\s\u00A0\u200B]*[12]\d{3}$/);
                }, function(str) {
                    return !!str.match(/^[12]\d{3}[\s\u00A0\u200B]*[\-–\u00AD\u2011]+[\s\u00A0\u200B]*[12]\d{3}[^\-–\d\u00AD\u2011\.]+/);
                }, function(str) {
                    return !!str.match(/[^\-–\d\u00AD\u2011\.]+[12]\d{3}[\s\u00A0\u200B]*[\-–\u00AD\u2011]+[\s\u00A0\u200B]*[12]\d{3}$/);
                },
                // date + time
                function(str) {
                    return !!str.match(/\d{2}[\-–\u00AD\u2011\.]\d{2}[\-–\u00AD\u2011\.]\d{4}[\s\u00A0\u200B\.]+\d{2}[:\.]\d{2}([:\.]\d{2})?/);
                }, function(str) {
                    return !!str.match(/\d{4}[\-–\u00AD\u2011\.]\d{2}[\-–\u00AD\u2011\.]\d{2}[\s\u00A0\u200B\.]+\d{2}[:\.]\d{2}([:\.]\d{2})?/);
                }, function(str) {
                    return !!str.match(/\d{2}[\-–\u00AD\u2011\.]\d{2}[\-–\u00AD\u2011\.]\d{2}[\s\u00A0\u200B\.]+\d{2}[:\.]\d{2}([:\.]\d{2})?/);
                }, function(str) {
                    return !!str.match(/\d{2}[:\.]\d{2}([:\.]\d{2})?[\s\u00A0\u200B\.]+\d{2}[\-–\u00AD\u2011\.]\d{2}[\-–\u00AD\u2011\.]\d{4}/);
                }, function(str) {
                    return !!str.match(/\d{2}[:\.]\d{2}([:\.]\d{2})?[\s\u00A0\u200B\.]+\d{4}[\-–\u00AD\u2011\.]\d{2}[\-–\u00AD\u2011\.]\d{2}/);
                }, function(str) {
                    return !!str.match(/\d{2}[:\.]\d{2}([:\.]\d{2})?[\s\u00A0\u200B\.]+\d{2}[\-–\u00AD\u2011\.]\d{2}[\-–\u00AD\u2011\.]\d{2}/);
                },
                // time range
                function(str) {
                    return !!str.match(/[012]?\d:\d{2}[\-–\u00AD\u2011][012]?\d:\d{2}/);
                },

                // other bad formats

                // xxxxx-xxxxx, xxxx-xxxx
                function(str) {
                    return !!str.match(/^\d{4,5}[\-\u00AD\u2011\.]\d{4,5}$/);
                },
                // + inside of number
                function(str) {
                    return str.replace(/[\)\(]+/, '').indexOf('+') !== -1 && str.replace(/[\)\(]+/, '').indexOf('+') !== 0;
                },
                // too many braces
                function(str) {
                    return str.replace(/[^\(\)]+/g, '').length > 6;
                },
                // 5 digits + 5 digits, and first is not 0
                function(str) {
                    return !!str.match(/^[1-9]\d{4}[\-–\u00AD\u2011\.\s\u00A0\u200B]\d{5}/);
                },
                // too many zeroes in number
                function(str) {
                    return str.replace(/[^0]+/g, '').length > 0.5 * str.replace(/\D+/g, '').length;
                }
            ],
            // positive exceptions have higher priority
            positive: [
                // american number
                function(str) {
                    return !!str.match(/\+?1[\-–\u00AD\u2011\.\s\u00A0\u200B]\d{3}[\-–\u00AD\u2011\.\s\u00A0\u200B]\d{3}[\-–\u00AD\u2011\.\s\u00A0\u200B]\d{4}/);
                },
                // exception for number, matching date pattern
                function(str) {
                    return !!str.match(/\+7[\-–\u00AD\u2011\.\s\u00A0\u200B]\d{4}[\-–\u00AD\u2011\.\s\u00A0\u200B]\d{2}[\-–\u00AD\u2011\.\s\u00A0\u200B]\d{2}[\-–\u00AD\u2011\.\s\u00A0\u200B]\d{2}/);
                },
                // brasilian number
                function(str) {
                    return !!str.match(/\(\d{2}\)[\-–\u00AD\u2011\.\s\u00A0\u200B]\d{4}[\-–\u00AD\u2011\.\s\u00A0\u200B]\d{4}/);
                },
                // french number
                function(str) {
                    return !!str.match(/\d{2}\.\d{2}\.\d{2}\.\d{2}\.\d{2}/);
                }
            ]
        },

        /**
         * Check for equal separator symbols
         *
         * @param str
         * @returns {boolean}
         * @private
         */
        _checkSeparators: function(str) {
            var separators = str.replace(/[\u00A0\u200B]/g, ' ') // different spaces into space
                .replace(/[–\u00AD\u2011]/g, '-') // different hyphens into hyphen
                .replace(/[^\-\.\s:]+/g, ''); // and now let's see what we got
            var unique = {};
            for (var i = 0; i < separators.length; i++) {
                if (separators[i]) {
                    unique[separators[i]] = unique[separators[i]] || 0;
                    unique[separators[i]]++;
                }
            }

            function size(obj) {
                var _size = 0;
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        _size++;
                    }
                }
                return _size;
            }

            // having colon in number means this is not a number
            if (unique[':'] !== undefined) {
                return false;
            }

            // single separator is ok
            if (size(unique) === 1) {
                if (unique['-'] === 1 && str.indexOf('(') === -1) { // but single hyphen without braces is not ok
                    return false;
                }
                return true;
            }
            // we allow space and a single type of separator
            if (size(unique) === 2) {
                if (unique[' '] !== undefined && unique['.'] === 1 && (str.indexOf('.') === (str.length - 3))) {
                    // except of single dot, that separates last 2 symbols - looks like cost.
                    return false;
                }

                return (unique[' '] !== undefined);
            }
            // we allow absence of separators if number starts with + or ( and contains no other symbols except digits and braces
            if ((str[0] === '+' || str[0] === '(') && str.replace(/[^\+0-9\(\)]+/, '') === str) {
                return true;
            }

            return false;
        },

        /**
         * Check if digits set is not a float number or a set of float numbers
         *
         * @param str
         * @returns {boolean}
         * @private
         */
        _isFloat: function(str) {
            var s = str.split(/[\u00A0\u200B\s,:;]+/);
            var floatCount = 0;
            var totalCount = 0;

            for (var i in s) {
                totalCount++;
                if (s[i].indexOf('.') !== -1) {
                    var stringFloat = parseFloat(s[i]).toString();
                    var preparedString = s[i].replace(/^0+|0+$/g, '') // remove starting and trailing zeroes
                        .replace(/\.$/, '') // remove trailing dot
                        .replace(/^\./, '0.'); // replace starting dot with 0.;
                    if (stringFloat === preparedString) {
                        floatCount++;
                    } else if (stringFloat === '0') { // custom case for 0.0000...
                        floatCount++;
                    }
                }
            }

            return floatCount === totalCount;
        },

        /**
         * Check if sequence is:
         * - a big number (grouped by 3 digits)
         * - a credit card number (grouped by 4 digits)
         * - any other grouped digits
         *
         * @param str
         * @returns {boolean}
         * @private
         */
        _isGroupedDigits: function(str) {
            var parts = str.split(/[\s\u00A0\u200B\(\)\.]+/);
            var allPartsEqual = true;
            var len;

            if (parts.length === 1) {
                return false;
            }

            if (parts[0][0] === '+') {
                return false;
            }

            len = parts[1].length;

            if (parts[0].length > len) {
                return false;
            }

            for (var i = 1; i < parts.length - 1; i++) { // check if all parts except first contain 3 digits
                if (parts[i].length !== len) {
                    allPartsEqual = false;
                    break;
                }
            }

            if (allPartsEqual) {
                switch (parts.length) {
                    case 2:
                        return false;
                    case 3:
                        return len === parts[0].length && len === parts[2].length;
                }
            }

            return allPartsEqual && parts[parts.length - 1] <= len;
        },

        /**
         * Base format mask check
         *
         * @param str
         * @returns {boolean}
         * @private
         */
        _checkByMask: function(str) {
            return !!str.match(/\d{3}[\-–\u00AD\u2011\.\s\u00A0\u200B]\d{3}[\-–\u00AD\u2011\.\s\u00A0\u200B]?\d{2}[\-–\u00AD\u2011\.\s\u00A0\u200B]?\d{2}/) ||
                !!str.match(/\d{4}[\-–\u00AD\u2011\.\s\u00A0\u200B]\d{2}[\-–\u00AD\u2011\.\s\u00A0\u200B]?\d{2}[\-–\u00AD\u2011\.\s\u00A0\u200B]?\d{2}/) ||
                !!str.match(/\d{5}[\-–\u00AD\u2011\.\s\u00A0\u200B]\d{1}[\-–\u00AD\u2011\.\s\u00A0\u200B]?\d{2}[\-–\u00AD\u2011\.\s\u00A0\u200B]?\d{2}/) ||
                !!str.match(/\d{6}[\-–\u00AD\u2011\.\s\u00A0\u200B]\d{2}[\-–\u00AD\u2011\.\s\u00A0\u200B]?\d{2}/);
        },

        /**
         * Check basic format for phones with exception of some starting characters
         *
         * @param str
         * @returns {boolean}
         * @private
         */
        _checkBasicFormat: function(str) {
            switch (str[0]) {
                case '0':
                case '8':
                    return true;
                case '(':
                    return !!str[1].match(/[\d\+]/);
                case '+':
                    return !!str[1].match(/\d/);
            }

            return this._checkByMask(str);
        },

        /**
         * Check valid braces placement
         *
         * @param str
         * @returns {boolean}
         * @private
         */
        _checkValidParentheses: function(str) {
            var counter = 0;
            for (var i = 0; i < str.length; i++) {
                if (str[i] === ')') {
                    counter--;
                }

                if (str[i] === '(') {
                    counter++;
                }

                if (counter < 0) {
                    return false;
                }
            }

            return counter === 0;
        },

        /**
         * Parse sequence
         *
         * @param str
         * @returns {*}
         * @private
         */
        _parse: function(str) {
            if (!str) {
                this._decision = 'FAIL: empty sequence';
                return null;
            }

            for (var i = 0; i < this._exceptions.positive.length; i++) {
                if (this._exceptions.positive[i](str.toString())) {
                    this._decision = 'OK: matches positive exception';
                    return {clean: str.replace(/\D+/g, ''), dirty: str};
                }
            }

            for (var j = 0; j < this._exceptions.negative.length; j++) {
                if (this._exceptions.negative[j](str.toString())) {
                    this._decision = 'FAIL: matches negative exception #' + j;
                    return null;
                }
            }

            if (!this._checkBasicFormat(str.toString())) {
                this._decision = 'FAIL: failed basic format check';
                return null;
            }

            if (!this._checkSeparators(str.toString())) {
                this._decision = 'FAIL: failed separators check';
                return null;
            }

            if (this._isFloat(str.toString())) {
                this._decision = 'FAIL: failed float check';
                return null;
            }

            if (this._isGroupedDigits(str.toString())) {
                this._decision = 'FAIL: failed grouped digits check';
                return null;
            }

            if (!this._checkValidParentheses(str.toString())) {
                this._decision = 'FAIL: failed parentheses check';
                return null;
            }

            this._decision = 'OK: nothing wrong';
            return {clean: str.toString().replace(/\D+/g, ''), dirty: str.toString()};
        },

        /**
         * Simplified parser for short numbers
         *
         * @param str
         * @returns {*}
         * @private
         */
        _parseShort: function(str) {
            if (!str) {
                this._decision = 'FAIL: empty sequence';
                return null;
            }

            str = str.toString().replace(/^\D+/, '').replace(/\D+$/, '');

            var pieces = str.split(/[\-–\u00AD\u2011]/);
            if (pieces.length === 2 && pieces[0][pieces[0].length-1] === '0' && pieces[1][pieces[1].length-1] === '0') {
                this._decision = 'FAIL: looks like number range';
                return null;
            }

            var masks = [
                /^\d{3}[\-–\u00AD\u2011]\d{2}[\-–\u00AD\u2011]\d{2}$/,
                /^\d{3}[\-–\u00AD\u2011]\d{4}$/,
                /^\d{3}[\-–\u00AD\u2011]\d{3}$/,
                /^\d{2}[\-–\u00AD\u2011]\d{2}[\-–\u00AD\u2011]\d{2}$/,
                /^\d{1}[\-–\u00AD\u2011]\d{2}[\-–\u00AD\u2011]\d{2}$/,
                /^\d{2}[\-–\u00AD\u2011]\d{1}[\-–\u00AD\u2011]\d{2}$/,
                /^\d{2}[\-–\u00AD\u2011]\d{3}$/
            ];

            for (var i = 0; i < masks.length; i++) {
                if (str.toString().match(masks[i])) {
                    this._decision = 'OK: short number matched mask';
                    return {clean: str.toString().replace(/\D+/g, ''), dirty: str.toString(), short: true};
                }
            }

            this._decision = 'FAIL: short number didnt match mask';
            return null;
        }
    };
})();

// export for nodejs test
if (typeof module !== 'undefined' && module.exports) {
    exports.PhoneParser = DGExt.PhoneParser;
}