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
