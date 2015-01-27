define([
    'backbone'
], function (Backbone) {
    'use strict';

    return Backbone.Model.extend({
        defaults: {
            isRunning: false,
            secondsLeft: undefined,
            seconds: undefined
        }
    });
});