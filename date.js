/*jslint node: true */
/*global
    window,
    module
*/

(function () {
    'use strict';

    var DateUtils = (function () {
        function DateUtils() { }
        
        DateUtils.formatDateToYYYYMMDD = function (date, separator) {
            separator = typeof separator !== 'undefined' ? separator : '/';
            return date.getFullYear()
                + separator
                + (((date.getMonth() + 1) < 10) ? '0' : '') + (date.getMonth() + 1)
                + separator
                + ((date.getDate() < 10) ? '0' : '') + date.getDate();
        };
        
        return DateUtils;
    }());

    if (typeof window === 'undefined') {
        module.exports = DateUtils;
    } else {
        window.DateUtils = DateUtils;
    }

}());
