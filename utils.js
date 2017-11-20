/*jslint node: true */
/*global
    window,
    require
*/

var Utils;

if (typeof window === 'undefined') {
    Utils.Clipboard = require('./clipboard');
    Utils.Chromium = require('./chromium');
    Utils.String = require('./string');
} else {
    Utils.Clipboard = window.ClipboardUtils;
    Utils.Chromium = window.ChromiumUtils;
    Utils.String = window.StringUtils;
}
