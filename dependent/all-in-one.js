/*jslint
    node: true
*/

/*eslint-env
    browser,
    node
*/

var Utils = {};

if (typeof window === 'undefined') {

    Utils.Chromium = require('./chromium');
    Utils.Clipboard = require('./clipboard');
    Utils.Timer = require('./timer');
    
    Utils.Array = require('./array');
    Utils.String = require('./string');
    Utils.RegEx = require('./regex');

    Utils.HTML = require('./html');
    Utils.Image = require('./image');
    Utils.Table = require('./table');
    
    Utils.JSON = require('./json');
    Utils.XML = require('./xml');

} else {

    Utils.Chromium = window.ChromiumUtils;
    Utils.Clipboard = window.ClipboardUtils;
    Utils.Timer = window.TimerUtils;
    
    Utils.Array = window.ArrayUtils;
    Utils.String = window.StringUtils;
    Utils.RegEx = window.RegExUtils;
    
    Utils.HTML = window.HTMLUtils;
    Utils.Image = window.ImageUtils;
    Utils.Table = window.TableUtils;
    
    Utils.JSON = window.JSONUtils;
    Utils.XML = window.XMLUtils;

}
