/*jslint
    devel: true,
    node: true
*/

/*eslint-env
    browser,
    node
*/

/* eslint-disable
    no-console
*/

(function () {
    'use strict';

    var RegExUtils = (function () {
        function RegExUtils() { }
        
        /**
         * @see {@link https://stackoverflow.com/questions/1707299/how-to-extract-a-string-using-javascript-regex|Stack Overflow}
         */
        RegExUtils.extractStringUsingJavaScriptRegEx = function (content, rx) {
            var arr = content.match(rx) || [""]; // could also use null for empty value
            return arr[0];
        };
        
        return RegExUtils;
    }());

    if (typeof window === 'undefined') {
        module.exports = RegExUtils;
    } else {
        window.RegExUtils = RegExUtils;
    }

}());
