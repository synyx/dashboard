define([
    'backbone',
    'models/content'
], function (Backbone, Source) {
    'use strict';

    return Backbone.Collection.extend({
        model: new Source()
    });
});