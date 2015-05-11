define([
    'backbone',
    'underscore',
    'models/sources'
], function (Backbone, _, Sources) {
    'use strict';

    return Backbone.Model.extend({

        defaults: {
            rules: []
        },

        initialize: function (options) {
            _.bindAll(this, 'prepareStringTags', 'initFromTags', 'filter', 'matchesFilters');

            if (options.providedStringTags) {
                this.initFromTags(this.prepareStringTags(options.providedStringTags));
            }

            if (options.tags) {
                this.initFromTags(options.tags);
            }
        },

        initFromTags: function (tags) {
            var that = this;

            tags.forEach(function (tag) {
                console.log('Adding filter for tag = ' + tag);

                var tagFunction;
                if (typeof tag === 'string') {
                    tagFunction = function (content) {
                        return content.getTags().some(function (contentTag) {
                            return tag === contentTag;
                        });
                    };
                    that.get('rules').push(tagFunction);
                }
                else if (Object.prototype.toString.call(tag) === '[object Array]') {
                    tagFunction = function (content) {
                        var contentTags = content.getTags();

                        return tag.every(function (tagX) {
                            return $.inArray(tagX, contentTags) !== -1;
                        });
                    };
                    that.get('rules').push(tagFunction);
                }
            });
        },

        prepareStringTags: function (stringTags) {
            var ors = stringTags.split('-');
            var orArray = [];
            ors.forEach(function (or) {
                var ands = or.split('+');

                var andArray = [];
                ands.forEach(function (and) {
                    andArray.push(and);
                });

                orArray.push(ands);
            });

            return orArray;
        },

        filter: function (sources) {
            var filteredSources = new Sources();
            var that = this;
            sources.each(function (source) {
                if (that.matchesFilters(source)) {
                    filteredSources.add(source);
                }
            });

            return filteredSources;
        },

        matchesFilters: function (content) {
            if (this.get('rules').length === 0) {
                return true;
            }

            var anyMatch = false;
            this.get('rules').forEach(function (rule) {
                if (rule(content)) {
                    anyMatch = true;
                }
            });
            return anyMatch;
        }
    });
});
