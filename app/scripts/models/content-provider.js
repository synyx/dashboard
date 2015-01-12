define([
    'backbone',
    'models/content-collection',
    'models/content'
], function (Backbone, ContentCollection, Content) {
    'use strict';

    return Backbone.Model.extend({

        initialize: function (options) {
            _.bindAll(this, 'getContent', 'successReadListing');

            if (!options.listingurl) {
                throw 'ContentProvider needs listingurl defined in options.';
            }
            this.listingurl = options.listingurl;

            if (!options.contenturl) {
                throw 'ContentProvider needs contenturl defined in options.';
            }
            this.contenturl = options.contenturl;

        },

        getContent: function (callback) {
            if (!callback) {
                throw 'ContentProvider.getContent needs callback.';
            }

            var that = this;
            var callbackCapturedCallback = function (data) {
                that.successReadListing(callback, data);
            };

            this.call(
                this.listingurl, callbackCapturedCallback, function () {
                    callbackCapturedCallback(['listingproblem.json']);
                }
            );
        },

        successReadListing: function (callback, listings) {
            var all = new ContentCollection();

            var that = this;
            _.forEach(listings, function (listing) {
                
                var content = new Content({
                    url: that.contenturl + listing,
                    name: 'Content Loading...'
                });
                all.add(content);

                // we wrap this to capture the current Content-Object
                var successFunction = function (data) {
                    content.set(data);
                };

                that.call(
                    content.get('url'), successFunction, function (e, f) {
                        successFunction({
                            title: 'Error loading', 
                            body: 'Error loading: ' + f + '. Url was ' + content.get('url')
                        });
                    }
                );

            });
            callback(all);
        },

        call: function (url, successcallback, errorcallback) {
            $.ajax({
                    url: url,
                    success: successcallback,
                    dataType: 'json',
                    cache: false,
                    context: this,
                    error: errorcallback,
                    async: false
                }
            );
        }
    });
});