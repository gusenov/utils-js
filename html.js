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
        
        return HTMLUtils;
    }());

    if (typeof window === 'undefined') {
        module.exports = HTMLUtils;
    } else {
        window.HTMLUtils = HTMLUtils;
    }

}());
