define([
    'backbone',
    'underscore',
    './source',
    './sources',
    './header',
    './content',
    '/defined-checker'
], function (Backbone, _, Source, Sources, Header, Content, definedChecker) {
    'use strict';

    return Backbone.Model.extend({

        initialize: function (options) {
            definedChecker.isDefined(options.listingUrl, 'listingUrl');
            definedChecker.isDefined(options.contentUrl, 'contentUrl');

            _.bindAll(this, 'getSources', 'successReadListing', 'call');

            this.listingUrl = options.listingUrl;
            this.contentUrl = options.contentUrl;
        },

        getSources: function (callback) {
            definedChecker.isDefined(callback, 'callback');

            var that = this;
            this.call(
                this.listingUrl,
                function (responseData) {
                    that.successReadListing(callback, responseData);
                },
                function () {
                    that.successReadListing(callback, ['listing-problem.json']);
                }
            );
        },

        successReadListing: function (callback, listings) {
            var sources = new Sources();

            var that = this;
            listings.forEach(function (listing) {

                var source = new Source({
                    url: that.contentUrl + listing
                });

                that.call(
                    source.get('url'),
                    function (data) {

                        if (!data.importance) {
                            data.importance = 1;
                        }

                        source.set({
                            header: new Header({
                                name: data.name
                            }),
                            content: new Content({
                                content: data.content
                            }),
                            tags: data.tags,
                            importance: data.importance
                        });
                    },
                    function (jqXHR, textStatus) {
                        source.set({
                            header: new Header({
                                name: 'Error loading'
                            }),
                            content: new Content({
                                content: 'Error loading ' + source.get('url') + '(' + textStatus + ')'
                            })
                        });
                    }
                );

                sources.add(source);
            });
            callback(sources);
        },

        call: function (url, success, error) {
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'json',
                success: success,
                error: error,
                cache: false,
                async: false
            });
        }
    });
});
