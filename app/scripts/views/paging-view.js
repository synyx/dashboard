define([
    'backbone',
    'template-manager/template-manager',
    'stringToColor'
], function (Backbone, templateManager) {
    'use strict';

    return Backbone.View.extend({

        templateName: 'PagingView',

        initialize: function (options) {
            _.bindAll(this, 'render', 'colorizePages', 'calculatePageWidth', 'activeSource');

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
            this.calculatePageWidth();
            this.activeSource();
        },

        colorizePages: function () {
            this.$('.page').each(function () {
                $(this).css({'background-color': '#' + string_to_color($(this).attr('title'))});
            });
        },

        calculatePageWidth: function () {
            this.$('.page').css({'width': (100 / parseInt(this.$('.page').length)).toFixed(2) + '%'});
        },

        activeSource: function () {
            var currentPage = this.model.get('current');
            if (currentPage !== undefined) {
                var activePageIndex = currentPage + 1;
                this.$('.page:nth-of-type(' + activePageIndex + ')').addClass('page-active');
                this.$('.page:not(:nth-of-type(' + activePageIndex + '))').removeClass('page-active');
            }
        }
    });
});