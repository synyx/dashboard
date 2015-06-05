define([], function () {
    'use strict';
    return {
        isDefined: function (toBeDefined, what) {
            if (!toBeDefined) {
                throw 'need ' + what + ' defined';
            }
        }
    };
});
