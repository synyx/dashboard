define([
    'backbone',
    'models/content'
], function (Backbone, Content) {
    'use strict';

    return Backbone.Collection.extend({
        model: new Content()
    });
});