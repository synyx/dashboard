define([
    'backbone',
    'underscore',
    '/control-view',
    '/paging-view',
    '/time-line-view',
    '/content-view',
    '/header-view',
    './template-manager',
    './defined-checker'
], function (Backbone, _, ControlView, PagingView, TimeLineView, ContentView, HeaderView, templateManager, definedChecker) {
    'use strict';

    var DashboardView = Backbone.View.extend({

        templateName: 'DashboardView',

        initialize: function () {
            definedChecker.isDefined(this.model, 'model');

            _.bindAll(this, 'render', 'renderChildren');

            this.template = templateManager.getTemplate(this.templateName);

            this.render();
            this.renderChildren();
        },

        create: function (options) {
            return new DashboardView(options);
        },

        render: function () {
            this.$el.html(this.template());
        },

        renderChildren: function () {
            HeaderView.prototype.create({
                el: this.$('#header-container'),
                model: this.model.get('headerModel')
            });

            PagingView.prototype.create({
                el: this.$('#paging-container'),
                model: this.model.get('statusModel'),
                sources: this.model.get('sources')
            });

            TimeLineView.prototype.create({
                el: this.$('#time-line-container'),
                model: this.model.get('statusModel')
            });

            ContentView.prototype.create({
                el: this.$('#content-container'),
                model: this.model.get('contentModel')
            });

            ControlView.prototype.create({
                elPrev: this.$('.controls-container-prev'),
                elNext: this.$('.controls-container-next'),
                model: this.model.get('statusModel')
            });
        }
    });

    return DashboardView;
});
