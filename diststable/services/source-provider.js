define([
    'backbone',
    'models/source',
    'models/sources',
    'models/header',
    'models/content'
], function (Backbone, Source, Sources, Header, Content) {
    'use strict';

    return Backbone.Model.extend({

        initialize: function (options) {
            _.bindAll(this, 'getSources', 'successReadListing');

            if (!options.listingUrl) {
                throw 'SourceProvider needs listingUrl defined in options.';
            }
            if (!options.contentUrl) {
                throw 'SourceProvider needs contentUrl defined in options.';
            }

            this.listingUrl = options.listingUrl;
            this.contentUrl = options.contentUrl;
        },

        getSources: function (callback) {
            if (!callback) {
                throw 'SourceProvider.getSources needs callback.';
            }

            var that = this;
            var callbackCapturedCallback = function (data) {
                that.successReadListing(callback, data);
            };

            this.call(
                this.listingUrl,
                callbackCapturedCallback,
                function () {
                    callbackCapturedCallback(['listingproblem.json']);
                }
            );
        },

        successReadListing: function (callback, listings) {
            var sources = new Sources();

            var that = this;
            _.forEach(listings, function (listing) {

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