/*jslint node: true */
/*global
    window,
    module
*/

(function () {
    'use strict';

    var ArrayUtils = (function () {
        function ArrayUtils() { }
        
        /**
         * @see {@link https://stackoverflow.com/questions/7378228/check-if-an-element-is-present-in-an-array|Stack Overflow}
         */
        ArrayUtils.isInArray = function (value, array) {
            return array.indexOf(value) > -1;
        };
        
        ArrayUtils.sortByKey = function (array, key, asc) {
            
            /**
             * @see {@link https://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key|Stack Overflow}
             */
            Object.byString = function (o, s) {
                s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
                s = s.replace(/^\./, '');           // strip a leading dot
                var a = s.split('.'),
                    i,
                    n,
                    k;
                for (i = 0, n = a.length; i < n; i += 1) {
                    k = a[i];
                    if (o.hasOwnProperty(k)) {
                        o = o[k];
                    } else {
                        return;
                    }
                }
                return o;
            };
            
            return array.sort(function (a, b) {
                var x = Object.byString(a, key),
                    y = Object.byString(b, key);
                if (asc) {
                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                } else {
                    return ((y < x) ? -1 : ((y > x) ? 1 : 0));
                }
            });
        };
        
        ArrayUtils.isArray = function (a) {
            return (!!a) && (a.constructor === Array);
        };
        
        return ArrayUtils;
    }());

    if (typeof window === 'undefined') {
        module.exports = ArrayUtils;
    } else {
        window.ArrayUtils = ArrayUtils;
    }

}());
/*jslint node: true */
/*global
    window,
    chrome,
    module
*/

(function () {
    'use strict';

    var ChromiumUtils = (function () {
        function ChromiumUtils() { }
        
        ChromiumUtils.sendMessageToExtension = function (payload, responseCallback) {

            /**
             * @see {@link https://developer.chrome.com/extensions/messaging#simple|Sending a request from a content script}
             */
            chrome.runtime.sendMessage(payload, responseCallback);

        };
        
        ChromiumUtils.sendMessageToActiveTabInCurrentWindow = function (payload, responseCallback) {

            /**
             * @see {@link https://developer.chrome.com/extensions/tabs#method-query|query}
             */
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {

                /**
                 * @see {@link https://developer.chrome.com/extensions/messaging#simple|Message Passing}
                 * @see {@link https://developer.chrome.com/extensions/tabs#method-sendMessage|sendMessage}
                 */
                chrome.tabs.sendMessage(tabs[0].id, payload, responseCallback);

            });

        };

        ChromiumUtils.createContextMenuItemThatSendsMessageToActiveTabInCurrentWindow = function (id, title, contexts, isVisible, payload, responseCallback) {
            chrome.contextMenus.create({
                id: id,
                title: title,
                contexts: contexts,
                visible: isVisible,
                onclick: function () {
                    ChromiumUtils.sendMessageToActiveTabInCurrentWindow(payload, responseCallback);
                }
            });
        };

        ChromiumUtils.openNewPage = function (url) {
            chrome.tabs.create({ url: url });
        };
        
        ChromiumUtils.createContextMenuItemThatOpensNewPage = function (id, title, contexts, isVisible, url, documentUrlPatterns) {
            chrome.contextMenus.create({
                id: id,
                title: title,
                contexts: contexts,
                visible: isVisible,
                onclick: function () {
                    chrome.tabs.create({ url: url });
                },
                documentUrlPatterns: documentUrlPatterns
            });
        };
        
        /**
         * @see {@link https://developer.chrome.com/extensions/messaging#simple|Simple one-time requests}
         */
        ChromiumUtils.handleMessage = function (handler) {
            chrome.runtime.onMessage.addListener(function (request) {
                handler(request);
            });
        };
        
        /**
         * @see {@link https://stackoverflow.com/questions/16571393/the-best-way-to-check-if-tab-with-exact-id-exists-in-chrome|Stack Overflow}
         */
        ChromiumUtils.checkIfTabWithIDExists = function (tabId, onExists, onNotExists) {
            function callback() {
                if (chrome.runtime.lastError) {
                    if (onNotExists) {
                        onNotExists(chrome.runtime.lastError.message);
                    }
                } else {
                    // Tab exists
                    if (onExists) {
                        onExists();
                    }
                }
            }
            chrome.tabs.get(tabId, callback);
        };
        
        return ChromiumUtils;
    }());

    if (typeof window === 'undefined') {
        module.exports = ChromiumUtils;
    } else {
        window.ChromiumUtils = ChromiumUtils;
    }

}());
/*jslint node: true */
/*global
    window,
    module
*/

(function () {
    'use strict';

    var ClipboardUtils = (function () {
        function ClipboardUtils() { }
        
        /**
         * @see {@link https://stackoverflow.com/questions/3436102/copy-to-clipboard-in-chrome-extension|Stack Overflow}
         */
        ClipboardUtils.copyText = function (text) {
            var successful = false,
                textarea,
                body,
                newWindow;
            
            if (typeof window !== 'undefined') {
                textarea = window.document.createElement("textarea");
                body = window.document.getElementsByTagName('body')[0];
                textarea.textContent = text;
                
                body.appendChild(textarea);
                //window.document.body.insertBefore(textarea, window.document.body.firstChild);
                
                textarea.select();
                successful = window.document.execCommand('copy');
                
                if (successful) {
                    body.removeChild(textarea);
                
                } else {
                    newWindow = window.open('about:blank');
                    newWindow.document.title = "Press CTRL-C to copy the highlighted text/data.";
                    newWindow.document.body.appendChild(textarea);
                    
                    textarea.style.width = "100%";
                    textarea.style.height = "100%";
                    textarea.select();
                    
                    textarea.onkeydown = function (event) {
                        var cKey = 67;
                        if (event.ctrlKey && event.keyCode === cKey) {
                            window.setTimeout(function () {
                                newWindow.close();
                            }, 256);
                            return true;
                        }
                    };
                    
                }
                
            }
            
            return successful;
        };
        
        return ClipboardUtils;
    }());

    if (typeof window === 'undefined') {
        module.exports = ClipboardUtils;
    } else {
        window.ClipboardUtils = ClipboardUtils;
    }

}());/*jslint node: true */
/*global
    window,
    module
*/

(function () {
    'use strict';

    var DateUtils = (function () {
        function DateUtils() { }
        
        /**
         * @see {@link https://stackoverflow.com/questions/2013255/how-to-get-year-month-day-from-a-date-object|Stack Overflow}
         */
        DateUtils.formatDateToYYYYMMDD = function (date, separator) {
            separator = typeof separator !== 'undefined' ? separator : '/';
            return date.getFullYear()
                + separator
                + (((date.getMonth() + 1) < 10) ? '0' : '') + (date.getMonth() + 1)
                + separator
                + ((date.getDate() < 10) ? '0' : '') + date.getDate();
        };
        
        return DateUtils;
    }());

    if (typeof window === 'undefined') {
        module.exports = DateUtils;
    } else {
        window.DateUtils = DateUtils;
    }

}());
/*jslint
    node: true
*/

/*eslint-env
    browser,
    node
*/

(function () {
    'use strict';

    var HTMLUtils = (function () {
        function HTMLUtils() { }
        
        HTMLUtils.getHTMLforDOMElement = function (target) {
            var wrap = document.createElement('div');
            wrap.appendChild(target.cloneNode(true));
            return wrap.innerHTML;
        };
        
        HTMLUtils.getHTMLforDOMElementById = function (domElementId) {
            var target = document.getElementById(domElementId);
            return HTMLUtils.getHTMLforDOMElement(target);
        };
        
        /**
         * @see {@link https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript|Stack Overflow}
         */
        HTMLUtils.removeAllChildElementsOfDOMNode = function (domElementId) {
            var myNode = document.getElementById(domElementId);
            
            // much slower:
            //myNode.innerHTML = '';
            
            // much faster:
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }
        };
        
        return HTMLUtils;
    }());

    if (typeof window === 'undefined') {
        module.exports = HTMLUtils;
    } else {
        window.HTMLUtils = HTMLUtils;
    }

}());
/*jslint node: true */
/*global
    window,
    module
*/

(function () {
    'use strict';

    var ImageUtils = (function () {
        function ImageUtils() { }
        
        /**
         * @see {@link https://stackoverflow.com/questions/226847/what-is-the-best-javascript-code-to-create-an-img-element|Stack Overflow}
         */
        ImageUtils.createImageElement = function (src, alt, title) {
            var img = window.document.createElement('img');
            img.src = src;
            if (alt !== null) {
                img.alt = alt;
            }
            if (title !== null) {
                img.title = title;
            }
            return img;
        };
        
        return ImageUtils;
    }());

    if (typeof window === 'undefined') {
        module.exports = ImageUtils;
    } else {
        window.ImageUtils = ImageUtils;
    }

}());
/*jslint node: true */
/*global
    window, XMLHttpRequest, JSON,
    module
*/

(function () {
    'use strict';

    var JSONUtils = (function () {
        function JSONUtils() { }
        
        JSONUtils.parseFromURL = function (url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    var jsonStr = xhr.responseText,
                        json = JSON.parse(jsonStr);
                    callback(json);
                }
            };
            xhr.open("GET", url, true);
            xhr.send();
        };
        
        return JSONUtils;
    }());

    if (typeof window === 'undefined') {
        module.exports = JSONUtils;
    } else {
        window.JSONUtils = JSONUtils;
    }

}());
/*jslint node: true */
/*global
    window,
    module
*/

(function () {
    'use strict';

    var StringUtils = (function () {
        function StringUtils() { }
        
        StringUtils.equals = function (str1, str2) {
            return str1.localeCompare(str2) === 0;
        };
        
        return StringUtils;
    }());

    if (typeof window === 'undefined') {
        module.exports = StringUtils;
    } else {
        window.StringUtils = StringUtils;
    }

}());
/*jslint
    node: true
*/

/*eslint-env
    browser,
    node
*/

(function () {
    'use strict';

    var TableUtils = (function () {
        function TableUtils() { }
        
        TableUtils.createTableInPlaceHolder = function (placeHolderId, width, border, borderColor, borderCollapse) {
            var table = document.createElement('table'),
                tbody = document.createElement('tbody'),
                placeHolderNode = document.getElementById(placeHolderId);
            
            table.style.width = typeof width !== 'undefined' ? width : '100%';
            table.setAttribute('border', typeof border !== 'undefined' ? border : '1');
            table.setAttribute('bordercolor', typeof borderColor !== 'undefined' ? borderColor : 'LightSlateGray');
            table.style.borderCollapse = typeof borderCollapse !== 'undefined' ? borderCollapse : 'collapse';
            
            table.appendChild(tbody);
            
            while (placeHolderNode.firstChild) {
                placeHolderNode.removeChild(placeHolderNode.firstChild);
            }
            placeHolderNode.appendChild(table);
            
            return table;
        };
        
        TableUtils.createRowWithCellValuesInTable = function (table, cellValues) {
            var tr = document.createElement('tr'),
                tbody = table.tBodies[0];
            cellValues.map(function (cellValue) {
                TableUtils.createCellWithContentInRow(tr, cellValue);
            });
            tbody.appendChild(tr);
            return tr;
        };
        
        TableUtils.createRowWithCellsInTable = function (table, cells) {
            var tr = document.createElement('tr'),
                tbody = table.tBodies[0];
            cells.map(function (cell) {
                tr.appendChild(cell);
            });
            tbody.appendChild(tr);
            return tr;
        };
        
        TableUtils.createCellWithContent = function (htmlContent, cssClass, colSpan) {
            var td = document.createElement('td'),
                div = document.createElement('div');
            
            if (typeof htmlContent !== 'undefined') {
                div.innerHTML = htmlContent;
            }
            
            if (typeof cssClass !== 'undefined') {
                div.setAttribute('class', cssClass);
            }
            
            if (colSpan !== null) {
                td.colSpan = colSpan;
            }

            td.appendChild(div);
            
            return td;
        };
        
        TableUtils.createCellWithContentInRow = function (row, htmlContent, cssClass, colSpan) {
            var td = TableUtils.createCellWithContent(htmlContent, cssClass, colSpan);
            row.appendChild(td);
            return td;
        };
        
        return TableUtils;
    }());

    if (typeof window === 'undefined') {
        module.exports = TableUtils;
    } else {
        window.TableUtils = TableUtils;
    }

}());
/*jslint
    node: true
*/

/*eslint-env
    browser,
    node
*/

(function () {
    'use strict';

    var TimerUtils = (function () {
        function TimerUtils() { }
                
        /**
         * @see {@link https://stackoverflow.com/questions/13304471/javascript-get-code-to-run-every-minute|Stack Overflow}
         */
        TimerUtils.runCodeEveryMinute = function (k, yourCode) {
            var minute = 60 * 1000, // 60 * 1000 milsec
                timerID = setInterval(function () {
                    yourCode(timerID);
                    
                    // clearInterval(timerID);
                    // The setInterval it cleared and doesn't run anymore.
                    
                }, minute * k);
            yourCode(timerID);
            return timerID;
        };
        
        return TimerUtils;
    }());

    if (typeof window === 'undefined') {
        module.exports = TimerUtils;
    } else {
        window.TimerUtils = TimerUtils;
    }

}());
/*jslint node: true */
/*global
    window, XMLHttpRequest,
    module
*/

(function () {
    'use strict';

    var XMLUtils = (function () {
        function XMLUtils() { }
        
        /**
         * @see {@link https://stackoverflow.com/questions/25280911/how-to-read-xml-server-response-in-javascript|Stack Overflow}
         */
        XMLUtils.parseFromURL = function (url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    var xmlStr = xhr.responseText,
                        xml;
                    if (typeof window.DOMParser !== "undefined") {
                        xml = (new window.DOMParser()).parseFromString(xmlStr, "text/xml");
                    } else {
                        throw new Error("No XML parser found");
                    }
                    callback(xml);
                }
            };
            xhr.open("GET", url, true);
            xhr.send();
        };
        
        XMLUtils.isTagExists = function (xml, tagName) {
            return xml.getElementsByTagName(tagName).length > 0;
        };
        
        return XMLUtils;
    }());

    if (typeof window === 'undefined') {
        module.exports = XMLUtils;
    } else {
        window.XMLUtils = XMLUtils;
    }

}());
/*jslint
    node: true
*/

/*eslint-env
    browser,
    node
*/

var Utils = {};

if (typeof window === 'undefined') {

    Utils.Chromium = require('./chromium');
    Utils.Clipboard = require('./clipboard');
    Utils.Timer = require('./timer');
    
    Utils.Array = require('./array');
    Utils.String = require('./string');

    Utils.HTML = require('./html');
    Utils.Image = require('./image');
    Utils.Table = require('./table');
    
    Utils.JSON = require('./json');
    Utils.XML = require('./xml');

} else {

    Utils.Chromium = window.ChromiumUtils;
    Utils.Clipboard = window.ClipboardUtils;
    Utils.Timer = window.TimerUtils;
    
    Utils.Array = window.ArrayUtils;
    Utils.String = window.StringUtils;
    
    Utils.HTML = window.HTMLUtils;
    Utils.Image = window.ImageUtils;
    Utils.Table = window.TableUtils;
    
    Utils.JSON = window.JSONUtils;
    Utils.XML = window.XMLUtils;

}
