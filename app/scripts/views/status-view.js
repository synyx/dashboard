define([
    'backbone',
    'template-manager'
], function (Backbone, templateManager) {
    'use strict';

    return Backbone.View.extend({

        templateName: 'StatusView',

        initialize: function () {
            _.bindAll(this, 'render');

            this.template = templateManager.getTemplate(this.templateName);

            if (this.model === undefined) {
                throw 'model is undefined';
            }

            this.render();
            this.model.bind('change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        }
    });
});