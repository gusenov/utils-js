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
        return ChromiumUtils;
    }());
    
    /**
     * @see {@link https://stackoverflow.com/questions/3436102/copy-to-clipboard-in-chrome-extension|Stack Overflow}
     */
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

    if (typeof window === 'undefined') {
        module.exports = ChromiumUtils;
    } else {
        window.ChromiumUtils = ChromiumUtils;
    }

}());
