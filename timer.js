/*jslint
    node: true
*/

/*eslint-env
    browser,
    node
*/

(function () {
    'use strict';

    var TimerUtils = (function () {
        function TimerUtils() { }
                
        /**
         * @see {@link https://stackoverflow.com/questions/13304471/javascript-get-code-to-run-every-minute|Stack Overflow}
         */
        TimerUtils.runCodeEveryMinute = function (k, yourCode) {
            var minute = 60 * 1000, // 60 * 1000 milsec
                timerID = setInterval(function () {
                    yourCode(timerID);
                    
                    // clearInterval(timerID);
                    // The setInterval it cleared and doesn't run anymore.
                    
                }, minute * k);
            yourCode(timerID);
            return timerID;
        };
        
        return TimerUtils;
    }());

    if (typeof window === 'undefined') {
        module.exports = TimerUtils;
    } else {
        window.TimerUtils = TimerUtils;
    }

}());
