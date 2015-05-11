define([
    'backbone'
], function (Backbone) {
    'use strict';

    return Backbone.Model.extend({
        defaults: {
            current: undefined,
            next: undefined,
            prev: undefined,
            total: undefined,
            isRunning: false,
            secondsLeft: undefined,
            seconds: undefined
        }
    });
});
