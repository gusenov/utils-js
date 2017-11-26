/*jslint node: true */
/*global
    window,
    module
*/

(function () {
    'use strict';

    var ImageUtils = (function () {
        function ImageUtils() { }
        
        /**
         * @see {@link https://stackoverflow.com/questions/226847/what-is-the-best-javascript-code-to-create-an-img-element|Stack Overflow}
         */
        ImageUtils.createImageElement = function (src, alt, title) {
            var img = window.document.createElement('img');
            img.src = src;
            if (alt !== null) {
                img.alt = alt;
            }
            if (title !== null) {
                img.title = title;
            }
            return img;
        };
        
        return ImageUtils;
    }());

    if (typeof window === 'undefined') {
        module.exports = ImageUtils;
    } else {
        window.ImageUtils = ImageUtils;
    }

}());
