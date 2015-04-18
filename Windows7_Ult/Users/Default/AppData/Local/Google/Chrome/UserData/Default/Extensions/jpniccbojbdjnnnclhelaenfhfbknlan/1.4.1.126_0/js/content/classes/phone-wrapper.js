var DGExt = DGExt || {};

(function() {
    "use strict";

    /**
     * DOM traversing and node wrapping class for found phones
     *
     * @constructor
     */
    DGExt.PhoneWrapper = function() {
        var self = this;
        var excludeNode = [
            "acronym", "applet", "area", "audio",
            "button",
            "canvas", "code", "col", "colgroup", "command",
            "datalist", "del", "dir",
            "embed",
            "frame", "frameset",
            'gisphone',
            "iframe", "img", "input",
            "kbd", "keygen",
            "label", "link",
            "map", "menu", "meta", "meter",
            "nav", "noframes", "noscript",
            "object", "optgroup", "option", "output",
            "param", "progress",
            "s", "samp", "script", "select", "source", "strike", "style", "textarea", "time",
            "track",
            "var", "video"
        ];
        this._parser = new DGExt.PhoneParser();
        this.resultPhones = {};
        this._foundSequences = [];
        this._uniqueCounter = 1;

        /**
         * Try to detect one or many phones in given sequences
         *
         * @param node
         * @param sequences
         * @param [short]
         */
        function detectPhone(node, sequences, short) {
            var results = [];
            var parentNode = node.parentNode;
            if (node.nodeType === 3 && parentNode) {
                for (var i in sequences) {
                    var result = self._parser.findPhone(sequences[i], !!short); // outputs single phone or null
                    if (result) {
                        var id = DGExt.utils.md5(result.clean + self._uniqueCounter++);
                        self.resultPhones[id] = {
                            dirty: result.dirty,
                            short: !!result.short
                        };
                        result.id = id;
                        results.push(result);
                    }
                }

                if (results.length > 0) {
                    wrapPhones(node, parentNode, results);
                }
            }
        }

        /**
         * Find sequences to check for phones
         *
         * @param _node
         */
        function findSequences(_node) {
            var _sequences = self._parser.findSequences(' ' + _node.nodeValue + ' ');
            if (_sequences) {
                self._foundSequences.push({
                    node: _node,
                    sequences: _sequences.full,
                    shortSequences: _sequences.short
                });
            }
        }

        /**
         * Replace text occurences of phone with custom <gisphone> tag
         *
         * @param textNode
         * @param textNodeParent
         * @param phones
         */
        function wrapPhones(textNode, textNodeParent, phones) {
            if (textNode.parentNode.nodeName === 'PRE') {
                return;
            }
            var textContent = [textNode];

            /**
             * @todo unittest
             * @param context
             * @param phone
             * @returns {*}
             */
            function split(context, phone) {
                for (var i = 0; i < context.length; i++) {
                    if (context[i].nodeType === 3 && context[i].nodeValue.indexOf(phone.dirty) !== -1) {
                        var phoneElement = document.createElement('gisphone');
                        phoneElement.className = '_gis-phone-highlight-wrap js_gis-phone-highlight-wrap-' + phone.id;
                        phoneElement.setAttribute('data-ph-parsed', 'true');
                        phoneElement.appendChild(document.createTextNode(phone.dirty));
                        var text = context[i].nodeValue.split(phone.dirty);
                        var beforePhone = text[0];
                        text.splice(0, 1);
                        var afterPhone = text.join(phone.dirty);
                        context.splice(i, 1, document.createTextNode(beforePhone), phoneElement, document.createTextNode(afterPhone));
                        i--;
                    }
                }

                return context;
            }

            for (var i = 0; i < phones.length; i++) {
                textContent = split(textContent, phones[i]);
            }

            for (var j = 0; j < textContent.length; j++) {
                textNodeParent.insertBefore(textContent[j], textNode);
            }

            if (textContent.length > 1) {
                textNodeParent.removeChild(textNode);
            }
        }

        /**
         * Simple iterative DOM tree traversal
         *
         * @param elem
         */
        function treeTraverse(elem) {
            var queue = [];
            var i, currentNode, children, disable;

            if (!elem || (elem.nodeType === 1 && DGExt.utils.getAttr(elem, 'data-ph-parsed'))) {
                return;
            }

            queue.push(elem);
            while (queue.length > 0) {
                currentNode = queue.pop();

                if (!currentNode) {
                    continue;
                }

                if (currentNode.nodeType === 1) {
                    DGExt.utils.setAttr(currentNode, 'data-ph-parsed', true);
                }

                disable = currentNode.attributes ? currentNode.attributes.getNamedItem('disablep2d') : null;
                if (disable) {
                    continue;
                }

                if (DGExt.$.inArray(currentNode.localName, excludeNode) !== -1) {
                    continue;
                }

                findSequences(currentNode);

                children = currentNode.childNodes.length;
                for (i = 0; i < children; i++) {
                    if (currentNode.childNodes[i].nodeType === 1 && DGExt.utils.getAttr(currentNode, 'data-ph-parsed')) {
                        continue;
                    }
                    queue.push(currentNode.childNodes[i]);
                }
            }
        }

        /**
         * Check if we parse our popup block
         * @param textNode
         * @returns {Function|Node|*|boolean}
         */
        function isPopupPhone(textNode) {
            return textNode.parentNode &&
                textNode.parentNode.parentNode &&
                textNode.parentNode.parentNode.className &&
                typeof textNode.parentNode.parentNode.className === 'string' && /* For embedded svg insanity */
                textNode.parentNode.parentNode.className.indexOf('js_gis-p2d-link') !== -1;
        }

        /**
         * Check if current node needs parsing
         * After parsing we place data-ph-parsed attribute into every parent node to prevent parsing its contents again
         *
         * @param node
         * @returns {boolean}
         */
        this.nodeNeedsParsing = function(node) {
            var nodeIsExcluded = node.parentNode && (DGExt.$.inArray(node.parentNode.localName, excludeNode) !== -1);
            var nodeIsEmpty = (node.nodeValue.replace(/\D+/g, '').length === 0);
            return !nodeIsEmpty && !nodeIsExcluded && !isPopupPhone(node);
        };

        /**
         * Entry point
         *
         * @param rootNode
         * @returns {{}|*|DGExt.PhoneWrapper.resultPhones}
         */
        this.makePhoneLinks = function(rootNode) {

            //
            //_workerCode: function(e) {
            //
            //},
            //
            //initWorker: function() {
            //    var blob = new Blob(["onmessage = " + this._workerCode.toString()]).getBlob();
            //    var worker = new Worker(window.URL.createObjectURL(blob));
            //},

            this.resultPhones = {};
            this._foundSequences = [];
            treeTraverse(rootNode);

            if (self._foundSequences.length > 0) {
                for (var i in self._foundSequences) {
                    detectPhone(self._foundSequences[i].node, self._foundSequences[i].sequences);
                    detectPhone(self._foundSequences[i].node, self._foundSequences[i].shortSequences, true);
                }
            }

            return this.resultPhones;
        };
    };
})();