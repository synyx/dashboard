define([
    'backbone'
], function (Backbone) {
    'use strict';

    return Backbone.Model.extend({
        defaults: {
            content: 'Please wait while this is loading...'
        }
    });
});
