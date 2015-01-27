define([
    'backbone',
    'views/control-view',
    'views/status-view',
    'views/content-view',
    'views/header-view',
    'template-manager/template-manager'
], function (Backbone, ControlView, StatusView, ContentView, HeaderView, templateManager) {
    'use strict';

    return Backbone.View.extend({

        templateName: 'DashboardView',

        initialize: function () {
            _.bindAll(this, 'render', 'renderChildren');

            this.template = templateManager.getTemplate(this.templateName);

            if (this.model === undefined) {
                throw 'model is undefined';
            }

            this.render();
            this.renderChildren();
        },

        render: function () {
            this.$el.html(this.template());
        },

        renderChildren: function () {
            new HeaderView({
                el: this.$('#header-container'),
                model: this.model.get('headerModel')
            });

            new StatusView({
                el: this.$('#status-container'),
                model: this.model.get('statusModel')
            });

            new ContentView({
                el: this.$('#content-container'),
                model: this.model.get('contentModel')
            });

            new ControlView({
                elPrev: this.$('.controls-container-prev'),
                elNext: this.$('.controls-container-next'),
                model: this.model.get('statusModel')
            });
        }
    });
});