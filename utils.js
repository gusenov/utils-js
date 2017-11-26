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
    Utils.XML = require('./xml');
    Utils.JSON = require('./json');
    Utils.Array = require('./array');
} else {
    Utils.Clipboard = window.ClipboardUtils;
    Utils.Chromium = window.ChromiumUtils;
    Utils.XML = window.XMLUtils;
    Utils.JSON = window.JSONUtils;
    Utils.Array = window.ArrayUtils;
}
