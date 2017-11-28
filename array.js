/*jslint node: true */
/*global
    window,
    module
*/

(function () {
    'use strict';

    var ArrayUtils = (function () {
        function ArrayUtils() { }
        
        /**
         * @see {@link https://stackoverflow.com/questions/7378228/check-if-an-element-is-present-in-an-array|Stack Overflow}
         */
        ArrayUtils.isInArray = function (value, array) {
            return array.indexOf(value) > -1;
        };
        
        ArrayUtils.sortByKey = function (array, key, asc) {
            
            /**
             * @see {@link https://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key|Stack Overflow}
             */
            Object.byString = function (o, s) {
                s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
                s = s.replace(/^\./, '');           // strip a leading dot
                var a = s.split('.'),
                    i,
                    n,
                    k;
                for (i = 0, n = a.length; i < n; i += 1) {
                    k = a[i];
                    if (o.hasOwnProperty(k)) {
                        o = o[k];
                    } else {
                        return;
                    }
                }
                return o;
            };
            
            return array.sort(function (a, b) {
                var x = Object.byString(a, key),
                    y = Object.byString(b, key);
                if (asc) {
                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                } else {
                    return ((y < x) ? -1 : ((y > x) ? 1 : 0));
                }
            });
        };
        
        ArrayUtils.isArray = function (a) {
            return (!!a) && (a.constructor === Array);
        };
        
        return ArrayUtils;
    }());

    if (typeof window === 'undefined') {
        module.exports = ArrayUtils;
    } else {
        window.ArrayUtils = ArrayUtils;
    }

}());
