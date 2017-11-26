/*jslint node: true */
/*global
    window, XMLHttpRequest, JSON,
    module
*/

(function () {
    'use strict';

    var JSONUtils = (function () {
        function JSONUtils() { }
        
        JSONUtils.parseFromURL = function (url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    var jsonStr = xhr.responseText,
                        json = JSON.parse(jsonStr);
                    callback(json);
                }
            };
            xhr.open("GET", url, true);
            xhr.send();
        };
        
        return JSONUtils;
    }());

    if (typeof window === 'undefined') {
        module.exports = JSONUtils;
    } else {
        window.JSONUtils = JSONUtils;
    }

}());
