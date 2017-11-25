/*jslint node: true */
/*global
    window,
    module
*/

(function () {
    'use strict';

    var DateUtils = (function () {
        function DateUtils() { }
        
        /**
         * @see {@link https://stackoverflow.com/questions/2013255/how-to-get-year-month-day-from-a-date-object|Stack Overflow}
         */
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
