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
