define([
    'backbone',
    'models/header',
    'models/content'
], function (Backbone, Header, Content) {
    'use strict';

    return Backbone.Model.extend({
        defaults: {
            header: new Header(),
            content: new Content(),
            importance: 1,
            url: undefined,
            tags: undefined
        },

        getTags: function () {
            var tags = this.get('tags');
            if (!tags) {
                tags = ['legacy'];
                this.set('tags', tags);
            }
            else if ($.inArray('legacy', tags) === -1 &&
                $.inArray('nolegacy', tags) === -1) {
                tags.push('legacy');
            }

            return tags;
        }
    });
});