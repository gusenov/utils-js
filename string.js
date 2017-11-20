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
