define([
    'backbone',
    'jquery',
    'views/control-view',
    'views/status-view',
    'views/content-view',
    'template-manager'
], function (Backbone, $, ControlView, StatusView, ContentView, templateManager) {
    'use strict';

    return Backbone.View.extend({

        templateName: 'DashView',

        initialize: function () {
            _.bindAll(this, 'render', 'renderContent');

            this.template = templateManager.getTemplate(this.templateName);

            if (this.model === undefined) {
                throw 'model is undefined';
            }

            this.render();
            this.model.on('change:content', this.renderContent);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));

            new ControlView({
                el: this.$('.controls'),
                model: this.model.get('timerModel')
            });
            new StatusView({
                el: this.$('.status-container'),
                model: this.model.get('status')
            });
            this.renderContent();
        },

        renderContent: function () {
            new ContentView({
                el: this.$('.content'),
                model: this.model.get('content')
            });
            this.sizeContent();
        },

        setHeight: function (height) {
            this.$('.content').css('max-height', height);
            this.$('.content').css('min-height', height);
            this.$('.content').css('height', height);
        },

        sizeContent: function () {
            var winH = 1000;

            if (document.body && document.body.offsetWidth) {
                winH = document.body.offsetHeight;
            }

            if (document.compatMode === 'CSS1Compat' &&
                document.documentElement &&
                document.documentElement.offsetWidth) {
                winH = document.documentElement.offsetHeight;
            }

            if (window.innerWidth && window.innerHeight) {
                winH = window.innerHeight;
            }

            var pixels;
            var height;
            var bodyHeight = $('body').height();

            if (bodyHeight > winH) {
                pixels = bodyHeight - winH;
                height = this.$('.content').height() - pixels;

                this.setHeight(height);
            }
            else if (bodyHeight < winH) {
                pixels = winH - bodyHeight;
                height = this.$('.content-container').height() + pixels;

                this.setHeight(height);
            }
        }
    });
});