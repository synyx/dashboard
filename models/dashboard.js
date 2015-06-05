define([
    'backbone'
], function (Backbone) {
    'use strict';

    return Backbone.Model.extend({
        defaults: {
            headerModel: undefined,
            contentModel: undefined,
            timerModel: undefined,
            statusModel: undefined
        }
    });
});
