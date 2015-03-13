define([
    'backbone',
    'template-manager/template-manager'
], function (Backbone, templateManager) {
    'use strict';

    var DashboardView = Backbone.View.extend({

        templateName: 'ContentView',

        initialize: function () {
            _.bindAll(this, 'render');

            this.template = templateManager.getTemplate(this.templateName);
            this.model.on('change', this.render);

            this.render();
        },

        create: function (options) {
            'use strict';
            return new DashboardView(options);
        },
        
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        }
    });

    return DashboardView;
});