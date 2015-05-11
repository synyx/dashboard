define([], function () {
    return {
        isDefined: function (toBeDefined, what) {
            'use strict';
            if (!toBeDefined) {
                throw 'need ' + what + ' defined';
            }
        }
    };
});
