define([
    'backbone',
    'template-manager'
], function (Backbone, templateManager) {
    'use strict';

    return Backbone.View.extend({

        templateName: 'ContentView',

        initialize: function () {
            _.bindAll(this, 'render');

            this.model.bind('change', this.render);

            this.template = templateManager.getTemplate(this.templateName);
            this.render();
        },

        render: function () {
            var model = this.model.toJSON();
            this.$el.html(this.template(model));
            this.$('.content-container').html(model.content);
        }
    });
});