define([
    'backbone',
    'template-manager/template-manager'
], function (Backbone, templateManager) {
    'use strict';

    return Backbone.View.extend({

        templateName: 'StatusView',

        initialize: function () {
            _.bindAll(this, 'render', 'drawBar');

            this.template = templateManager.getTemplate(this.templateName);

            if (this.model === undefined) {
                throw 'model is undefined';
            }

            this.model.on('change', this.drawBar);

            this.render();
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        },

        drawBar: function () {
            var secondsLeft = this.model.get('secondsLeft');
            var seconds = this.model.get('seconds');
            this.$('.content-timer-line').css({
                width: ((seconds - secondsLeft) / seconds) * 100 + '%'
            });
        }
    });
});