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

        ChromiumUtils.createContextMenuItemThatOpensNewPage = function (id, title, contexts, isVisible, url) {
            chrome.contextMenus.create({
                id: id,
                title: title,
                contexts: contexts,
                visible: isVisible,
                onclick: function () {
                    chrome.tabs.create({ url: url });
                }
            });
        };
        
        return ChromiumUtils;
    }());

    if (typeof window === 'undefined') {
        module.exports = ChromiumUtils;
    } else {
        window.ChromiumUtils = ChromiumUtils;
    }

}());
