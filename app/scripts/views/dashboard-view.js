define([
    'backbone',
    'underscore',
    'views/control-view',
    'views/paging-view',
    'views/time-line-view',
    'views/content-view',
    'views/header-view',
    'template-manager/template-manager',
    'services/defined-checker'
], function (Backbone, _, ControlView, PagingView, TimeLineView, ContentView, HeaderView, templateManager, definedChecker) {
    'use strict';

    return Backbone.View.extend({

        templateName: 'DashboardView',

        initialize: function () {
            definedChecker.isDefined(this.model, 'model');

            _.bindAll(this, 'render', 'renderChildren');

            this.template = templateManager.getTemplate(this.templateName);

            this.render();
            this.renderChildren();
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
});