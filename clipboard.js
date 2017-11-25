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

}());