/*jslint node: true */
/*global
    window,
    module
*/

(function () {
    'use strict';

    var ClipboardUtils = (function () {
        function ClipboardUtils() { }
        return ClipboardUtils;
    }());
    
    /**
     * @see {@link https://stackoverflow.com/questions/3436102/copy-to-clipboard-in-chrome-extension|Stack Overflow}
     */
    ClipboardUtils.copyText = function (text) {
        if (typeof window !== 'undefined') {
            var textarea = window.document.createElement("textarea"),
                body = window.document.getElementsByTagName('body')[0];
            textarea.textContent = text;
            body.appendChild(textarea);
            textarea.select();
            window.document.execCommand('copy');
            body.removeChild(textarea);
        }
    };

    if (typeof window === 'undefined') {
        module.exports = ClipboardUtils;
    } else {
        window.SeqExec = ClipboardUtils;
    }

}());