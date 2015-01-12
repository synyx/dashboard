define([
    'backbone'
], function (Backbone) {
    'use strict';

    return Backbone.Model.extend({
        defaults: {
            content: undefined,
            timerModel: undefined
        }
    });
});