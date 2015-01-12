define([
    'backbone',
    'underscore',
    'models/content-collection'
], function (Backbone, _, ContentCollection) {
    'use strict';

    return Backbone.Model.extend({

        initialize: function (options) {
            this.rules = [];

            if (options.tagString) {
                var ors = options.tagString.split('-');
                var orArray = [];
                _.each(ors, function (or) {
                    var ands = or.split('+');

                    var andArray = [];
                    _.each(ands, function (and) {
                        andArray.push(and);
                    });

                    orArray.push(ands);
                });
                this.initFromTags(orArray);
            }

            if (options.tags) {
                this.initFromTags(options.tags);
            }
        },

        initFromTags: function (tags) {
            var that = this;

            _.each(tags, function (tag) {
                console.log('Adding filter for tag = ' + tag);
                var tagFunction;
                if (typeof tag === 'string') {
                    tagFunction = function (content) {
                        return _.any(content.getTags(), function (contentTag) {
                            return tag === contentTag;
                        });
                    };
                    that.rules.push(tagFunction);
                }
                else if (Object.prototype.toString.call(tag) === '[object Array]') {
                    tagFunction = function (content) {
                        var contentTags = content.getTags();

                        return _.all(tag, function (tagX) {
                            return $.inArray(tagX, contentTags) !== -1;
                        });
                    };
                    that.rules.push(tagFunction);
                }
            });
        },

        filter: function (contentList) {
            var newList = new ContentCollection();
            var that = this;
            contentList.each(function (content) {
                if (that.matchesFilters(content)) {
                    newList.add(content);
                }
            });

            return newList;
        },

        matchesFilters: function (content) {
            if (this.rules.length === 0) {
                return true;
            }

            var anyMatch = false;
            _.each(this.rules, function (rule) {
                if (rule(content)) {
                    anyMatch = true;
                }
            });
            return anyMatch;
        }
    });
});