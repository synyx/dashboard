define([
    'backbone',
    'models/source-collection',
    'models/source',
    'models/header',
    'models/content'
], function (Backbone, SourceCollection, Source, Header, Content) {
    'use strict';

    return Backbone.Model.extend({

        initialize: function (options) {
            _.bindAll(this, 'getSources', 'successReadListing');

            if (!options.listingUrl) {
                throw 'ContentProvider needs listingUrl defined in options.';
            }
            if (!options.contentUrl) {
                throw 'ContentProvider needs contentUrl defined in options.';
            }

            this.listingUrl = options.listingUrl;
            this.contentUrl = options.contentUrl;
        },

        getSources: function (callback) {
            if (!callback) {
                throw 'ContentProvider.getSources needs callback.';
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
            var sourceCollection = new SourceCollection();

            var that = this;
            _.forEach(listings, function (listing) {

                var source = new Source({
                    url: that.contentUrl + listing
                });

                that.call(
                    source.get('url'),
                    function (data) {
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

                sourceCollection.add(source);
            });
            callback(sourceCollection);
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