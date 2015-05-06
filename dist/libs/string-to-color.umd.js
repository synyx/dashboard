(function (factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    }
})(function (exports) {
    /********************************************************
     Name: String to Color
     Description: creates a unambiguously color from a string
     Author: Tobias Schneider [code@Tobsch.org - http://www.tobsch.org]
     ********************************************************/

    /**
     * Converts a string into a unique color
     * @param str
     * @returns {string}
     */
    "use strict";

    exports.getColor = getColor;
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function getColor(str) {
        return doShading(intToRgb(hash(str)), -10);
    }

    /**
     * Generate a Hash for the String
     *
     * @param string
     * @returns {number}
     * @private
     */
    function hash(string) {
        var h = 0;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = string[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var char = _step.value;

                h = char.codePointAt(0) + ((h << 5) - h);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator["return"]) {
                    _iterator["return"]();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        return h;
    }

    /**
     * Converts an integer to the rgb code
     *
     * @param int
     * @returns {string} that contains the rgb code
     * @private
     */
    function intToRgb(int) {
        return (int >> 24 & 255).toString(16) + (int >> 16 & 255).toString(16) + (int >> 8 & 255).toString(16) + (int & 255).toString(16);
    }

    /**
     * Change the darkness or lightness
     *
     * @param color RGB color
     * @param prc
     * @returns {string}
     * @private
     */
    function doShading(color, prc) {
        var num = parseInt(color, 16),
            amt = Math.round(2.55 * prc),
            R = (num >> 16) + amt,
            G = (num >> 8 & 255) + amt,
            B = (num & 255) + amt;

        return (16777216 + (R < 255 ? R < 1 ? 0 : R : 255) * 65536 + (G < 255 ? G < 1 ? 0 : G : 255) * 256 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    }
});