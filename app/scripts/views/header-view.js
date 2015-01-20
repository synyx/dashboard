define([
    'backbone',
    'template-manager/template-manager'
], function (Backbone, templateManager) {
    'use strict';

    return Backbone.View.extend({

        templateName: 'HeaderView',

        initialize: function () {
            _.bindAll(this, 'render');

            this.template = templateManager.getTemplate(this.templateName);
            this.model.on('change', this.render);

            this.render();
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        }
    });
});