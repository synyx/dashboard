define([
    'backbone',
    '/source'
], function (Backbone, Source) {
    'use strict';

    return Backbone.Collection.extend({
        model: new Source()
    });
});
