/*jslint node: true */
/*global
    window,
    require
*/

var Utils;

if (typeof window === 'undefined') {
    Utils.Clipboard = require('./clipboard');
} else {
    Utils.Clipboard = window.ClipboardUtils;
}
