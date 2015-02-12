define([
    'backbone',
    'template-manager/template-manager'
], function (Backbone, templateManager) {
    'use strict';

    return Backbone.View.extend({

        templateName: 'PagingView',

        initialize: function (options) {
            _.bindAll(this, 'render', 'colorizePages', 'stringToColor', 'percentage', 'activeSource');

            this.template = templateManager.getTemplate(this.templateName);

            if (this.model === undefined) {
                throw 'model is undefined';
            }
            if (options.sources === undefined) {
                throw 'sources collection is undefined';
            }

            this.sources = options.sources;
            this.sources.on('change', this.render);
            this.model.on('change:current', this.activeSource);

            this.render();
        },

        render: function () {
            this.$el.html(this.template(this.sources));

            this.colorizePages();
            this.percentage();
            this.activeSource();
        },

        colorizePages: function () {
            var that = this;
            this.$('.page').each(function () {
                $(this).css({'background-color': '#' + that.stringToColor($(this).attr('title'))});
            });
        },

        percentage: function () {
            var length = parseInt(this.$('.page').length);
            var percentage = (100 / length).toFixed(2);

            this.$('.page').css({'width': percentage + '%'});
            this.$('.page:last-of-type').css({'width': percentage + (100 - (length * percentage)) + '%'});
        },

        activeSource: function () {
            var activePageIndex = this.model.get('current') + 1;
            this.$('.page:nth-of-type(' + activePageIndex + ')').addClass('page-active');
            this.$('.page:not(:nth-of-type(' + activePageIndex + '))').removeClass('page-active');
        },

        stringToColor: function (str) {
            // Generate a Hash for the String
            var hash = function (word) {
                var h = 0;
                for (var i = 0; i < word.length; i++) {
                    h = word.charCodeAt(i) + ((h << 5) - h);
                }
                return h;
            };
            // Change the darkness or lightness
            var shade = function (color, prc) {
                var num = parseInt(color, 16),
                    amt = Math.round(2.55 * prc),
                    R = (num >> 16) + amt,
                    G = (num >> 8 & 0x00FF) + amt,
                    B = (num & 0x0000FF) + amt;
                return (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
                    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
                    (B < 255 ? B < 1 ? 0 : B : 255))
                    .toString(16)
                    .slice(1);
            };
            // Convert init to an RGBA
            var intToRgba = function (i) {
                return ((i >> 24) & 0xFF).toString(16) +
                    ((i >> 16) & 0xFF).toString(16) +
                    ((i >> 8) & 0xFF).toString(16) +
                    (i & 0xFF).toString(16);
            };
            return shade(intToRgba(hash(str)), -10);
        }
    });
});