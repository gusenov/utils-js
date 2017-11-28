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
