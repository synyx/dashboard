define([
    'jquery',
    'backbone'
], function ($, Backbone) {
    'use strict';

    return Backbone.Model.extend({

        defaults: {
            name: 'no title',
            content: 'intentionally left blank',
            importance: 1,
            statusModel: undefined,
            tags: undefined
        },

        getTags: function () {
            var tags = this.get('tags');
            if (tags === undefined) {
                tags = ['legacy'];
                this.set('tags', tags);
            }
            else if (($.inArray('legacy', tags) === -1) && ($.inArray('nolegacy', tags) === -1)) {
                tags.push('legacy');
            }
            return tags;
        }
    });
});