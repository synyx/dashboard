define([
    'backbone'
], function (Backbone) {
    'use strict';

    return Backbone.Model.extend({
        defaults: {
            isRunning: false,
            seconds: undefined,
            secondsAtStart: undefined
        }
    });
});