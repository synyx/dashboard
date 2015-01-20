define([
    'backbone'
], function (Backbone) {
    'use strict';

    return Backbone.Model.extend({
        defaults: {
            current: undefined,
            total: undefined
        }
    });
});